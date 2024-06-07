
const  gallery = document.getElementById("gallery");

function loadPictures(array){
    let contenido = ``;
    if (array.length > 0){
        array.forEach(picture => {
            contenido+= returnPicture(picture);            
        });
        gallery.innerHTML = contenido
    }
}


if (gallery){
    console.log(gallery)
    loadPictures(pictures)
}
