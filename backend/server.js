// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session'); // Para manejar sesiones

// Cargar variables de entorno desde .env
dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // Usa el puerto del .env o 3000 por defecto

// Importar la configuración de la base de datos
const { connectDB } = require('./config/database');

// Middleware para parsear el cuerpo de las peticiones JSON
app.use(express.json());
// Middleware para parsear datos de formularios (url-encoded)
app.use(express.urlencoded({ extended: true }));

// Configuración de sesiones



// // // // // // NOTA: En producción, la clave secreta (secret) debe ser una cadena larga y aleatoria
// // // // // // y debe almacenarse en una variable de entorno. También necesitarás un store de sesiones
// // // // // // persistente (ej. connect-pg-simple para PostgreSQL) en producción.
app.use(session({
    secret: process.env.SESSION_SECRET || 'mi_secreto_super_seguro_y_largo',
    resave: false, // No guardar la sesión si no ha cambiado
    saveUninitialized: false, // No guardar sesiones sin inicializar
    cookie: {
        secure: process.env.NODE_ENV === 'production', // true en producción (requiere HTTPS)
        maxAge: 1000 * 60 * 60 * 24 // 1 día (en milisegundos)
    }
}));

// --- Servir archivos estáticos ---
// Tu panel de administración
app.use('/admin', express.static(path.join(__dirname, '../admin')));

// Si quieres servir específicamente el contenido de 'inmobiliaria' en la raíz o una subruta
app.use('/inmobiliaria', express.static(path.join(__dirname, '../pages/inmobiliaria')));

// Y si tu homepage principal es homeinmobiliaria.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/inmobiliaria/homeinmobiliaria.html'));
});


// --- Rutas de API ---
// IMPORTANTE: Aquí vamos a importar las rutas de autenticación y propiedades.
// Todavía no las hemos creado, pero las incluiremos aquí.
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');

app.use('/api/auth', authRoutes); // Prefijo para rutas de autenticación: /api/auth/login
app.use('/api/properties', propertyRoutes); // Prefijo para rutas de propiedades: /api/properties

// Ruta de ejemplo para la raíz del backend (puedes borrarla después)
app.get('/api', (req, res) => {
    res.send('API del Panel de Administración funcionando!');
});

// Manejo de errores 404 (si ninguna ruta coincide)
app.use((req, res, next) => {
    res.status(404).send("Lo siento, no puedo encontrar eso!");
});

// Conectar a la base de datos y luego iniciar el servidor

connectDB().then(() => { 
    app.listen(port, () => {
        console.log(`Servidor Express escuchando en http://localhost:${port}`);
        console.log(`Panel de administración en: http://localhost:${port}/admin/login.html`);
        console.log(`Sitio público en: http://localhost:${port}/`);
    });
}).catch(err => {
    console.error('Fallo al iniciar el servidor debido a un error de base de datos:', err);
    process.exit(1);
});

