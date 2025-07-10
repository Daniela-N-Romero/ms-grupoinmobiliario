// admin/js/property_form.js

// Define las opciones de subtipo que dependen del tipo de propiedad
const subtypeOptions = {
  vivienda: [
    { value: "", text: "Seleccione un Subtipo" },
    { value: "casa", text: "Casa" },
    { value: "departamento", text: "Departamento" },
    { value: "ph", text: "PH" },
    { value: "duplex", text: "Dúplex" },
    { value: "quinta", text: "Quinta" },
  ],
  lote: [
    { value: "", text: "Seleccione un Subtipo" },
    { value: "terreno", text: "Terreno" },
    { value: "campo", text: "Campo" },
    { value: "lote_barrio_cerrado", text: "Lote en Barrio Cerrado" },
  ],
  industrial: [
    { value: "", text: "Seleccione un Subtipo" },
    { value: "galpon", text: "Galpón" },
    { value: "nave_industrial", text: "Nave Industrial" },
    { value: "deposito", text: "Depósito" },
  ],
  comercial: [
    { value: "", text: "Seleccione un Subtipo" },
    { value: "local", text: "Local" },
    { value: "oficina", text: "Oficina" },
    { value: "salon", text: "Salón" },
  ],
  "": [
    // Opción por defecto cuando no hay tipo seleccionado
    { value: "", text: "Seleccione primero un Tipo" },
  ],
};

document.addEventListener("DOMContentLoaded", () => {
  const propertyForm = document.getElementById("propertyForm");
  const typeSelect = document.getElementById("type");
  const subtypeSelect = document.getElementById("subtype"); // Referencia al nuevo select de subtipo

  // Referencias a los contenedores de campos específicos
  const viviendaFields = document.getElementById("viviendaFields");
  const loteFields = document.getElementById("loteFields");
  const industrialFields = document.getElementById("industrialFields");
  const comercialFields = document.getElementById("comercialFields");

  // Función para poblar el select de subtipo
  function populateSubtypeSelect(selectedType) {
    subtypeSelect.innerHTML = ""; // Limpiar opciones actuales
    const options = subtypeOptions[selectedType] || subtypeOptions[""]; // Obtener opciones o las por defecto

    options.forEach((optionData) => {
      const option = document.createElement("option");
      option.value = optionData.value;
      option.textContent = optionData.text;
      if (optionData.value === selectedSubtype) {
        // Para seleccionar la opción correcta en edición
        option.selected = true;
      }
      subtypeSelect.appendChild(option);
    });
  }

  // Función para mostrar/ocultar campos específicos
  function toggleSpecificFields() {
    // Oculta todos los campos específicos primero
    viviendaFields.style.display = "none";
    loteFields.style.display = "none";
    industrialFields.style.display = "none";
    comercialFields.style.display = "none";

    // Muestra solo los campos relevantes según el tipo seleccionado
    const selectedType = typeSelect.value;
    // Opcionalmente, podrías hacer la lógica más granular usando selectedSubtype
    // const selectedSubtype = subtypeSelect.value; // No usado directamente aquí, pero útil si lo necesitas

    switch (selectedType) {
      case "vivienda":
        viviendaFields.style.display = "block";
        break;
      case "lote":
        loteFields.style.display = "block";
        break;
      case "industrial":
        industrialFields.style.display = "block";
        break;
      case "comercial":
        comercialFields.style.display = "block";
        break;
      // Puedes añadir más casos según tus tipos de propiedad
    }
  }

      // NUEVA FUNCIÓN: Cargar los datos de la propiedad para edición
    async function loadPropertyForEdit(propertyId) {
        try {
            const response = await fetch(`/api/properties/${propertyId}`); // Petición GET a la API
            if (response.status === 401) {
                alert('Su sesión ha expirado o no está autorizado. Por favor, inicie sesión nuevamente.');
                window.location.href = '/admin/login.html';
                return;
            }
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al cargar la propiedad.');
            }
            const property = await response.json();

            // Rellenar campos comunes
            document.getElementById('name').value = property.name || '';
            document.getElementById('address').value = property.address || '';
            document.getElementById('locality').value = property.locality || '';
            document.getElementById('neighbourhood').value = property.neighbourhood || '';
            document.getElementById('totalSurface').value = property.totalSurface || '';
            document.getElementById('coveredSurface').value = property.coveredSurface || '';
            document.getElementById('description').value = property.description || '';
            document.getElementById('type').value = property.type || '';
            document.getElementById('category').value = property.category || '';
            document.getElementById('price').value = property.price || '';
            document.getElementById('currency').value = property.currency || 'USD'; // Valor por defecto si es nulo

            // Rellenar amenities (checkboxes)
            if (property.amenities && Array.isArray(property.amenities)) {
                property.amenities.forEach(amenity => {
                    const checkbox = document.querySelector(`input[name="amenities"][value="${amenity}"]`);
                    if (checkbox) checkbox.checked = true;
                });
            }

            // Primero poblar el subtipo y luego seleccionar
            populateSubtypeSelect(property.type, property.subtype);
            
            // Mostrar y rellenar campos específicos (del JSONB)
            toggleSpecificFields(); // Esto oculta/muestra los divs correctos
            if (property.specificCharacteristics) {
                const specificChars = property.specificCharacteristics;
                switch (property.type) {
                    case 'vivienda':
                        document.getElementById('v_ambientes').value = specificChars.ambientes || '';
                        document.getElementById('v_dormitorios').value = specificChars.dormitorios || '';
                        document.getElementById('v_banos').value = specificChars.banos || '';
                        document.getElementById('v_cocheras').value = specificChars.cocheras || '';
                        break;
                    case 'lote':
                        document.getElementById('l_topografia').value = specificChars.topografia || '';
                        document.getElementById('l_metrosFrente').value = specificChars.metrosFrente || '';
                        break;
                    case 'industrial':
                        document.getElementById('i_potenciaKw').value = specificChars.potenciaKw || '';
                        document.getElementById('i_redHidrante').value = specificChars.redHidrante ? 'true' : 'false';
                        break;
                    case 'comercial':
                        document.getElementById('c_tieneCocina').checked = specificChars.tieneCocina || false;
                        document.getElementById('c_cortinaElectrica').checked = specificChars.cortinaElectrica || false;
                        break;
                }
            }

            // Lógica para previsualizar imágenes/videos/pdf existentes (básica)
            // Esto es más complejo y requeriría una estructura para mostrar thumbnails y eliminar.
            // Por ahora, solo se puede mostrar el nombre o una URL si aplica
            // if (property.images && property.images.length > 0) {
            //     const imgPreview = document.getElementById('image-preview');
            //     imgPreview.innerHTML = property.images.map(imgUrl => `<div class="image-item"><img src="${imgUrl}" alt="Img"></div>`).join('');
            // }
            // if (property.videoUrl) { /* mostrar enlace/video */ }
            // if (property.pdfUrl) { /* mostrar enlace/pdf */ }


        } catch (error) {
            console.error('Error al cargar la propiedad para edición:', error);
            alert('Error al cargar los datos de la propiedad: ' + error.message);
        }
    }


    // Event Listeners (los mismos de antes)
    typeSelect.addEventListener('change', () => {
        populateSubtypeSelect(typeSelect.value);
        toggleSpecificFields();
    });

    populateSubtypeSelect(typeSelect.value);
    toggleSpecificFields();

    // Lógica para el envío del formulario (la misma de antes)
    propertyForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(propertyForm);

        const commonData = {
            name: formData.get('name'),
            address: formData.get('address'),
            locality: formData.get('locality'),
            neighbourhood: formData.get('neighbourhood'),
            totalSurface: formData.get('totalSurface') ? parseFloat(formData.get('totalSurface')) : null,
            coveredSurface: formData.get('coveredSurface') ? parseFloat(formData.get('coveredSurface')) : null,
            description: formData.get('description'),
            type: formData.get('type'),
            subtype: formData.get('subtype'),
            category: formData.get('category'),
            price: formData.get('price') ? parseFloat(formData.get('price')) : null,
            currency: formData.get('currency'),
            amenities: Array.from(propertyForm.querySelectorAll('input[name="amenities"]:checked')).map(cb => cb.value),
            // Asume que isPublished es un checkbox, si no existe o no está marcado, es false
            isPublished: propertyForm.querySelector('input[name="isPublished"]')?.checked || false
        };

        const specificChars = {};
        const selectedType = commonData.type;

        switch (selectedType) {
            case 'vivienda':
            case 'departamento':
                specificChars.ambientes = formData.get('v_ambientes') ? parseInt(formData.get('v_ambientes')) : null;
                specificChars.dormitorios = formData.get('v_dormitorios') ? parseInt(formData.get('v_dormitorios')) : null;
                specificChars.banos = formData.get('v_banos') ? parseInt(formData.get('v_banos')) : null;
                specificChars.cocheras = formData.get('v_cocheras') ? parseInt(formData.get('v_cocheras')) : null;
                break;
            case 'lote':
                specificChars.topografia = formData.get('l_topografia');
                specificChars.metrosFrente = formData.get('l_metrosFrente') ? parseFloat(formData.get('l_metrosFrente')) : null;
                break;
            case 'industrial':
                specificChars.potenciaKw = formData.get('i_potenciaKw') ? parseFloat(formData.get('i_potenciaKw')) : null;
                specificChars.redHidrante = propertyForm.querySelector('#i_redHidrante')?.value === 'true';
                break;
            case 'comercial':
                specificChars.tieneCocina = propertyForm.querySelector('#c_tieneCocina')?.checked || false;
                specificChars.cortinaElectrica = propertyForm.querySelector('#c_cortinaElectrica')?.checked || false;
                break;
        }

        if (Object.keys(specificChars).length > 0) {
            commonData.specificCharacteristics = specificChars;
        } else {
            commonData.specificCharacteristics = {};
        }

        console.log('Datos a enviar:', commonData);

        try {
            // Determinar si es una creación o una edición
            const propertyId = new URLSearchParams(window.location.search).get('id'); // Obtener ID de la URL
            const method = propertyId ? 'PUT' : 'POST';
            const url = propertyId ? `/api/properties/${propertyId}` : '/api/properties';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(commonData)
            });

            const result = await response.json();

            if (response.ok) {
                alert('Propiedad guardada con éxito!');
                window.location.href = '/admin/dashboard.html';
            } else {
                alert('Error al guardar la propiedad: ' + (result.message || 'Error desconocido.'));
            }

        } catch (error) {
            console.error('Error al enviar la propiedad:', error);
            alert('Error de conexión al guardar la propiedad.');
        }
    });

    // Lógica para previsualizar imágenes (si la quieres aquí)
    function previewImages(event) {
        const previewContainer = document.getElementById("image-preview");
        previewContainer.innerHTML = ""; // Limpiar previsualizaciones anteriores

        if (event.target.files) {
            Array.from(event.target.files).forEach((file) => {
                if (file.type.startsWith("image/")) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const imgItem = document.createElement("div");
                        imgItem.classList.add("image-item");
                        const img = document.createElement("img");
                        img.src = e.target.result;
                        imgItem.appendChild(img);

                        const deleteBtn = document.createElement("button");
                        deleteBtn.classList.add("delete-img-btn");
                        deleteBtn.innerHTML = "&times;";
                        deleteBtn.onclick = () => {
                            imgItem.remove();
                            // Aquí necesitarías lógica más avanzada para manejar la eliminación de archivos si es una edición.
                            // Por ahora, solo elimina la previsualización.
                        };
                        imgItem.appendChild(deleteBtn);
                        previewContainer.appendChild(imgItem);
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    }
    // Asegúrate de que el input de imágenes tenga el onchange adecuado en el HTML:
    // <input type="file" id="images" name="images[]" multiple accept="image/*" onchange="previewImages(event)">


    // Lógica principal al cargar la página: Detectar si es edición y cargar datos
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = urlParams.get('id');

    if (propertyId) {
        // Estamos en modo edición, cargar los datos de la propiedad
        loadPropertyForEdit(propertyId);
        // Puedes cambiar el título del formulario si lo deseas
        document.querySelector('.property-form h2').textContent = 'Editar Propiedad';
    } else {
        // Estamos en modo creación, el formulario ya está vacío
        document.querySelector('.property-form h2').textContent = 'Crear Nueva Propiedad';
    }

});