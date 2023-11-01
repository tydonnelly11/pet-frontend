<template>
    <div class="WarList-container">
        <div class="title">
            <WeekDropdown :dates="warDates2023" />
        </div>
        <table class="table vh-45">
            <thead>
                <tr>
                    <th scope="col">Task</th>
                    <th scope="col">Planned Task</th>
                    <th scope="col">Description</th>
                    <th scope="col">Planned Hours</th>
                    <th scope="col">Actual Hours</th>
                    <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>Thornton</td>
                    <td>@twitter</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td>Thornton</td>
                    <td>@twitter</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@twitter</td>
                    <td>Thornton</td>
                    <td>@twitter</td>
                </tr>
                <tr>
                    <th scope="row">4</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@twitter</td>
                    <td>Thornton</td>
                    <td>@twitter</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import WeekDropdown from './WeekDropdown.vue'
export default {
    name: 'WarList',
    components: {
        WeekDropdown,
    },
    data() {
        return {
            warDates2023: [
                '2023-09-01 to 2023-09-03',
                '2023-09-04 to 2023-09-10',
                '2023-09-11 to 2023-09-17',
                '2023-09-18 to 2023-09-24',
                '2023-09-25 to 2023-10-01',
                '2023-10-02 to 2023-10-08',
                '2023-10-09 to 2023-10-15',
                '2023-10-16 to 2023-10-22',
                '2023-10-23 to 2023-10-29',
                '2023-10-30 to 2023-11-05',
                '2023-11-06 to 2023-11-12',
                '2023-11-13 to 2023-11-19',
                '2023-11-20 to 2023-11-26',
                '2023-11-27 to 2023-12-03',
                '2023-12-04 to 2023-12-10',
                '2023-12-11 to 2023-12-15',
            ],
        }

        //TODO: When I get selected date from drop down, eventually i will select week from object that i got when
        // or call for when student selected on WAR tab or directly from backend when student selects week.
        // Then having to add task and save to backendI
    },
}
</script>

<style scoped>
.WarList-container {
    display: flex;
    flex-direction: column;
}

td {
    font-size: 1.1rem;
    line-height: 3.5em;
}

.title {
    font-size: 1.5rem;
    margin-bottom: 2.5%;
}
</style>
