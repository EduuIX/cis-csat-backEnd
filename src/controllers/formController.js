const { readData, writeData } = require('../services/dataService');

// Mapeamento de valores
const valueMappingPolitica = {
    'nenhuma-politica': 20,
    'politica-informal': 40,
    'politica-parcialmente-escrita': 60,
    'politica-escrita': 80,
    'politica-escrita-aprovada': 100,
    'nao-aplicavel': 0,
};

const valueMappingControleImplementado = {
    'nenhum-controle': 20,
    'controle-informal': 40,
    'controle-parcialmente-implementado': 60,
    'controle-implementado': 80,
    'controle-implementado-aprovado': 100,
    'nao-aplicavel': 0,
};

const valueMappingControleAutomatizado = {
    'nenhuma-automacao': 20,
    'automacao-informal': 40,
    'automacao-parcial': 60,
    'automacao-total': 80,
    'automacao-total-aprovada': 100,
    'nao-aplicavel': 0,
};

const valueMappingControleRelatado = {
    'nenhum-relato': 20,
    'relato-informal': 40,
    'relato-parcial': 60,
    'relato-completo': 80,
    'relato-completo-aprovado': 100,
    'nao-aplicavel': 0,
};

const handleFormSave = (req, res) => {
    const { formId, politicaDefinida, controleImplementado, controleAutomatizado, controleRelatado } = req.body;

    function getValor(option, mapping) {
        return mapping[option] || 0;
    }

    const valorPolitica = getValor(politicaDefinida, valueMappingPolitica);
    const valorControleImplementado = getValor(controleImplementado, valueMappingControleImplementado);
    const valorControleAutomatizado = getValor(controleAutomatizado, valueMappingControleAutomatizado);
    const valorControleRelatado = getValor(controleRelatado, valueMappingControleRelatado);

    const data = readData();
    const formDataStore = data.formDataStore || {};

    // Atualizar dados existentes no armazenamento
    formDataStore[formId] = {
        politicaDefinida: valorPolitica,
        controleImplementado: valorControleImplementado,
        controleAutomatizado: valorControleAutomatizado,
        controleRelatado: valorControleRelatado
    };

    // Salvar dados atualizados no arquivo JSON
    writeData({ formDataStore });

    console.log('Dados mapeados e salvos: ', { formId, ...formDataStore[formId] });

    res.status(200).json({ message: 'Dados salvos com sucesso', data: { formId, ...formDataStore[formId] } });
};

const calculateAverages = (req, res) => {
    const data = readData();
    const formDataStore = data.formDataStore || {};
    const averages = {};

    for (const formId in formDataStore) {
        const entry = formDataStore[formId];
        let totalSum = 0;
        let count = 0;

        for (const key in entry) {
            if (entry[key] !== null) {
                totalSum += entry[key];
                count += 1;
            }
        }

        averages[formId] = {
            [`média do ${formId}`]: count > 0 ? totalSum / count : 0
        };
    }

    console.log('Médias calculadas:', averages);

    res.status(200).json({ message: 'Médias calculadas com sucesso', data: averages });
};

const calculateOverallAverage = (req, res) => {
    const data = readData();
    const formDataStore = data.formDataStore || {};
    let totalSum = 0;
    let count = 0;

    for (const formId in formDataStore) {
        const entry = formDataStore[formId];

        for (const key in entry) {
            if (entry[key] !== null) {
                totalSum += entry[key];
                count += 1;
            }
        }
    }

    const overallAverage = count > 0 ? totalSum / count : 0;

    console.log('Média geral calculada:', overallAverage);

    res.status(200).json({ message: 'Média geral calculada com sucesso', data: { overallAverage } });
};

module.exports = {
    handleFormSave,
    calculateAverages,
    calculateOverallAverage
};
