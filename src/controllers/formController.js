const valueMappingPolitica = {
    'nenhuma-politica': 20,
    'politica-informal': 40,
    'politica-parcialmente-escrita': 60,
    'politica-escrita': 80,
    'politica-escrita-aprovada': 100,
    'nao-aplicavel': null,
};

const valueMappingControleImplementado = {
    'nenhum-controle': 20,
    'controle-informal': 40,
    'controle-parcialmente-implementado': 60,
    'controle-implementado': 80,
    'controle-implementado-aprovado': 100,
    'nao-aplicavel': null,
};

const valueMappingControleAutomatizado = {
    'nenhuma-automacao': 20,
    'automacao-informal': 40,
    'automacao-parcial': 60,
    'automacao-total': 80,
    'automacao-total-aprovada': 100,
    'nao-aplicavel': null,
};

const valueMappingControleRelatado = {
    'nenhum-relato': 20,
    'relato-informal': 40,
    'relato-parcial': 60,
    'relato-completo': 80,
    'relato-completo-aprovado': 100,
    'nao-aplicavel': null,
};

// Estrutura para armazenar os dados dos formulários
let formDataStore = {};

const handleFormSave = (req, res) => {
    const { formId, politicaDefinida, controleImplementado, controleAutomatizado, controleRelatado } = req.body;

    function getValor(option, mapping) {
        return mapping[option] || null;
    }

    const valorPolitica = getValor(politicaDefinida, valueMappingPolitica);
    const valorControleImplementado = getValor(controleImplementado, valueMappingControleImplementado);
    const valorControleAutomatizado = getValor(controleAutomatizado, valueMappingControleAutomatizado);
    const valorControleRelatado = getValor(controleRelatado, valueMappingControleRelatado);

    const savedData = {
        politicaDefinida: valorPolitica,
        controleImplementado: valorControleImplementado,
        controleAutomatizado: valorControleAutomatizado,
        controleRelatado: valorControleRelatado
    };

    if (!formDataStore[formId]) {
        formDataStore[formId] = [];
    }

    formDataStore[formId].push(savedData);

    console.log('Dados mapeados e salvos: ', { formId, ...savedData });

    res.status(200).json({ message: 'Dados salvos com sucesso', data: { formId, ...savedData } });
};

const calculateAverages = (req, res) => {
    const averages = {};

    for (const formId in formDataStore) {
        const entries = formDataStore[formId];
        let totalSum = 0;
        let count = 0;

        entries.forEach(entry => {
            for (const key in entry) {
                if (entry[key] !== null) {
                    totalSum += entry[key];
                    count += 1;
                }
            }
        });

        averages[formId] = {
            [`média do ${formId}`]: count > 0 ? totalSum / count : 0
        };
    }

    console.log('Médias calculadas:', averages);

    res.status(200).json({ message: 'Médias calculadas com sucesso', data: averages });
};

module.exports = {
    handleFormSave,
    calculateAverages
};