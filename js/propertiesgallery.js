const  propertiesgallery = document.getElementById("propertiesgallery");
const  propertieshome = document.getElementById("propertieshome");

async function loadProperties(array,gallery,body){
    let buttons = ``;
    let modals = ``;
    let i = 0
    if (array.length > 0){
        for (property of array) {
            i +=1 
            property.index = i
            buttons+= await returnPropertyBtn(property);
            modals+= await returnPropertyModal(property)            
        };
        gallery.innerHTML += buttons
        body.innerHTML += modals
    }
}

loadProperties(properties,propertiesgallery,propertieshome)