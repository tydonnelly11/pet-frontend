import { reactive } from "vue";

export const storeSection = reactive({
    sections: [],
    selectedSectionId: "",
    selectedSectionName: "",
    setSections(sections) {
        this.sections = sections;
        if(this.selectedSectionId == "" && sections.length > 0){
            this.selectedSectionId = sections[0].id;
            this.selectedSectionName = sections[0].name;
        
        }
        
    },
    setSelectedSection(section) {
        this.selectedSectionId = section.id;
        this.selectedSectionName = section.name;
    }, 
});