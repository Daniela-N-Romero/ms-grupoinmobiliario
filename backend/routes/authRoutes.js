// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // Necesitamos bcrypt para comparar contraseñas
const { User } = require('../config/database'); // Importamos el modelo User

// Ruta para el login de usuarios
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // 1. Buscar el usuario por nombre de usuario
    try {
        const user = await User.findOne({ where: { username: username } });

        if (!user) {
            // Usuario no encontrado
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // 2. Comparar la contraseña ingresada con el hash almacenado
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            // Contraseña incorrecta
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // 3. Si las credenciales son válidas, establecer la sesión
        // En este punto, el usuario está autenticado
        req.session.userId = user.id;
        req.session.username = user.username;
        req.session.role = user.role; // Almacenamos el rol en la sesión

        // 4. Redirigir o enviar una respuesta de éxito
        // Envía una respuesta JSON que el frontend interpretará para redirigir
        res.json({ message: 'Login exitoso', redirectTo: '/admin/dashboard.html' });

    } catch (error) {
        console.error('Error durante el login:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Ruta para el logout
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
            return res.status(500).json({ message: 'No se pudo cerrar la sesión' });
        }
        res.json({ message: 'Sesión cerrada exitosamente', redirectTo: '/admin/login.html' });
    });
});


module.exports = router;