// admin/js/login.js
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita el envío tradicional del formulario

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessageElement = document.getElementById('errorMessage');

    try {
        const response = await fetch('/api/auth/login', { // La URL de tu API de login
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) { // Si la respuesta HTTP es 200 OK
            errorMessageElement.textContent = ''; // Limpiar cualquier error previo
            window.location.href = data.redirectTo; // Redirigir al dashboard
        } else {
            // Si la respuesta es un error (ej. 401 Unauthorized)
            errorMessageElement.textContent = data.message || 'Error en el login. Inténtalo de nuevo.';
        }
    } catch (error) {
        console.error('Error al conectar con el servidor:', error);
        errorMessageElement.textContent = 'No se pudo conectar con el servidor. Inténtalo de nuevo.';
    }
});