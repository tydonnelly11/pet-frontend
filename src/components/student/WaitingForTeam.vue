<template>
   <div class="background">
      <div class="container" id="unique-container">
         <h1 id="waiting-message">
            Your instructor has not assigned you to a team Please check back
            once your instructor tells you
         </h1>
      </div>
   </div>
</template>

<script>
export default {
   name: 'WaitingForTeam',
}
</script>

<style>
.background {
   background-color: #e4e9f7;
   height: 100vh;
   display: flex;
   justify-content: center;
   align-items: center;
   font-family: 'Arial', sans-serif;
}

#unique-container {
   width: 100%; /* Stretch to the full width of its parent, respecting padding */
   max-width: 1100px; /* or whatever the max width you want it to be */
   background-color: #5e5077; /* Dark purple background */
   padding: 20px;
   border-radius: 8px;
   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
   text-align: center;
}

#waiting-message {
   color: #ffffff; /* This will make the text color white */
}
</style>
