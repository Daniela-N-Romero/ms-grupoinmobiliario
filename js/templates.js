//function to load template gallery pictures 

function returnPicture(picture){
    return `<div class="${picture.class}" style="background-image: url(${picture.img});"><a href="${picture.img}" data-lightbox="models" data-title="${picture.title}"></a></div>`;
} 

//function to return gallery buttons

function returnBtn(btn){
    return  `<li id="${btn.id}" class="other-link d-inline-block p-2 position-relative"><a href="${btn.link}"><h2 class="link-bold-borders">${btn.name}</h2></a></li>`
}

//template for redirect buttons

buttonsConstructora =  `<a href="/pages/homeimboliaria.html" class="fixed-btn btn-redirect btn-redirect" target="_blank"></a>
                        <a href="https://api.whatsapp.com/send?phone=5491164773427" class="fixed-btn wsp-btn" target="_blank"><i class="bi bi-whatsapp"></i></a>`;

buttonsInmobiliaria =  `<a href="/pages/homeconstructora.html" class="fixed-btn btn-redirect btn-redirect-inmo" target="_blank"></a>                        
                        <a href="https://api.whatsapp.com/send?phone=5491164773427" class="fixed-btn wsp-btn" target="_blank"><i class="bi bi-whatsapp"></i></a>`;

buttonsGrupo =  `<a href="https://api.whatsapp.com/send?phone=5491164773427" class="fixed-btn wsp-btn" target="_blank"><i class="bi bi-whatsapp"></i></a>`;
                



