import { reactive } from "vue";

export const storeSection = reactive({
    sections: [],
    selectedSectionId: "",
    selectedSectionName: "",
    setSections(sections) {
        this.sections = sections;
    },
    setSelectedSection(section) {
        this.selectedSectionId = section.id;
        this.selectedSectionName = section.name;
    }, 
});