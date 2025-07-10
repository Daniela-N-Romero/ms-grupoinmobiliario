// backend/routes/propertyRoutes.js
const express = require('express');
const router = express.Router();
const { Property } = require('../config/database'); // Importamos el modelo Property

// Middleware de autenticación (¡Importante!)
// Esto asegurará que solo los usuarios logueados puedan acceder a estas rutas
// Lo implementaremos más adelante, por ahora lo dejamos como un placeholder
const authenticate = (req, res, next) => {
    // Si no hay una sesión de usuario (ej. req.session.userId), redirige al login
    if (!req.session.userId) {
        // Para API, respondemos con 401 Unauthorized
        return res.status(401).json({ message: 'No autorizado. Por favor, inicie sesión.' });
    }
    next(); // Continúa con la siguiente función en la ruta
};

// Ruta para obtener todas las propiedades (READ all)
router.get('/', authenticate, async (req, res) => { // Agregamos 'authenticate' como middleware
    try {
        const properties = await Property.findAll(); // Obtener todas las propiedades de la DB
        res.json(properties); // Enviar las propiedades como respuesta JSON
    } catch (error) {
        console.error('Error al obtener propiedades:', error);
        res.status(500).json({ message: 'Error interno del servidor al obtener propiedades.' });
    }
});

// Ruta para obtener una propiedad por ID (READ one)
router.get('/:id', authenticate, async (req, res) => {
    try {
        const property = await Property.findByPk(req.params.id); // Buscar por Primary Key (ID)

        if (!property) {
            return res.status(404).json({ message: 'Propiedad no encontrada.' });
        }
        res.json(property);
    } catch (error) {
        console.error('Error al obtener propiedad por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor al obtener la propiedad.' });
    }
});

// Ruta para crear una nueva propiedad (CREATE)
router.post('/', authenticate, async (req, res) => { // <--- ¡ESTA ES LA RUTA QUE FALTABA!
    try {
        const newProperty = await Property.create(req.body); // Sequelize crea el registro
        res.status(201).json(newProperty); // 201 Created
    } catch (error) {
        console.error('Error al crear la propiedad:', error);
        // Puedes loguear req.body aquí para depurar datos recibidos
        // console.error('Datos recibidos para crear:', req.body);
        res.status(500).json({ message: 'Error interno del servidor al crear propiedad.', error: error.message });
    }
});

// Ruta para actualizar una propiedad existente (UPDATE)
router.put('/:id', authenticate, async (req, res) => { // <--- ¡ESTA ES LA RUTA QUE FALTABA!
    try {
        const propertyId = req.params.id;
        const [updatedRows] = await Property.update(req.body, {
            where: { id: propertyId }
        });

        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Propiedad no encontrada para actualizar.' });
        }

        const updatedProperty = await Property.findByPk(propertyId); // Obtener la propiedad actualizada
        res.json(updatedProperty);

    } catch (error) {
        console.error('Error al actualizar la propiedad:', error);
        res.status(500).json({ message: 'Error interno del servidor al actualizar propiedad.', error: error.message });
    }
});

// Ruta para eliminar una propiedad (DELETE - la implementaremos más tarde)
// router.delete('/:id', authenticate, async (req, res) => {
//     try {
//         const propertyId = req.params.id;
//         const deletedRows = await Property.destroy({
//             where: { id: propertyId }
//         });

//         if (deletedRows === 0) {
//             return res.status(404).json({ message: 'Propiedad no encontrada para eliminar.' });
//         }

//         res.status(204).send(); // 204 No Content para eliminación exitosa
//     } catch (error) {
//         console.error('Error al eliminar la propiedad:', error);
//         res.status(500).json({ message: 'Error interno del servidor al eliminar propiedad.', error: error.message });
//     }
// });


module.exports = router;