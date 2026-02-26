// Função para converter moedas
function converterMoeda() {
    const valor = parseFloat(document.getElementById('valorMoeda').value) || 1;
    const origem = document.getElementById('moedaOrigem').value;
    const destino = document.getElementById('moedaDestino').value;
    
    // Converte para real primeiro
    const valorEmReal = valor * (1 / taxasCambio[origem]) * taxasCambio['BRL'];
    // Depois converte para moeda destino
    const valorConvertido = valorEmReal * (1 / taxasCambio['BRL']) * taxasCambio[destino];
    
    const resultado = document.getElementById('resultadoMoeda');
    resultado.innerHTML = `
        <strong>${formatarMoeda(valor, origem)}</strong> = 
        <strong style="color: #667eea; font-size: 1.3em;">${formatarMoeda(valorConvertido, destino)}</strong>
    `;
}

// Função para formatar valores monetários
function formatarMoeda(valor, moeda) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: moeda === 'BRL' ? 'BRL' : moeda === 'USD' ? 'USD' : 'EUR'
    }).format(valor);
}

// Atualizar opções de medida baseado no tipo selecionado
function atualizarOpcoesMedida() {
    const tipo = document.getElementById('tipoMedida').value;
    const origemSelect = document.getElementById('medidaOrigem');
    const destinoSelect = document.getElementById('medidaDestino');
    
    let opcoes = '';
    let unidades = [];
    
    if (tipo === 'comprimento') {
        unidades = Object.keys(medidas.comprimento);
    } else if (tipo === 'peso') {
        unidades = Object.keys(medidas.peso);
    } else if (tipo === 'volume') {
        unidades = Object.keys(medidas.volume);
    } else if (tipo === 'temperatura') {
        unidades = ['celsius', 'fahrenheit', 'kelvin'];
    }
    
    unidades.forEach(unidade => {
        const nomeFormatado = unidade.charAt(0).toUpperCase() + unidade.slice(1);
        opcoes += `<option value="${unidade}">${nomeFormatado}</option>`;
    });
    
    origemSelect.innerHTML = opcoes;
    destinoSelect.innerHTML = opcoes;
    
    // Seleciona opções diferentes por padrão
    if (unidades.length > 1) {
        destinoSelect.selectedIndex = 1;
    }
}

// Função para converter medidas
function converterMedida() {
    const valor = parseFloat(document.getElementById('valorMedida').value) || 1;
    const tipo = document.getElementById('tipoMedida').value;
    const origem = document.getElementById('medidaOrigem').value;
    const destino = document.getElementById('medidaDestino').value;
    
    let resultado = 0;
    
    if (tipo === 'temperatura') {
        // Conversão especial para temperatura
        if (origem === 'celsius' && destino === 'fahrenheit') {
            resultado = (valor * 9/5) + 32;
        } else if (origem === 'fahrenheit' && destino === 'celsius') {
            resultado = (valor - 32) * 5/9;
        } else if (origem === 'celsius' && destino === 'kelvin') {
            resultado = valor + 273.15;
        } else if (origem === 'kelvin' && destino === 'celsius') {
            resultado = valor - 273.15;
        } else if (origem === 'fahrenheit' && destino === 'kelvin') {
            resultado = (valor - 32) * 5/9 + 273.15;
        } else if (origem === 'kelvin' && destino === 'fahrenheit') {
            resultado = (valor - 273.15) * 9/5 + 32;
        } else {
            resultado = valor; // mesma unidade
        }
    } else {
        // Conversão padrão para medidas lineares
        const medidasTipo = medidas[tipo];
        const valorBase = valor / medidasTipo[origem]; // converte para unidade base
        resultado = valorBase * medidasTipo[destino];
    }
    
    document.getElementById('resultadoMedida').innerHTML = `
        <strong>${valor.toFixed(2)} ${origem}</strong> = 
        <strong style="color: #667eea; font-size: 1.3em;">${resultado.toFixed(4)} ${destino}</strong>
    `;
}

// Inicializar opções de medida quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('tipoMedida')) {
        atualizarOpcoesMedida();
    }
});