// backend/utils/createAdmin.js
const bcrypt = require('bcryptjs');
const { User, connectDB } = require('../config/database'); // Importa User y connectDB

const createAdminUser = async () => {
    // Asegúrate de que la conexión a la DB esté establecida
    await connectDB(); // Llama a connectDB para asegurar que las tablas existen

    const username = 'admin'; // El nombre de usuario para tu admin
    const password = 'password123'; // ¡CAMBIA ESTA CONTRASEÑA POR UNA FUERTE EN PRODUCCIÓN!
    const email = 'admin@tudominio.com';

    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ where: { username: username } });

        if (existingUser) {
            console.log(`El usuario '${username}' ya existe. No se creará uno nuevo.`);
            return;
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10); // 10 es el costo de salting (número de rondas)

        // Crear el usuario en la base de datos
        const newUser = await User.create({
            username: username,
            password: hashedPassword,
            email: email,
            role: 'admin'
        });

        console.log(`Usuario administrador '${newUser.username}' creado con éxito.`);

    } catch (error) {
        console.error('Error al crear el usuario administrador:', error);
    } finally {
        // Cierra la conexión a la base de datos (si connectDB no la cierra automáticamente)
        // En este caso, Sequelize gestiona el pool, así que no es estrictamente necesario,
        // pero si tuvieras una conexión manual, la cerrarías aquí.
        process.exit(0); // Sale del script
    }
};

createAdminUser();