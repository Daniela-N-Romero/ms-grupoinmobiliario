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

buttonsGrupo =  `<a href="https://api.whatsapp.com/send?phone=5491136358302" class="fixed-btn wsp-btn" target="_blank"><i class="bi bi-whatsapp"></i></a>`;
                

//functions to load properties for sale /rent (inmobiliaria)

function returnPropertyBtn(property){
    return  `<!-- Button trigger modal #${property.index}-->
			<button type="button" class="house--button" data-bs-toggle="modal" data-bs-target="#${property.id}" tabindex="0">
				<article class="houses-gallery--article" style="background-image:url(${property.cover});">
					<div class="house--content">
						<div class="content--row">
							<h3 class="${property.operation}">${property.operation}</h3>
						</div>
						<div class="content--row">
							<h2 class="house-title">${property.type} en, ${property.location}</h2>
							<p class="house-currency">${property.currency}</p>
							<p class="house-address">${property.address}</p>
							<p class="house-price">${property.value}</p>
							<h3 class="house-features">${property.rooms} ambientes | ${property.bathrooms} baños</h3>
						</div>
					</div>
				</article>
			</button>`
}



function returnPropertyPictures(property){
    let images = ``;
    let isFirst = true;  // Flag to check if it's the first image

    for (const image of property.images) {
        let imgSrc, imgAlt;
        for (let key in image) {
            if (image.hasOwnProperty(key)) {
                if (key.startsWith('img')) {
                    imgSrc = image[key];
                } else if (key === 'alt') {
                    imgAlt = image[key];
                }
            }
        }

        // Add 'active' class to the first image
        const activeClass = isFirst ? 'active' : '';
        images += `<div class="carousel-item ${activeClass}">
                        <img src="${imgSrc}" alt="${imgAlt}">
                    </div>`;
        
        isFirst = false;  // Set the flag to false after processing the first image
    }
    return images;
}


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

function returnPropertyModal(property){
    images = returnPropertyPictures(property)
    features = returnPropertyFeatures(property)
    return  `<!-- triggered modal #${property.index} -->
            <div class="modal fade" id="${property.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2 class="modal-title" id="${property.id}Label">${property.type} en, ${property.location}</h2>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div id="propertycarousel${property.index}" class="carousel slide propertycarousel" data-ride="carousel">
                                <div class="carousel-inner">${images}</div>
                                    <a class="carousel-control-prev" data-bs-target="#propertycarousel${property.index}" data-bs-slide="prev" role="button">
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    </a>
                                    <a class="carousel-control-next" data-bs-target="#propertycarousel${property.index}" data-bs-slide="next" role="button">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    </a>
                            </div>
                            <div> <p class="model__description">${property.description}</p></div>
                            <div class="model__features">${features}</div>
                        </div>
                        <div class="modal-footer">
                            <a href="https://api.whatsapp.com/send?phone=5491164773427" class="link-bold-borders" target="_blank">
                                Consultar  <i class="bi bi-whatsapp"></i></a>
                        </div>
                    </div>
                </div>
            </div>`
}


