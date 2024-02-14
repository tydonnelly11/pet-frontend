<template>
   <div class="comment-table-container">
      <table class="comment-table">
         <thead>
            <tr>
               <th>Commented By</th>
               <th>Comment</th>
            </tr>
         </thead>
         <tbody>
            <tr v-for="(commentValue, commentKey) in comments">
               <td>
                  {{ commentKey }}
                  <!-- <td v-for="(commentValue, commentKey) in report.comments" :key="commentKey">
                        {{ commentKey }}: {{ commentValue }}
                        </td> -->
               </td>
               <td>
                  {{ commentValue }}
               </td>
            </tr>
         </tbody>
      </table>
   </div>
</template>

<script>
export default {
   name: 'CommentTable',
   props: {
      comments: Array,
   },
}
</script>

<style scoped></style>
