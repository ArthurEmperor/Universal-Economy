// Taxas de câmbio fixas (base: Real)
const taxasCambio = {
    BRL: 1,
    USD: 5.20,  // 1 USD = 5.20 BRL
    EUR: 5.60   // 1 EUR = 5.60 BRL
};

// Fatores de conversão de medidas
const medidas = {
    comprimento: {
        metro: 1,
        centimetro: 100,
        milimetro: 1000,
        quilometro: 0.001,
        polegada: 39.3701,
        pe: 3.28084
    },
    peso: {
        quilo: 1,
        grama: 1000,
        miligrama: 1000000,
        libra: 2.20462,
        onca: 35.274
    },
    volume: {
        litro: 1,
        mililitro: 1000,
        metroCubico: 0.001,
        galao: 0.264172,
        copo: 4.22675  // copos americanos
    },
    temperatura: {
        celsius: 'c',
        fahrenheit: 'f',
        kelvin: 'k'
    }
};

// Tabelas de impostos
const tabelaSimplesNacional = {
    comercio: 0.04,    // 4%
    industria: 0.045,  // 4.5%
    servicos: 0.06     // 6%
};

const mei = {
    contribuicao: 67.00,  // valor fixo mensal (2024)
    inss: 0.11,           // 11% do salário mínimo
    iss: 5.00             // valor fixo para algumas atividades
};

// Benefícios CLT (aproximados)
const beneficiosCLT = {
    decimoTerceiro: 1,     // 1 salário extra por ano
    ferias: 1.33,          // férias + 1/3
    fgts: 0.08,            // 8% do salário
    inss: 0.20,            // 20% sobre a folha (parte do empregador)
    valeTransporte: 0.06,  // 6% do salário (estimativa)
    valeRefeicao: 500      // valor médio mensal
};