// const  propertieshome = document.getElementById("propertieshome");

// async function loadProperties(array,gallery,body){
//     try{
//         let buttons = ``
//         let modals = ``
//         let i = 0
//         if (array.length > 0){
//             for (property of array) {
//                 i +=1
//                 property.index = i;
//                 buttons+=  returnPropertyBtn(property)
//                 modals+= returnPropertyModal(property)
//             }
//             gallery.innerHTML += buttons;
//             body.innerHTML += modals;
//         }
//     }
//     catch(error){
//         console.error("Error loading properties:", error);
//     }
// };

// loadProperties(properties,propertiesgallery,propertieshome)

function returnPropertyBtn(property) {
	return `<div class="house--content">
						<div class="content--row">
							<h3 class="${property.operation}">${property.operation}</h3>
						</div>
						<div class="content--row">
							<h2 class="house-title">${property.type} en ${property.location}</h2>
							<p class="house-currency">${property.currency}</p>
							<p class="house-address">${property.address}</p>
							<p class="house-price">${property.value}</p>
							<h3 class="house-features">${property.rooms} ambientes | ${property.bathrooms} baños</h3>
						</div>
					</div>`;
}

const getResolution = () => {
	if (window.innerWidth < 576) return 480;
	if (window.innerWidth < 768) return 768;
	if (window.innerWidth < 1024) return 1024;
	return 1440;
};

const res = getResolution();

fetch("../js/properties.json")
	.then((response) => response.json())
	.then((properties) => {
		const alquileres = properties.filter(p => p.operation === "alquiler").sort((a, b) => a.price - b.price);
		const ventas = properties.filter(p => p.operation === "venta").sort((a, b) => a.price - b.price);
		const propertiesToShow = [...alquileres, ...ventas];

		const propertiesgallery = document.getElementById("propertiesgallery");

		propertiesToShow.forEach((property) => {
			const articleHTML = returnPropertyBtn(property);
			const slide = document.createElement("div");
			slide.classList.add("swiper-slide");
			slide.innerHTML = articleHTML;
			slide.id = property.id;
			slide.classList.add("houses-gallery--article");
			//imagen de fondo del botón
			const coverImg = `${property.folder}/${property.nombre_base_images}_0.jpg`;
			slide.style.backgroundImage = `url(${coverImg})`;
			
			slide.style.cursor = "pointer";
			slide.tabIndex = "0";

			slide.addEventListener('click', () => {
				window.location.href = `${window.location.origin}/pages/inmobiliaria/property-template.html?id=${property.id}`;
			});

			propertiesgallery.appendChild(slide);
		});

		// Inicializar Swiper
		new Swiper(".properties-swiper", {
			slidesPerView: 1,
			spaceBetween: 20,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			breakpoints: {
				576: {
					slidesPerView: 2,
				},
				768: {
					slidesPerView: 3,
				},
				992: {
					slidesPerView: 4,
				},
				1200: {
					slidesPerView: 5,
				}
			}
		});
	})
	.catch((error) => console.error("Error loading properties:", error));
