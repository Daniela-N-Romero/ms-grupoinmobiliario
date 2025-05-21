function returnPropertyBtn(property) {
    // Esta función sigue siendo la misma, genera el HTML de cada tarjeta de propiedad.
    return `<div class="house--content">
						<div class="content--row">
							<h3 class="${property.operation}">${property.operation}</h3>
						</div>
						<div class="content--row">
							<h2 class="house-title">${property.title}</h2>
							<p class="house-currency">${property.currency}</p>
							<p class="house-address">${property.address}</p>
							<p class="house-price">${property.price}</p>
							<h3 class="house-features">${property.rooms} ambientes | ${property.bathrooms} baños</h3>
						</div>
					</div>`;
}

fetch("../js/properties.json")
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((properties) => {
		  console.log("JSON DE PROPIEDADES CARGADO COMPLETO:", properties); // <-- ¡ESTE ES CLAVE!
        // Asume que tu JSON tiene una propiedad 'type' además de 'operation'
        // para diferenciar "vivienda", "lote", "industrial".
        // Si no, puedes derivarlo de 'operation' o añadirlo en el JSON.

        const parseNumericValue = (val) => {
            // Elimina puntos de millar y convierte a número flotante
            // Si el valor es undefined, null o no es una cadena, devuelve 0 o NaN según tu preferencia.
            if (typeof val === 'string') {
                valorParseado = parseFloat(val.replace(/\./g, '').replace(/,/g, '.')); // Por si acaso hay 
				return valorParseado
            }else{
				return 0
			}; 
        };

       const viviendasVenta = properties.filter(p =>
			p.type === "vivienda" && // <-- DEBE SER EXACTAMENTE "vivienda"
			p.operation === "venta" // <-- DEBE SER EXACTAMENTE "venta"
        ).sort((a, b) => parseNumericValue(a.price) - parseNumericValue(b.price));

        const lotes = properties.filter(p =>
            p.type === "lote" && // <-- DEBE SER EXACTAMENTE "lote"
        	p.operation === "venta" // <-- DEBE SER EXACTAMENTE "venta" 
        ).sort((a, b) => parseNumericValue(a.price) - parseNumericValue(b.price));

        const industriales = properties.filter(p =>
             p.type === "industrial"
        ).sort((a, b) => parseNumericValue(a.price) - parseNumericValue(b.price));


        // Referencias a los contenedores de los Swipers (los IDs en el HTML)
        const viviendasGallery = document.getElementById("viviendas-gallery");
        const lotesGallery = document.getElementById("lotes-gallery");
        const industrialesGallery = document.getElementById("industriales-gallery");

        // Función reutilizable para agregar propiedades a un Swiper específico
        const addPropertiesToSwiper = (propertyList, galleryElement) => {
			console.log(`Intentando agregar ${propertyList.length} propiedades al elemento:`, galleryElement);
            propertyList.forEach((property) => {
                const articleHTML = returnPropertyBtn(property);
                const slide = document.createElement("div");
                slide.classList.add("swiper-slide");
                slide.innerHTML = articleHTML;
                slide.id = property.id;
                slide.classList.add("houses-gallery--article");
                
                const coverImg = `${property.folder}/${property.nombre_base_images}_0.jpg`;
                slide.style.backgroundImage = `url(${coverImg})`;
                
                slide.style.cursor = "pointer";
                slide.tabIndex = "0";

                slide.addEventListener('click', () => {
                    window.location.href = `${window.location.origin}/pages/inmobiliaria/property-template.html?id=${property.id}`;
                });

                galleryElement.appendChild(slide);
            });
        };

        // Llenar cada Swiper con sus propiedades
        addPropertiesToSwiper(viviendasVenta, viviendasGallery);
        addPropertiesToSwiper(lotes, lotesGallery);
        addPropertiesToSwiper(industriales, industrialesGallery);

        // Opciones comunes para todos los Swipers (puedes personalizarlas individualmente si lo necesitas)
        const commonSwiperOptions = {
            slidesPerView: 1,
            spaceBetween: 20,
			loop: true,
            breakpoints: {
                768: {
                    slidesPerView: 3,
                },
                1200: {
                    slidesPerView: 4,
                }
            }
        };

        // Inicializar cada Swiper con sus propios selectores de navegación
        new Swiper(".viviendas-swiper", { // Usamos la clase única para el contenedor del Swiper
            ...commonSwiperOptions, // Mantenemos las opciones comunes
            navigation: {
                nextEl: ".viviendas-next", // Selector único para el botón "siguiente" de viviendas
                prevEl: ".viviendas-prev", // Selector único para el botón "anterior" de viviendas
            },
        });

        new Swiper(".lotes-swiper", {
            ...commonSwiperOptions,
            navigation: {
                nextEl: ".lotes-next",
                prevEl: ".lotes-prev",
            },
        });

        new Swiper(".industriales-swiper", {
            ...commonSwiperOptions,
            navigation: {
                nextEl: ".industriales-next",
                prevEl: ".industriales-prev",
            },
        });
    })
    .catch((error) => console.error("Error loading properties:", error));