<template>
    <div class="dropdowns">
        <SectionDropdown :style="'width:50%'"/>
        <WeekDropdown :style="'width:50%'"/>
    </div>

    <div class="container">
        <div class="grid-container">
            <button 
                v-for="team in teams" 
                :class="{'selected-item': selectedTeam && team.id === selectedTeam.id}"
                :key="team.id"
                @click="getTeamWar(team)"
            >
                <p>{{ team.name }}</p>
            </button>
        </div>
    </div>

    <WarTeamTable :teamProp="teamFormatted" v-if="hasSelectedTeam"/>
</template>

<script>
import SectionDropdown from '../../components/instructor/SectionDropdown.vue';
import WeekDropdown from '../../components/WeekDropdown.vue';
import WarTeamTable from '@/components/WarTeamTable.vue';
import { storeSection } from '../../stores/storeSection';
import { storeUser } from '../../stores/store.js';
import { storeWeek } from '../../stores/storeWeek';
import apiClient from '@/axios-setup.js';

export default {
    name: 'AssistantInstructorWARView',
    components: {
        SectionDropdown,
        WeekDropdown,
        WarTeamTable,
    },
    data() {
        return {
            teams: [],
            selectedTeam: null,
            hasSelectedTeam: false,
            teamFormatted: [],
            assistantTeamId: null,
        };
    },
    methods: {
        getTeams() {
            this.isLoading = true;
            this.teams = [];
            const auth = localStorage.getItem('auth');
            apiClient.get(`${this.$baseURL}/api/v1/section/getAllTeams/${storeSection.selectedSectionId}`, {
                headers: { 'Authorization': `Bearer ${auth}` }
            })
            .then(response => {
                if (storeUser.role === 'assistant_instructor') {
                    this.assistantTeamId = storeUser.assignedTeamId;
                    this.teams = response.data.data.filter(team => team.id === this.assistantTeamId);
                } else {
                    this.teams = response.data.data;
                }
                this.hasLoaded = true;
            })
            .catch(error => {
                console.log(error);
                // Handle error
            });
        },
        getTeamWar(team) {
            if (storeUser.role === 'user') {
                if (team.id !== this.assistantTeamId) {
                    console.log("You are not authorized to view this team's WAR.");
                    return;
                }
            }
            const auth = localStorage.getItem('auth');
            apiClient.get(`${this.$baseURL}/api/v1/war/get`, {
                params: {
                    teamId: team.id,
                    weekId: storeWeek.selectedWeekId,
                },
                headers: { 'Authorization': `Bearer ${auth}` }
            })
            .then(response => {
                this.isLoading = false;
                console.log(response.data.data.activities);
                this.formatActivities(response.data.data.activities);
                this.hasSelectedTeam = true;
            })
            .catch(error => {
                this.isLoading = false;
                console.log(error.response.data.code);
                if (error.response.data.code === 500) {
                    this.formatActivities([]);
                    this.hasSelectedTeam = true;
                }
            });
        },
        formatActivities(activities) {
            const team = [];
            for (const item of this.selectedTeam.students) {
                let student = {
                    name: item.firstName + item.lastName,
                    tasks: [],
                    id: item.id,
                };
                for (const activity of activities) {
                    if (activity.studentId === student.id) {
                        student.tasks.push(activity);
                    }
                }
                team.push(student);
            }
            this.teamFormatted = team;
            console.log(this.team);
        },
    },
    computed: {
        watchedSectionId() {
            return storeSection.selectedSectionId;
        },
        watchedWeekId() {
            return storeWeek.selectedWeekId;
        }
    },
    watch: {
        watchedSectionId(newVal, oldVal) {
            console.log(`sectionID changed from ${oldVal} to ${newVal}`);
            this.getTeams();
            this.hasSelectedTeam = false;
        },
        watchedWeekId(newVal, oldVal) {
            console.log(`weekID changed from ${oldVal} to ${newVal}`);
            if (this.hasSelectedTeam) {
                this.getTeamWar(this.selectedTeam);
            }
        }
    },
    created() {
        this.getTeams();
    }
}
</script>

<style scoped>
.dropdowns {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
}
.grid-item {
  padding: 10px;
  height: 100px;
  text-align: center;
  width: 100px;
  border: 1px solid #ccc;
  cursor: pointer;
}
.selected-item {
  border: 4px solid red; /* Adjust the color and border size as needed */
}
</style>