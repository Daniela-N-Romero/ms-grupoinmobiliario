const fs = require('fs');
const xlsx = require('xlsx');
const chokidar = require('chokidar');

function parseData(data) {
    if (!data) return [];
    
    // Dividir por el delimitador y limpiar los valores
    return data.split(';').map(item => {
        const [key, value] = item.split(':');
        return {
            key: key.trim(),
            value: value ? value.trim() : null
        };
    });
}

function convertExcelToJson() {
    try {
        console.log('🟢 Ejecutando conversión...');
        const workbook = xlsx.readFile('/assets/ddbb/properties.xlsx');
        const sheetName = workbook.SheetNames[0];
        const rawData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        // Procesar cada fila y agregar features como array
        const data = rawData.map(row => ({
            ...row,
            features: parseData(row.features)  // Agrega aquí cualquier campo que quieras procesar
        }));

        fs.writeFileSync('js/properties.json', JSON.stringify(data, null, 4));
        console.log('✅ JSON actualizado');
        
    } catch (error) {
        console.error('❌ Error al procesar el archivo:', error);
    }
}

const watcher = chokidar.watch('/assets/ddbb/properties.xlsx', {
    persistent: true,
    usePolling: true,
    interval: 500
});

watcher.on('all', (event, path) => {
    console.log(`📡 Evento: ${event} en ${path}`);
    if (['change', 'add', 'unlink'].includes(event)) {
        convertExcelToJson();
        console.log('👀 Monitoreando cambios en el archivo: ./assets/ddbb/properties.xlsx');
    }
});

console.log('HIzo algo?');

