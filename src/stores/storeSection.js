import { reactive } from 'vue'

export const storeSection = reactive({
   sections: [],
   selectedSection: null,
   selectedSectionId: '',
   selectedSectionName: '',
   activeSection: null,
   setSections(sections) {
      this.sections = sections
      for (const section of this.sections) {
         console.log(section.isCurrent)
         if (section.isCurrent === true) {
            this.selectedSectionId = section.id
            this.selectedSectionName = section.name
            this.selectedSection = section;
            this.activeSection = section
         }
      }
   },
   setSelectedSection(section) {
      this.selectedSectionId = section.id
      this.selectedSection = section
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
   getActiveSection() {

      if (
         this.sections.find(
            (section) =>
               section.id === this.selectedSectionId &&
               section.isCurrent === true
         ) === undefined
      ) {
         return false
      } else {
         return true
      }
      // return this.sections.find(section => section.id === this.selectedSectionId && section.isCurrent === true);
   },
})
