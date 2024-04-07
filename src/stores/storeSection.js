import { reactive } from "vue";

export const storeSection = reactive({
    sections: [],
    selectedSection : null,
    selectedSectionId: "",
    selectedSectionName: "",
    setSections(sections) {
        this.sections = sections;
        if(this.selectedSectionId === "" && sections.length > 0){
            this.selectedSectionId = sections[0].id;
            this.selectedSectionName = sections[0].name;
        
        }

    },
    setSelectedSection(section) {
        this.selectedSectionId = section.id;
        this.selectedSection = section;
        this.selectedSectionName = section.name;
    },
    addSection(section) {
        if(this.sections.length == 0){
            this.selectedSectionId = section.id;
            this.selectedSectionName = section.name;
            this.sections.push(section);
        }
        else{
            this.sections.push(section);
        }
    }, 
    resetSection(){
        this.sections = [];
        this.selectedSectionId = "";
        this.selectedSectionName = "";
    },
    getActiveSection(){
        console.log(this.sections);
        if(this.sections.find(section => section.id === this.selectedSectionId && section.isCurrent === true) === undefined){
            return false;
        }
        else{
            return true;
        }
        // return this.sections.find(section => section.id === this.selectedSectionId && section.isCurrent === true);
    }
});