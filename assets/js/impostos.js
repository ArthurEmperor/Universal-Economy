// Função para calcular Simples Nacional
function calcularSimplesNacional() {
    const faturamento = parseFloat(document.getElementById('faturamento').value) || 0;
    const atividade = document.getElementById('atividade').value;
    
    const aliquota = tabelaSimplesNacional[atividade];
    const imposto = faturamento * aliquota;
    const valorLiquido = faturamento - imposto;
    
    document.getElementById('resultadoSimples').innerHTML = `
        <div style="text-align: left;">
            <p><strong>Faturamento:</strong> ${formatarMoeda(faturamento, 'BRL')}</p>
            <p><strong>Alíquota:</strong> ${(aliquota * 100).toFixed(1)}%</p>
            <p><strong>Imposto a pagar:</strong> ${formatarMoeda(imposto, 'BRL')}</p>
            <p><strong>Valor líquido:</strong> ${formatarMoeda(valorLiquido, 'BRL')}</p>
            <hr>
            <p><small>* Valores aproximados. Consulte um contador.</small></p>
        </div>
    `;
}

// Função para calcular MEI
function calcularMEI() {
    const salarioMinimo = 1320; // valor aproximado
    const contribuicao = salarioMinimo * mei.inss;
    
    document.getElementById('resultadoMEI').innerHTML = `
        <div style="text-align: left;">
            <p><strong>Contribuição mensal MEI:</strong> ${formatarMoeda(contribuicao, 'BRL')}</p>
            <p><strong>INSS (11% do salário mínimo):</strong> ${formatarMoeda(contribuicao, 'BRL')}</p>
            <p><strong>ISS (fixo para algumas atividades):</strong> R$ 5,00 (quando aplicável)</p>
            <p><strong>Total aproximado:</strong> ${formatarMoeda(contribuicao + 5, 'BRL')}</p>
            <hr>
            <p><small>Valores de ${new Date().getFullYear()} (sujeito a alterações)</small></p>
        </div>
    `;
}

// Função para comparar CLT vs PJ
function compararCLTPJ() {
    const salarioCLT = parseFloat(document.getElementById('salarioCLT').value) || 0;
    const salarioPJ = parseFloat(document.getElementById('salarioPJ').value) || 0;
    
    // Cálculo CLT (valor total para empresa)
    const custoCLT = salarioCLT * (1 + beneficiosCLT.fgts + beneficiosCLT.inss);
    const valorFerias = salarioCLT * beneficiosCLT.ferias / 12;
    const valorDecimo = salarioCLT * beneficiosCLT.decimoTerceiro / 12;
    const valorVT = salarioCLT * beneficiosCLT.valeTransporte;
    const valorVR = beneficiosCLT.valeRefeicao;
    
    const custoTotalCLT = custoCLT + valorFerias + valorDecimo + valorVT + valorVR;
    const salarioLiquidoCLT = salarioCLT * 0.86; // aproximado após descontos
    
    // Cálculo PJ (considerando 11% de INSS como autônomo)
    const inssPJ = salarioPJ * 0.11;
    const salarioLiquidoPJ = salarioPJ - inssPJ;
    
    const diferenca = salarioLiquidoPJ - salarioLiquidoCLT;
    
    document.getElementById('resultadoComparativo').innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div style="background: #e3f2fd; padding: 15px; border-radius: 10px;">
                <h3 style="color: #1976d2;">CLT</h3>
                <p><strong>Salário bruto:</strong> ${formatarMoeda(salarioCLT, 'BRL')}</p>
                <p><strong>Salário líquido (aprox.):</strong> ${formatarMoeda(salarioLiquidoCLT, 'BRL')}</p>
                <p><strong>Custo total empresa:</strong> ${formatarMoeda(custoTotalCLT, 'BRL')}</p>
                <p><small>Inclui: 13º, férias, FGTS, INSS, VT, VR</small></p>
            </div>
            <div style="background: #e8f5e8; padding: 15px; border-radius: 10px;">
                <h3 style="color: #2e7d32;">PJ</h3>
                <p><strong>Valor contrato:</strong> ${formatarMoeda(salarioPJ, 'BRL')}</p>
                <p><strong>INSS autônomo:</strong> ${formatarMoeda(inssPJ, 'BRL')}</p>
                <p><strong>Líquido mensal:</strong> ${formatarMoeda(salarioLiquidoPJ, 'BRL')}</p>
                <p><small>Sem benefícios como férias, 13º, VT, VR</small></p>
            </div>
        </div>
        <div style="margin-top: 20px; padding: 15px; background: ${diferenca > 0 ? '#4caf50' : '#f44336'}; color: white; border-radius: 10px; text-align: center;">
            <strong>Diferença mensal:</strong> ${formatarMoeda(Math.abs(diferenca), 'BRL')} 
            ${diferenca > 0 ? 'a mais no PJ' : 'a mais na CLT'}
        </div>
    `;
}