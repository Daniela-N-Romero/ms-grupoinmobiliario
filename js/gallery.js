
function loadPictures(array,gallery){
    let contenido = ``;
    if (array.length > 0){
        array.forEach(picture => {
            contenido+= returnPicture(picture);            
        });
        gallery.innerHTML = contenido
    }
}

const  bathroomgallery = document.getElementById("bathroomgallery");

if (bathroomgallery){
    loadPictures(bathroomPictures,bathroomgallery)
}
