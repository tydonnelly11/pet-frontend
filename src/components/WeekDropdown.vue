<template>
    <div class="dropdown-center">
        <a
            class="btn btn-primary dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            :style="'width: 30%;'"
        >
            Weeks
        </a>

        <ul class="dropdown-menu" :style="'columns : 3;'">
            <li v-for="date in dates">
                <a class="dropdown-item" href="#">{{ date }}</a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'WeekDropdown',
    props: {
        dates: Array,
    },

    //Note for future self while doing visual only, so i think I
    //should try to emit event to warList which I think will handle what week is
    //in the little row as well as adding rows
    //also look at bootstrap docs
}
</script>

<style scoped></style>
