import { get } from 'lodash'
import { reactive } from 'vue'

export const storeRubrics = reactive({
   rubrics: [],

   setRubrics(sections) {
      for (const section of sections) {
         this.rubrics.push({
            sectionId: section.id,
            sectionName: section.name,
            rubric: section.rubric,
         })
      }
   },
   getRubric() {
      return this.rubrics
   },
})
