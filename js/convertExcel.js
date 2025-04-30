const xlsx = require('xlsx');
const fs = require('fs');
const chokidar = require('chokidar');  // Importamos chokidar para monitorear el archivo

// Función para procesar los campos con formato similar
function parseData(cellValue) {
    // Solo procesamos las celdas que no están vacías
    if (!cellValue) return [];
    
    // Separamos los elementos por ';' (para las imágenes y características)
    const items = cellValue.split(';').map(item => item.trim()).filter(item => item !== '');
    
    return items.map(item => {
        // Dividimos cada item por ',' para obtener los pares clave:valor
        const parts = item.split(',').map(part => part.trim());
        const obj = {};
        
        // Para cada par, asignamos una clave y un valor
        parts.forEach(part => {
            const [key, value] = part.split(':').map(p => p.trim());
            if (key && value) {
                obj[key] = value;
            }
        });
        
        return obj;
    });
}

// Función para convertir el archivo Excel a JSON
function convertExcelToJson() {
    // Cargar el archivo Excel
    const workbook = xlsx.readFile('../assets/ddbb/properties.xlsx'); // Asegúrate de tener el archivo en la misma carpeta
    const sheetName = workbook.SheetNames[0]; // Obtiene el nombre de la primera hoja
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]); // Convierte la hoja a JSON

    // Procesamos cada fila de datos
    const processedData = data.map(row => {
        return {
            ...row,
            // Procesamos las columnas `images`, `features` y `cover`
            images: parseData(row.images),  // Procesa la columna de imágenes
            features: parseData(row.features), // Procesa la columna de características
            cover: row.cover ? row.cover.trim() : '' // La columna cover solo toma un valor de URL
        };
    });

    // Guardar el JSON en un archivo
    fs.writeFileSync('properties.json', JSON.stringify(processedData, null, 4));

    console.log('Conversión completada: properties.json generado.');
}

// Monitorear el archivo Excel usando chokidar
const watcher = chokidar.watch('../assets/ddbb/properties.xlsx', { persistent: true });

// Si el archivo cambia, vuelve a ejecutar la conversión
watcher.on('change', (path) => {
    console.log(`El archivo ha cambiado: ${path}`);
    convertExcelToJson(); // Ejecutar la conversión
});

console.log('Monitoreando cambios en el archivo: ../assets/ddbb/properties.xlsx');
