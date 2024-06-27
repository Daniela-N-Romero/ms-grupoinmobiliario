//LOADING PICTURES

const  bathroomgallery = document.getElementById("bathroomgallery");
const  kitchengallery = document.getElementById("kitchengallery");
const  onestorygallery = document.getElementById("onestorygallery");
const  twostorygallery = document.getElementById("twostorygallery");
const  poolgallery = document.getElementById("poolgallery");
const  grillgallery = document.getElementById("grillgallery");
const  pergolagallery = document.getElementById("pergolagallery");
const  homegallery = document.getElementById("homegallery");

function loadPictures(array,gallery){
    let contenido = ``;
    if (array.length > 0){
        array.forEach(picture => {
            contenido+= returnPicture(picture);            
        });
        gallery.innerHTML = contenido
    }
}

if (bathroomgallery){
    loadPictures(bathroomPictures,bathroomgallery)
}

if (kitchengallery){
    loadPictures(kitchenPictures,kitchengallery)
}

if (onestorygallery){
    loadPictures(onestoryPictures,onestorygallery)
}

if (twostorygallery){
    loadPictures(twostoryPictures,twostorygallery)
}

if (poolgallery){
    loadPictures(poolPictures,poolgallery)
}
if (grillgallery){
    loadPictures(grillPictures,grillgallery)
}
if (pergolagallery){
    loadPictures(pergolaPictures,pergolagallery)
}

if (homegallery){
    loadPictures(homePictures,homegallery)
}

//LOADING BUTTONS

const  linksList = document.getElementById("gallerylinks");

function loadLinks(array,list){
    let contenido = ``;
    if (array.length > 0){
        array.forEach(btn => {
            if (btn.link == window.location.pathname){
                return;
            }
            contenido+= returnBtn(btn);            
        });
        list.innerHTML = contenido
    }
};

if (linksList){
    loadLinks(galleryBtns,linksList)
}
