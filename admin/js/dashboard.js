// admin/js/dashboard.js

// Lógica para el logout (ya la tienes)
document.getElementById('logoutForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    try {
        const response = await fetch('/api/auth/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();

        if (response.ok) {
            window.location.href = data.redirectTo;
        } else {
            console.error('Error al cerrar sesión:', data.message || 'Error desconocido.');
            alert('Hubo un problema al cerrar la sesión.');
        }
    } catch (error) {
        console.error('Error al conectar con el servidor para cerrar sesión:', error);
        alert('No se pudo cerrar la sesión. Error de red.');
    }
});

// FUNCIÓN PARA OBTENER Y MOSTRAR LAS PROPIEDADES (¡ESTA ES LA QUE FALTABA!)
async function fetchProperties() {
    try {
        // Hacemos una petición GET a nuestra API para obtener las propiedades
        const response = await fetch('/api/properties', {
            method: 'GET', // Es una petición GET
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Si la sesión expiró o no está autorizado, el backend enviará un 401
        if (response.status === 401) {
            alert('Su sesión ha expirado o no está autorizado. Por favor, inicie sesión nuevamente.');
            window.location.href = '/admin/login.html'; // Redirige al login
            return;
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al obtener las propiedades.');
        }

        const properties = await response.json(); // Parseamos la respuesta JSON

        const tableBody = document.querySelector('#propertiesTable tbody');
        tableBody.innerHTML = ''; // Limpiar cualquier fila existente

        if (properties.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No hay propiedades registradas.</td></tr>';
            return;
        }

        properties.forEach(property => {
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = property.name;
            row.insertCell(1).textContent = property.address;
            row.insertCell(2).textContent = property.type;
            row.insertCell(3).textContent = property.category;

            const actionsCell = row.insertCell(4);
            actionsCell.classList.add('action-buttons');

            // Botón Ver/Editar
            const editButton = document.createElement('a');
            editButton.href = `/admin/property_form.html?id=${property.id}`; // Pasamos el ID en la URL
            editButton.innerHTML = '<button class="edit-btn">Ver/Editar</button>';
            actionsCell.appendChild(editButton);

            // Botón Eliminar
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-btn');
            deleteButton.textContent = 'Eliminar';
            deleteButton.onclick = () => confirmDelete(property.id); // Llama a la función de confirmación
            actionsCell.appendChild(deleteButton);
        });

    } catch (error) {
        console.error('Error al cargar las propiedades:', error);
        // Puedes mostrar un mensaje de error en el DOM si lo deseas
        alert('Error al cargar las propiedades: ' + error.message);
    }
}

// Lógica de confirmación de eliminación (ya la tienes, pero ahora llamará a una API)
// Por ahora, solo muestra un log. La funcionalidad DELETE la implementaremos después.
async function confirmDelete(propertyId) {
    if (confirm('¿Estás seguro de que quieres eliminar esta propiedad?')) {
        console.log('Se intentará eliminar la propiedad con ID:', propertyId);
        // Aquí iría la llamada a la API DELETE, que implementaremos más tarde
        // try {
        //     const response = await fetch(`/api/properties/${propertyId}`, {
        //         method: 'DELETE',
        //         headers: { 'Content-Type': 'application/json' }
        //     });
        //     if (response.ok) {
        //         alert('Propiedad eliminada con éxito.');
        //         fetchProperties(); // Recargar la lista
        //     } else {
        //         const errorData = await response.json();
        //         alert('Error al eliminar: ' + (errorData.message || 'Desconocido'));
        //     }
        // } catch (error) {
        //     console.error('Error de red al eliminar:', error);
        //     alert('Error de conexión al eliminar la propiedad.');
        // }
    }
}

// LLAMADA A LA FUNCIÓN fetchProperties CUANDO LA PÁGINA SE CARGA (¡ESTA TAMBIÉN FALTABA!)
document.addEventListener('DOMContentLoaded', fetchProperties);