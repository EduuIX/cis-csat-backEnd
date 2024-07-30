const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../data.json');

const readData = () => {
    try {
        const data = fs.readFileSync(dataFilePath);
        return JSON.parse(data);
    } catch (error) {
        console.error('Erro ao ler dados:', error);
        return { formDataStore: {} };
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Erro ao escrever dados:', error);
    }
};

module.exports = {
    readData,
    writeData
};
