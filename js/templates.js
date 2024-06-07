//template imagenes de galeria 

function returnPicture(picture){
    return `<div class="${picture.class}" style="background-image: url(${picture.img});">
                <a href="${picture.img}" data-lightbox="models" data-title="${picture.title}"></a>
            </div>`;
} 







