//template page

// Función que genera el HTML para las imágenes de la propiedad en un carrusel
function returnPropertyPictures(property) {
  let slides = ``;

  const resolutions = [480, 768, 1024, 1440];

  for (let i = 1; i <= property.cantidad_imagenes; i++) {
    const basePath = `${property.folder}/${property.nombre_base_images}_${i}`;

    const webpSrcSet = resolutions
      .map((res) => `${basePath}-${res}.webp ${res}w`)
      .join(", ");
    const jpgSrcSet = resolutions
      .map((res) => `${basePath}-${res}.jpg ${res}w`)
      .join(", ");

    slides += `
    <div class="swiper-slide h-100">
        <picture class="w-100 h-100">
        <source type="image/webp" srcset="${webpSrcSet}" sizes="(max-width: 768px) 100vw, 50vw">
        <source type="image/jpeg" srcset="${jpgSrcSet}" sizes="(max-width: 768px) 100vw, 50vw">
        <img 
            src="${basePath}-480.jpg"
            alt="${property.nombre_inmueble} imagen ${i}"
            class="w-100  h-100 object-fit-cover"
            loading="lazy">
        </picture>
    </div>
        `;
  }

  return `
        <div class="swiper images-swiper w-100 h-100 p-0">
            <div class="swiper-wrapper" style:"min-width: 100%;flex-shrink: 0;">
                ${slides}
            </div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
            <div class="swiper-pagination"></div>
        </div>
    `;
}

function returnPropertyFeatures(property) {
  return property.features
    .map((feature) => {
      const value = Object.values(feature)[1]; // Solo el valor
      return `<li class="property-features">${value}</li>`;
    })
    .join("");
}

// Función que genera el HTML completo de la página de la propiedad
function returnPropertyPage(property) {
  // Generar las secciones dinámicas
  const images = returnPropertyPictures(property);
  const features = returnPropertyFeatures(property);

  const video = property.video
    ? `<div class="property-video">
            <h3>Video de la propiedad</h3>
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
            <!-- Columna izquierda: Swiper -->
            <div class="col-12 col-md-6 swiper-column d-flex align-items-center">
                <div class="property-swiper-container w-100 overflow-hidden h-100 p-0">
                    ${images}
                </div>
            </div>

            <!-- Columna derecha: características y acciones -->
            <div class="col-12 col-md-6 info-column d-flex flex-column justify-content-center">
                <div class="property-info-block text-center text-md-start">
                    <!-- Título -->
                    <h1 class="gallery__title poppins mt-5 text-center text-md-start" id="${
                      property.id
                    }Label">
                        ${property.title}
                    </h1>

                    <!-- Precio (si existe) -->
                    ${
                      property.price
                        ? `<p class="property-price poppins mt-2">${property.price}</p>`
                        : ""
                    }

                    <!-- Características -->
                    <ul class="property-characteristics poppins mb-3">
                        ${features}
                    </ul>

                    <!-- Botón de WhatsApp + PDF -->
                    <div class="model__actions text-center text-md-start mb-4">
                        <a href="https://api.whatsapp.com/send?phone=5491164773427" class="link-bold-borders" target="_blank">
                            Consultar <i class="bi bi-whatsapp"></i>
                        </a>
                        ${pdf}
                    </div>
                </div>
            </div>

            <!-- Fila debajo: descripción larga -->
            <div class="col-12 description-column mt-3">
                <p class="mb-4">
                    ${property.description}
                </p>
            </div>
        </div>

        <!-- Mapa -->
        <div class="property-map">
            <h3 class="inmo-title m-5">Ubicación</h3>
            ${property.mapcode}
        </div>

        <!-- Video (si existe) -->
        ${video}

        <!-- Más propiedades -->
        <div class="container more-properties">
            <h3 class="inmo-title m-5">Más propiedades</h3>
            <iframe src="https://www.google.com/maps/d/embed?mid=1E2CISeVZT6T78IRiddKtF88Nf-qM74Y&ehbc=2E312F&noprof=1" width="100%" height="400"></iframe>
        </div>

        <!-- Footer -->
        <div class="modal-footer m-5">
            <a href="https://api.whatsapp.com/send?phone=5491164773427" class="link-bold-borders" target="_blank">
                Consultar <i class="bi bi-whatsapp"></i>
            </a>
        </div>
    </div>
    `;
}

// API

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

      // Inicializar Swiper después de insertar el HTML
      setTimeout(() => {
        new Swiper(".images-swiper", {
          loop: property.cantidad_imagenes >= 3,
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
        // Forzar estilos a cada slide
        const slides = document.querySelectorAll(
          ".images-swiper .swiper-slide"
        );
        slides.forEach((slide) => {
          slide.style.minWidth = "100%";
          slide.style.flexShrink = "0";
        });
      }, 100);
      
    } else {
      // Si no encontramos la propiedad, mostramos un mensaje de error
      document.getElementById("property-details").innerHTML =
        "Propiedad no encontrada.";
    }
  })
  .catch((error) => console.error("Error al cargar la propiedad:", error)); // Si ocurre un error al cargar los datos, lo mostramos en la consola
