


function loadPictures(array){
    let contenido = ``;
    if (array.length > 0){
        array.forEach(picture => {
            contenido+= returnPicture(picture);            
        });
        gallery.innerHTML = contenido
    }
}

const  gallery = document.getElementById("bathroomgallery");
if (gallery){
    loadPictures(bathroomPictures)
}
