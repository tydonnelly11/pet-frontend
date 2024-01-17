<template>
   <div class="error-container">
      <div v-if="errorFlag == 500" class="error-message">
         <h1>Internal Server Error</h1>
         <p>Something went wrong on our end. Please try again later.</p>
      </div>
      <div v-else-if="errorFlag == 403" class="error-message">
         <h1>Forbidden</h1>
         <p>You do not have permissions to access this resource</p>
      </div>
      <div v-else-if="errorFlag == 401" class="error-message">
         <h1>Unauthorized</h1>
         <p>Please Login to your account</p>
      </div>
      <div v-else class="error-message">
         <h1>Unknown Error</h1>
         <p>
            Something went wrong. Please try again, if the error persists
            contact us
         </p>
      </div>
   </div>
</template>

<script>
export default {
   name: 'ErrorPopUp',
   props: {
      errorMessageProp: String,
      responseFlag: Number,
   },
   data() {
      return {
         errorFlag: this.responseFlag,
      }
   },
   methods: {},
}
</script>

<style scoped>
.error-container {
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   align-self: center;
}
</style>
