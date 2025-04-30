//function to load template gallery pictures 

function returnPicture(picture){
    return `<div class="${picture.class}" style="background-image: url(${picture.img});"><a href="${picture.img}" data-lightbox="models" data-title="${picture.title}"></a></div>`;
} 

//function to return gallery buttons

function returnBtn(btn){ 
    return  `<li id="${btn.id}" class="other-link d-inline-block p-2 position-relative"><a href="${btn.link}"><h2 class="link-bold-borders">${btn.name}</h2></a></li>`
}

//template for redirect buttons

buttonsConstructora =  `<a href="/pages/homeinmobiliaria.html" class="fixed-btn btn-redirect btn-redirect" target="_blank"></a>
                        <a href="https://api.whatsapp.com/send?phone=5491164773427" class="fixed-btn wsp-btn" target="_blank"><i class="bi bi-whatsapp"></i></a>`;

buttonsInmobiliaria =  `<a href="/pages/homeconstructora.html" class="fixed-btn btn-redirect btn-redirect-inmo" target="_blank"></a>                        
                        <a href="https://api.whatsapp.com/send?phone=5491164773427" class="fixed-btn wsp-btn" target="_blank"><i class="bi bi-whatsapp"></i></a>`;

buttonsGrupo =  `<a href="https://api.whatsapp.com/send?phone=5491136358302" class="fixed-btn wsp-btn" target="_blank"><i class="bi bi-whatsapp"></i></a>`;
                

//functions to load properties for sale /rent (inmobiliaria)


function returnPropertyFeatures(property){
    let features = ``
    property.features.forEach(feature => {
        for (let key in feature) {
            if (feature.hasOwnProperty(key)) {
                features += `<h3 class="model__feature">${feature[key]}</h3>`;
            }
        }
    });
    return features;
}

// function returnPropertyModal(property){
//     images = returnPropertyPictures(property)
//     features = returnPropertyFeatures(property)
//     return  `<!-- triggered modal #${property.index} -->
//             <div class="modal fade" id="${property.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//                 <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
//                     <div class="modal-content">
//                         <div class="modal-header">
//                             <h2 class="modal-title" id="${property.id}Label">${property.type} en, ${property.location}</h2>
//                             <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                         </div>
//                         <div class="modal-body">
//                             <div id="propertycarousel${property.index}" class="carousel slide propertycarousel" data-ride="carousel">
//                                 <div class="carousel-inner">${images}</div>
//                                     <a class="carousel-control-prev" data-bs-target="#propertycarousel${property.index}" data-bs-slide="prev" role="button">
//                                         <span class="carousel-control-prev-icon" aria-hidden="true"></span>
//                                     </a>
//                                     <a class="carousel-control-next" data-bs-target="#propertycarousel${property.index}" data-bs-slide="next" role="button">
//                                         <span class="carousel-control-next-icon" aria-hidden="true"></span>
//                                     </a>
//                             </div>
//                             <div class="model__features">${features}</div>
//                             <div> <p class="model__description">${property.description}</p></div>
//                         </div>
//                         <div class="modal-footer">
//                             <a href="https://api.whatsapp.com/send?phone=5491164773427" class="link-bold-borders" target="_blank">
//                                 Consultar  <i class="bi bi-whatsapp"></i></a>
//                         </div>
//                     </div>
//                 </div>
//             </div>`
// }


