const fs = require('fs');
const xlsx = require('xlsx');
const chokidar = require('chokidar');


function parseData(cellValue) {
    if (!cellValue) return [];
    const items = cellValue.split(';').map(item => item.trim()).filter(item => item !== '');
    return items.map(item => {
        const parts = item.split(',').map(part => part.trim());
        const obj = {};
        parts.forEach(part => {
            const [key, value] = part.split(':').map(p => p.trim());
            if (key && value) {
                obj[key] = value;
            }
        });
        return obj;
    });
}
function convertExcelToJson() {
    try {
        console.log('🟢 Ejecutando conversión...');
        const workbook = xlsx.readFile('../assets/ddbb/properties.xlsx');
        const sheetName = workbook.SheetNames[0];
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        const processedData = data.map(row => ({
            ...row,
            images: parseData(row.images),
            features: parseData(row.features),
            cover: row.cover ? row.cover.trim() : ''
        }));

        fs.writeFileSync('properties.json', JSON.stringify(processedData, null, 4));
        console.log('✅ JSON actualizado');
    } catch (error) {
        console.error('Error al procesar el archivo:', error);
    }
}

const watcher = chokidar.watch('../assets/ddbb/properties.xlsx', { persistent: true, usePolling:true, interval:500 });


watcher.on('all', (event, path) => {
    console.log(`📡 Evento: ${event} en ${path}`);
    if (['change', 'add', 'unlink'].includes(event)) {
        convertExcelToJson();
    }
});

console.log('Monitoreando cambios en el archivo: ../assets/ddbb/properties.xlsx');

