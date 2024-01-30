import { reactive } from 'vue'

export const storeSection = reactive({
    sections: [],
    selectedSectionName: null,
    selectedSectionId: null,
    setSections(sections){
        this.sections = sections;
        if(sections.length > 0){
            this.setSpecificSection(sections[0]);
        }
        else{
            this.selectedSectionName = null;
            this.selectedSectionId = null;
        }
    },
    setSpecificSection(section){
        console.log(section.name);
        this.selectedSectionName = section.name;
        this.selectedSectionId = section.id;
    },
    addSection(section){
        this.sections.push(section);
    }
});