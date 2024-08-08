const  propertiesgallery = document.getElementById("propertiesgallery");
const  propertieshome = document.getElementById("propertieshome");

async function loadProperties(array,gallery,body){
    try{
        let buttons = ``
        let modals = ``
        let i = 0
        if (array.length > 0){
            for (property of array) {
                i +=1 
                property.index = i;
                buttons+=  returnPropertyBtn(property)
                modals+= returnPropertyModal(property)            
            }
            gallery.innerHTML += buttons;
            body.innerHTML += modals;
        }
    }
    catch(error){
        console.error("Error loading properties:", error);
    }
};

loadProperties(properties,propertiesgallery,propertieshome)