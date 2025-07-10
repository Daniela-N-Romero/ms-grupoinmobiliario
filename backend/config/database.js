// backend/config/database.js
const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");

// Cargar variables de entorno si aún no lo están (útil si este archivo se ejecuta independientemente)
dotenv.config();

// Configuración de la conexión a la base de datos
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // Asegúrate de que el puerto sea un número si es necesario, Sequelize lo maneja bien con string
    dialect: "postgres",
    logging: false, // Establece a true para ver las consultas SQL en la consola
    dialectOptions: {
      ssl:
        process.env.NODE_ENV === "production"
          ? {
              require: true,
              rejectUnauthorized: false, // En producción, considera configurar SSL correctamente si tu proveedor lo requiere
            }
          : false,
    },
  }
);

// --- Definición de Modelos ---
// Modelo de Usuario (para el acceso al panel de administración)
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      // Aquí se almacenará el hash de la contraseña
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true, // Puedes hacerlo false si el email es obligatorio
      validate: {
        isEmail: true, // Valida que sea un formato de email válido
      },
    },
    role: {
      // Ejemplo de un rol para diferenciar tipos de usuarios (ej. 'admin', 'editor')
      type: DataTypes.STRING,
      defaultValue: "admin", // Por defecto, asignamos 'admin' para este proyecto
    },
    // Puedes añadir más campos como 'firstName', 'lastName', 'createdAt', 'updatedAt'
  },
  {
    tableName: "users", // Nombre real de la tabla en la DB
    timestamps: true, // Habilita createdAt y updatedAt automáticamente
  }
);

// Modelo de Propiedad
const Property = sequelize.define(
  "Property",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    locality: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    neighborhood: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    totalSurface: {
      // Superficie Total
      type: DataTypes.DECIMAL(10, 2), // Ejemplo: 12345.67
      allowNull: true,
    },
    coveredSurface: {
      // Superficie Cubierta
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT, // Para texto largo
      allowNull: true,
    },
    type: {
      // Tipo de propiedad: 'vivienda', 'industrial', 'lote', 'comercial', etc.
      type: DataTypes.STRING,
      allowNull: false,
    },
    subtype: {
      // Tipo de propiedad: 'casa', 'departamento', 'moonambiente','local', 'galpón', 'nave industrial', 'oficina' etc.
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      // Categoría: 'venta', 'alquiler'
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(15, 2), // Para manejar precios con decimales
      allowNull: true,
    },
    currency: {
      // Moneda, ej: 'USD', 'ARS'
      type: DataTypes.STRING,
      defaultValue: "USD",
    },
    specificCharacteristics: {
      type: DataTypes.JSONB, // Tipo de dato JSONB para PostgreSQL
      allowNull: true, // Puede ser nulo si no hay características específicas
      defaultValue: {}, // Por defecto, un objeto JSON vacío
    },

    // Campos para archivos (imágenes, video, PDF) - Almacenarías URL/rutas de archivos
    images: {
      // Array de URLs o rutas a las imágenes
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    videoUrl: {
      // URL o ruta al video
      type: DataTypes.STRING,
      allowNull: true,
    },
    pdfUrl: {
      // URL o ruta al PDF
      type: DataTypes.STRING,
      allowNull: true,
    },
    isPublished: {
      // Para publicar/despublicar la propiedad
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "properties", // Nombre real de la tabla en la DB
    timestamps: true,
  }
);

// --- Sincronizar Modelos con la Base de Datos ---
// Esto creará las tablas si no existen.
// En producción, es mejor usar migraciones de Sequelize.
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida exitosamente.");
    // Sincronizar todos los modelos
    // { force: true } borrará y recreará las tablas (¡ÚTIL EN DESARROLLO, PELIGROSO EN PRODUCCIÓN!)
    // { alter: true } intentará hacer cambios mínimos a las tablas existentes
    await sequelize.sync({ alter: true });
    console.log("Tablas de la base de datos sincronizadas.");
  } catch (error) {
    console.error(
      "No se pudo conectar o sincronizar con la base de datos:",
      error
    );
    // Salir de la aplicación si no se puede conectar a la DB
    process.exit(1);
  }
};

module.exports = {
  sequelize,
  User,
  Property,
  connectDB,
};
