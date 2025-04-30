
//template page

// Función que genera el HTML para las imágenes de la propiedad en un carrusel
function returnPropertyPictures(property) {
    let slides = ''; // Variable para los slides

    // Recorremos todas las imágenes de la propiedad
    for (const image of property.images) {
        let imgSrc, imgAlt; // Variables para almacenar la fuente y el texto alternativo de cada imagen
        
        // Recorremos las claves del objeto 'image' para obtener la fuente y el texto alternativo
        for (let key in image) {
            if (image.hasOwnProperty(key)) { // Aseguramos que la propiedad sea propia del objeto, no heredada
                if (key.startsWith('img')) { // Si la clave comienza con 'img', la usamos para la fuente de la imagen
                    imgSrc = image[key];
                } else if (key === 'alt') { // Si la clave es 'alt', la usamos para el texto alternativo de la imagen
                    imgAlt = image[key];
                }
            }
        }

        // Suponiendo que el nombre base es algo como "/images/property123.jpg"
        // y que tus versiones son: property123-480.webp, property123-768.webp, etc.

        const imgNameWithoutExt = imgSrc.replace(/\.[^/.]+$/, ""); // Elimina la extensión
        const webpSrcSet = `
            ${imgNameWithoutExt}-480.webp 480w,
            ${imgNameWithoutExt}-768.webp 768w,
            ${imgNameWithoutExt}-1024.webp 1024w,
            ${imgNameWithoutExt}-1440.webp 1440w
        `;
        const fallbackSrcSet = `
            ${imgNameWithoutExt}-480.jpg 480w,
            ${imgNameWithoutExt}-768.jpg 768w,
            ${imgNameWithoutExt}-1024.jpg 1024w,
            ${imgNameWithoutExt}-1440.jpg 1440w
        `;

        slides += `
            <div class="swiper-slide">
                <picture>
                    <source type="image/webp" srcset="${webpSrcSet}" sizes="(max-width: 768px) 100vw, 50vw">
                    <img src="${imgSrc}" srcset="${fallbackSrcSet}" sizes="(max-width: 768px) 100vw, 50vw" alt="${imgAlt}" class="w-100 object-fit-cover" style="object-position: center;" loading="lazy">
                </picture>
            </div>`;
    }

    return `
        <div class="swiper">
            <div class="swiper-wrapper">
                ${slides}
            </div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
            <div class="swiper-pagination"></div>
        </div>`;
}

// Función que genera el HTML de las características de la propiedad
function returnPropertyFeatures(property) {
    let features = `` // Variable que almacenará el HTML de las características

    // Recorremos todas las características de la propiedad
    property.features.forEach(feature => {
        for (let key in feature) { // Recorremos las claves de cada característica
            if (feature.hasOwnProperty(key)) { // Aseguramos que la propiedad sea propia del objeto
                // Generamos el HTML para cada característica como un encabezado <h3>
                features += `<h2 class="property-features">${feature[key]}</h2>`;
            }
        }
    });
    return features; // Devolvemos el HTML de las características generadas
}

// Función que genera el HTML completo de la página de la propiedad
function returnPropertyPage(property) {
    // Llamamos a las funciones anteriores para obtener el HTML de las imágenes y las características
    images = returnPropertyPictures(property);
    features = returnPropertyFeatures(property);
    
    // Comprobamos si existe un video de YouTube en la propiedad
    const video = property.video ? `<div class="property-video">
        <h3>Video de la propiedad</h3>
        <iframe width="100%" height="400" src="${property.video}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>` : '';

    // Comprobamos si existe un pdf de YouTube en la propiedad
    const pdf = property.pdf ? `<a href="${property.pdf}" class="link-bold-borders" download>Descargar PDF <i class="bi bi-file-earmark-pdf"></i></a>` : '';


    // Generamos el HTML completo de la página de la propiedad
    return `<div class="gallery__text models container">
    <h1 class="gallery__title poppins mt-5 text-center " id="${property.id}Label">${property.type} en ${property.location}</h1>
</div>
<div class="container">
<div class="row">
    <div class="text-center d-md-flex justify-content-md-between mb-5">${features}</div>

    <!-- Columna izquierda: Swiper -->
    <div class="col-md-6">
        <div class="property-swiper-container">
            ${images}
        </div>
    </div>

    <!-- Columna derecha: descripción -->
    <div class="col-md-6">
        <p class="mt-1 mb-4">${property.description}</p>
        <div class="model__actions text-center mb-4">
            <a href="https://api.whatsapp.com/send?phone=5491164773427" class="link-bold-borders" target="_blank">Consultar <i class="bi bi-whatsapp"></i></a>
            ${pdf}
        </div>
    </div>

    <!-- Mapa de Google con la ubicación de la propiedad -->
    <div class="property-map">
        <h3 class="inmo-title m-5">Ubicación</h3>
        ${property.mapcode}
    </div>
</div>
</div>

<!-- Si existe un video de YouTube, lo mostramos -->
${video}

<!-- Mapa de propiedades adicionales -->
<div class="container more-properties">
<h3 class="inmo-title m-5">Más propiedades</h3>
<iframe src="https://www.google.com/maps/d/embed?mid=1E2CISeVZT6T78IRiddKtF88Nf-qM74Y&ehbc=2E312F&noprof=1" width="100%" height="400"></iframe>
</div>

<div class="modal-footer m-5">
<a href="https://api.whatsapp.com/send?phone=5491164773427" class="link-bold-borders" target="_blank">Consultar  <i class="bi bi-whatsapp"></i></a>
</div>`;
}

// API

// Obtener el ID de la propiedad desde los parámetros de la URL
const params = new URLSearchParams(window.location.search);
const propertyId = params.get("id");

// Cargar el archivo JSON de propiedades y buscar la propiedad con el ID correspondiente
fetch("../../js/properties.json")
	.then((response) => response.json()) // Convertimos la respuesta en JSON
	.then((properties) => {
		// Buscamos la propiedad con el ID que obtenemos de la URL
		const property = properties.find((p) => p.id == propertyId);
		if (property) {
			// Si encontramos la propiedad, insertamos el HTML generado en el contenedor correspondiente
			const detailsContainer = document.getElementById("property-details");
			detailsContainer.innerHTML = returnPropertyPage(property);
		} else {
			// Si no encontramos la propiedad, mostramos un mensaje de error
			document.getElementById("property-details").innerHTML =
				"Propiedad no encontrada.";
		}
	})
	.catch((error) => console.error("Error al cargar la propiedad:", error)); // Si ocurre un error al cargar los datos, lo mostramos en la consola
