<template>
    <div class="student-pe-container">
        <WeekDropdown />
        <PeerEvalTable />
    </div>
</template>

<script>
import PeerEvalTable from '../components/student/PeerEvalTable.vue'
import WeekDropdown from '../components/WeekDropdown.vue'
export default {
    name: 'StudentPeerEvalView',
    data() {
        return {}
    },
    /*
                                Logic for this container might be to have weeks as dropdown, 
                                when you select Week, it will load the PeerEvalTable component for 
                                that week, and then you can submit the form for that week.

                                Unsure if I want this component handling sending data
                                 or if i want the PeerEvalTable component to handle sending data
                                */
    components: {
        PeerEvalTable,
        WeekDropdown,
    },
}
</script>

<style scoped>
.student-pe-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 5%;
}
</style>
