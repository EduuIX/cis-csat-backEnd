// src/controllers/formController.js

const valueMappingPolitica = {
    'nenhuma-politica': 20,
    'politica-informal': 40,
    'politica-parcialmente-escrita': 60,
    'politica-escrita': 80,
    'politica-escrita-aprovada': 100,
    'nao-aplicavel': null,
};

const valueMappingControleImplementado = {
    // Valores específicos para controle implementado
    'nenhum-controle': 20,
    'controle-informal': 40,
    'controle-parcialmente-implementado': 60,
    'controle-implementado': 80,
    'controle-implementado-aprovado': 100,
    'nao-aplicavel': null,
};

const valueMappingControleAutomatizado = {
    // Valores específicos para controle automatizado
    'nenhuma-automacao': 20,
    'automacao-informal': 40,
    'automacao-parcial': 60,
    'automacao-total': 80,
    'automacao-total-aprovada': 100,
    'nao-aplicavel': null,
};

const valueMappingControleRelatado = {
    // Valores específicos para controle relatado
    'nenhum-relato': 20,
    'relato-informal': 40,
    'relato-parcial': 60,
    'relato-completo': 80,
    'relato-completo-aprovado': 100,
    'nao-aplicavel': null,
};

const handleFormSave = (req, res) => {
    const { formId, politicaDefinida, controleImplementado, controleAutomatizado, controleRelatado } = req.body;

    // Função para mapear os valores do select usando o mapeamento apropriado
    function getValor(option, mapping) {
        const valor = mapping[option];
        console.log(`Mapeando ${option} -> ${valor}`);
        return mapping[option] || null;
    }

    const valorPolitica = getValor(politicaDefinida, valueMappingPolitica);
    const valorControleImplementado = getValor(controleImplementado, valueMappingControleImplementado);
    const valorControleAutomatizado = getValor(controleAutomatizado, valueMappingControleAutomatizado);
    const valorControleRelatado = getValor(controleRelatado, valueMappingControleRelatado);

    // Simulando o salvamento no banco de dados
    const savedData = {
        formId: formId,
        politicaDefinida: valorPolitica,
        controleImplementado: valorControleImplementado,
        controleAutomatizado: valorControleAutomatizado,
        controleRelatado: valorControleRelatado
    };

    console.log('Dados mapeados e salvos: ', savedData);

    res.status(200).json({ message: 'Dados salvos com sucesso', data: savedData });
};

module.exports = {
    handleFormSave
};
