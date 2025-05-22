// --- Funciones para Generar HTML de la Propiedad ---

// Define tus puntos de quiebre (breakpoints) y los sufijos de imagen correspondientes.
// Esto se define una vez de forma global, ya que aplica a todas las imágenes.
// Las resoluciones se usan para determinar qué sufijo aplicar al nombre del archivo JPG.
const imageResolutionBreakpoints = [
    { width: 0,    suffix: '-480.jpg' },    // Para pantallas < 768px (móviles)
    { width: 768,  suffix: '-768.jpg' },   // Para pantallas >= 768px (tabletas)
    { width: 1200, suffix: '-1440.jpg' }     // Para pantallas >= 1200px (escritorio)
];

/**
 * Obtiene el sufijo de imagen correcto según el ancho de la ventana actual.
 * @param {number} windowWidth - El ancho actual de la ventana.
 * @returns {string} El sufijo del archivo JPG (ej. '-small.jpg').
 */
function getImageSuffix(windowWidth) {
    let currentSuffix = '';
    // Itera desde el breakpoint más grande hacia el más pequeño
    for (let i = imageResolutionBreakpoints.length - 1; i >= 0; i--) {
        if (windowWidth >= imageResolutionBreakpoints[i].width) {
            currentSuffix = imageResolutionBreakpoints[i].suffix;
            break; // Una vez que encontramos el breakpoint adecuado, salimos
        }
    }
    return currentSuffix;
}

/**
 * Actualiza los atributos 'src' de todas las imágenes de los slides del Swiper
 * basándose en la resolución actual de la ventana.
 */
function updateSlideImages() {
    const currentWindowWidth = window.innerWidth;
    const suffix = getImageSuffix(currentWindowWidth);
    // Selecciona todas las imágenes dentro de los slides del Swiper
    const slideImages = document.querySelectorAll('.images-swiper .swiper-slide img');

    slideImages.forEach(img => {
        const baseSrc = img.getAttribute('data-base-src');
        if (baseSrc) {
            // Construye la ruta completa de la imagen (ej: assets/images/slide1-small.jpg)
            img.src = `${baseSrc}${suffix}`;
        }
    });
}

// Variable para asegurar que el event listener de 'resize' se agregue solo una vez
let hasResizeListenerBeenAdded = false;


/**
 * Genera el HTML para el carrusel de imágenes de la propiedad.
 * Simplificado para usar solo <img> tags con carga dinámica.
 * @param {object} property - El objeto de la propiedad.
 * @returns {string} HTML del carrusel de imágenes.
 */
function returnPropertyPictures(property) {
    let slides = ``;

    for (let i = 1; i <= property.cantidad_imagenes; i++) {
        // La ruta base para la imagen, SIN el sufijo de resolución (ej: "propiedades/inmueble_1/foto_1")
        const basePath = `${property.folder}/${property.nombre_base_images}_${i}`;

        slides += `
        <div class="swiper-slide swiper-slide-fullwidth h-100" style="max-width: 100%">
            <img
                data-base-src="${basePath}"
                src="${basePath}-480.jpg" alt="${property.nombre_inmueble} imagen ${i}"
                class="w-100 h-100 object-fit-cover"
                loading="lazy">
        </div>
        `;
    }

    return `
        <div class="swiper images-swiper h-100 p-0">
            <div class="swiper-wrapper"">
                ${slides}
            </div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
            <div class="swiper-pagination"></div>
        </div>
    `;
}

/**
 * Genera el HTML para las características de la propiedad.
 * @param {object} property - El objeto de la propiedad.
 * @returns {string} HTML de la lista de características.
 */
function returnPropertyFeatures(property) {
    return property.features
        .map((feature) => {
            const value = Object.values(feature)[1]; // Solo el valor de la característica
            return `<li class="property-features">${value}</li>`;
        })
        .join("");
}

/**
 * Genera el HTML completo de la página de la propiedad.
 * @param {object} property - El objeto de la propiedad.
 * @returns {string} HTML de la página de la propiedad.
 */
function returnPropertyPage(property) {
    // Generar las secciones dinámicas
    const images = returnPropertyPictures(property);
    const features = returnPropertyFeatures(property);

    const video = property.video
        ? `<div class="property-video">
                <h3 class="inmo-title m-5">Video de la propiedad</h3>
                <iframe width="100%" height="400" src="${property.video}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>`
        : "";

    const pdf = property.pdf
        ? `<a href="${property.pdf}" class="link-bold-borders ms-3" download>
                Descargar PDF <i class="bi bi-file-earmark-pdf"></i>
            </a>`
        : "";

    return `
        <div class="container p-5">
            <div class="row top-row mt-5">
                <div class="col-12 col-md-6 swiper-column d-flex align-items-center">
                    <div class="property-swiper-container w-100 overflow-hidden h-100 p-0">
                        ${images}
                    </div>
                </div>

                <div class="col-12 col-md-6 info-column d-flex flex-column justify-content-center">
                    <div class="property-info-block text-center text-md-start">
                        <h1 class="gallery__title poppins mt-5 text-center text-md-start" id="${
                            property.id
                        }Label">
                            ${property.title}
                        </h1>

                        ${
                            property.price
                                ? `<p class="property-price poppins mt-2">$${property.price}</p>`
                                : ""
                        }

                        <ul class="property-characteristics poppins mb-3">
                            ${features}
                        </ul>

                        <div class="model__actions text-center text-md-start mb-4">
                            <a href="https://api.whatsapp.com/send?phone=5491164773427" class="link-bold-borders" target="_blank">
                                Consultar <i class="bi bi-whatsapp"></i>
                            </a>
                            ${pdf}
                        </div>
                    </div>
                </div>

                <div class="col-12 description-column mt-3">
                    <p class="mb-4">
                        ${property.description}
                    </p>
                </div>
            </div>

            <div class="property-map">
                <h3 class="inmo-title m-5">Ubicación</h3>
                ${property.mapcode}
            </div>

            ${video}

            <div class="container more-properties">
                <h3 class="inmo-title m-5">Más propiedades</h3>
                <iframe src="https://www.google.com/maps/d/embed?mid=1E2CISeVZT6T78IRiddKtF88Nf-qM74Y&ehbc=2E312F&noprof=1" width="100%" height="400"></iframe>
            </div>

            <div class="modal-footer m-5">
                <a href="https://api.whatsapp.com/send?phone=5491164773427" class="link-bold-borders" target="_blank">
                    Consultar <i class="bi bi-whatsapp"></i>
                </a>
            </div>
        </div>
    `;
}

// --- Lógica Principal de Carga de la Propiedad y Inicialización de Swiper ---

// Obtener el ID de la propiedad desde los parámetros de la URL
const params = new URLSearchParams(window.location.search);
const propertyId = params.get("id");

// Cargar el archivo JSON de propiedades y buscar la propiedad con el ID correspondiente
fetch("/js/properties.json")
    .then((response) => response.json()) // Convertimos la respuesta en JSON
    .then((properties) => {
        // Buscamos la propiedad con el ID que obtenemos de la URL
        const property = properties.find((p) => p.id == propertyId);
        if (property) {
            // Si encontramos la propiedad, insertamos el HTML generado en el contenedor correspondiente
            const detailsContainer = document.getElementById("property-details");
            detailsContainer.innerHTML = returnPropertyPage(property);

            // Inicializar Swiper y actualizar imágenes después de insertar el HTML
            // Usamos setTimeout para asegurar que el DOM se haya renderizado
            setTimeout(() => {
                new Swiper(".images-swiper", {
                    loop: property.cantidad_imagenes >= 3, // Mantén tu lógica original de loop
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: true,
                    },
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    },
                    slidesPerView: 1,
                    spaceBetween: 10,
                });

                // Llama a la función para actualizar los 'src' de las imágenes
                // justo después de que Swiper haya sido inicializado y los elementos estén en el DOM.
                updateSlideImages();

                // Añade el event listener para 'resize' solo una vez
                if (!hasResizeListenerBeenAdded) {
                    let resizeTimeout;
                    window.addEventListener('resize', () => {
                        clearTimeout(resizeTimeout);
                        resizeTimeout = setTimeout(() => {
                            updateSlideImages();
                            // Si observas algún problema visual al redimensionar
                            // (ej: Swiper no se ajusta correctamente), puedes intentar:
                            // mySwiper.update(); // Necesitarías una referencia al objeto Swiper
                        }, 250); // Pequeño 'debounce' para optimizar el rendimiento
                    });
                    hasResizeListenerBeenAdded = true; // Marca que el listener ya se ha añadido
                }

                // Las propiedades `min-width` y `flex-shrink` del swiper-wrapper
                // ya están aplicadas directamente en el HTML de `returnPropertyPictures`.
                // Por lo tanto, no es necesario forzar estilos a cada slide con JS aquí.
            }, 100); // Pequeño retraso para asegurar que el DOM esté listo

        } else {
            // Si no encontramos la propiedad, mostramos un mensaje de error
            document.getElementById("property-details").innerHTML =
                "Propiedad no encontrada.";
        }
    })
    .catch((error) => console.error("Error al cargar la propiedad:", error));