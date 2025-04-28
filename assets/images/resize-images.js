const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = './properties/convertir';
const outputDir = './properties/convertido';
const sizes = [480, 768, 1024, 1440];


// Función para convertir y redimensionar imágenes a WebP
function convertToWebP(imagePath) {
    const imageName = path.basename(imagePath, path.extname(imagePath)); // Extrae el nombre de la imagen sin extensión
    
    sizes.forEach(size => {
      const outputImagePath = path.join(outputDir, `${imageName}-${size}.webp`); // Define la ruta de salida para cada tamaño
    
      sharp(imagePath)
        .resize(size)  // Redimensiona la imagen al tamaño especificado
        .webp({ quality: 80 })  // Convierte a WebP con calidad 80
        .toFile(outputImagePath, (err, info) => {
          if (err) {
            console.error('Error al convertir la imagen:', err);
          } else {
            // Mostramos los detalles del archivo procesado
            console.log(`✅ Imagen convertida y redimensionada: ${outputImagePath}`);
          }
        });
    });
  }
  
  // Verificamos si el directorio de salida existe, si no lo creamos
  if (!fs.existsSync(outputDir)){
      fs.mkdirSync(outputDir);
  }
  
  // Leer todas las imágenes en el directorio de entrada
  fs.readdirSync(inputDir).forEach(file => {
    const filePath = path.join(inputDir, file);
    // Verificamos si el archivo es una imagen (puedes agregar más extensiones si lo necesitas)
    if (['.jpg', '.jpeg', '.png'].includes(path.extname(file).toLowerCase())) {
      convertToWebP(filePath); // Llamamos a la función para convertir la imagen
    }
  });
  
  // Verificamos si el directorio de salida existe, si no lo creamos
  if (!fs.existsSync(outputDir)){
      fs.mkdirSync(outputDir);
  }
  
  // Leer todas las imágenes en el directorio de entrada
  fs.readdirSync(inputDir).forEach(file => {
    const filePath = path.join(inputDir, file);
    // Verificamos si el archivo es una imagen (puedes agregar más extensiones si lo necesitas)
    if (['.jpg', '.jpeg', '.png'].includes(path.extname(file).toLowerCase())) {
      convertToWebP(filePath); // Llamamos a la función para convertir la imagen
    }
  });