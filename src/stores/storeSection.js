import { reactive } from 'vue'

export const storeSection = reactive({
   sections: [],
   selectedSectionId: '',
   selectedSectionName: '',
   setSections(sections) {
      this.sections = sections
      if (this.selectedSectionId === '' && sections.length > 0) {
         this.selectedSectionId = sections[0].id
         this.selectedSectionName = sections[0].name
         console.log(
            'Selected Section: ',
            this.selectedSectionId,
            this.selectedSectionName
         )
      }
   },
   setSelectedSection(section) {
      this.selectedSectionId = section.id
      this.selectedSectionName = section.name
   },
   addSection(section) {
      if (this.sections.length == 0) {
         this.selectedSectionId = section.id
         this.selectedSectionName = section.name
         this.sections.push(section)
      } else {
         this.sections.push(section)
      }
   },
   resetSection() {
      this.sections = []
      this.selectedSectionId = ''
      this.selectedSectionName = ''
   },
})
