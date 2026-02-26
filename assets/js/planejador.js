// Array para armazenar os gastos
let gastos = [];
let totalGastos = 0;

// Função para adicionar gasto
function adicionarGasto() {
    const descricao = document.getElementById('descricaoGasto').value.trim();
    const valor = parseFloat(document.getElementById('valorGasto').value);
    const categoria = document.getElementById('categoriaGasto').value;
    
    if (!descricao || !valor || valor <= 0) {
        alert('Por favor, preencha todos os campos corretamente!');
        return;
    }
    
    // Adicionar ao array
    gastos.push({
        id: Date.now(),
        descricao: descricao,
        valor: valor,
        categoria: categoria
    });
    
    // Atualizar total
    totalGastos += valor;
    
    // Limpar campos
    document.getElementById('descricaoGasto').value = '';
    document.getElementById('valorGasto').value = '';
    
    // Atualizar lista
    atualizarListaGastos();
}

// Função para remover gasto
function removerGasto(id) {
    const gasto = gastos.find(g => g.id === id);
    if (gasto) {
        totalGastos -= gasto.valor;
        gastos = gastos.filter(g => g.id !== id);
        atualizarListaGastos();
    }
}

// Função para atualizar a lista de gastos na tela
function atualizarListaGastos() {
    const lista = document.getElementById('listaGastos');
    const totalSpan = document.getElementById('totalGastos');
    
    if (gastos.length === 0) {
        lista.innerHTML = '<p style="text-align: center; color: #999;">Nenhum gasto registrado ainda.</p>';
    } else {
        lista.innerHTML = gastos.map(gasto => `
            <div class="gasto-item">
                <div class="gasto-info">
                    <span class="gasto-categoria">${gasto.categoria}</span>
                    <strong>${gasto.descricao}</strong>
                    <span>${formatarMoeda(gasto.valor, 'BRL')}</span>
                </div>
                <button class="btn-remover" onclick="removerGasto(${gasto.id})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    }
    
    totalSpan.textContent = formatarMoeda(totalGastos, 'BRL').replace('R$', '').trim();
}

// Função para calcular meta de economia
function calcularMeta() {
    const descricao = document.getElementById('descricaoMeta').value.trim();
    const valorMeta = parseFloat(document.getElementById('valorMeta').value);
    const economiaMensal = parseFloat(document.getElementById('economiaMensal').value);
    
    if (!descricao || !valorMeta || !economiaMensal || valorMeta <= 0 || economiaMensal <= 0) {
        alert('Por favor, preencha todos os campos corretamente!');
        return;
    }
    
    const meses = Math.ceil(valorMeta / economiaMensal);
    const anos = Math.floor(meses / 12);
    const mesesRestantes = meses % 12;
    
    let tempoTexto = '';
    if (anos > 0) {
        tempoTexto += `${anos} ano${anos > 1 ? 's' : ''}`;
        if (mesesRestantes > 0) {
            tempoTexto += ` e ${mesesRestantes} mês${mesesRestantes > 1 ? 'es' : ''}`;
        }
    } else {
        tempoTexto = `${meses} mês${meses > 1 ? 'es' : ''}`;
    }
    
    document.getElementById('resultadoMeta').innerHTML = `
        <div style="text-align: left;">
            <p><strong>Meta:</strong> ${descricao}</p>
            <p><strong>Valor necessário:</strong> ${formatarMoeda(valorMeta, 'BRL')}</p>
            <p><strong>Economia mensal:</strong> ${formatarMoeda(economiaMensal, 'BRL')}</p>
            <hr>
            <p style="font-size: 1.2em; color: #667eea;">
                <strong>Tempo estimado:</strong> ${tempoTexto}
            </p>
            <p><small>Guardando R$ ${economiaMensal.toFixed(2)} por mês</small></p>
        </div>
    `;
}

// Função para salvar gastos no localStorage
function salvarGastos() {
    localStorage.setItem('gastos', JSON.stringify(gastos));
    localStorage.setItem('totalGastos', totalGastos.toString());
}

// Função para carregar gastos do localStorage
function carregarGastos() {
    const gastosSalvos = localStorage.getItem('gastos');
    const totalSalvo = localStorage.getItem('totalGastos');
    
    if (gastosSalvos) {
        gastos = JSON.parse(gastosSalvos);
        totalGastos = parseFloat(totalSalvo) || 0;
        atualizarListaGastos();
    }
}

// Carregar gastos salvos quando a página abrir
document.addEventListener('DOMContentLoaded', function() {
    carregarGastos();
});

// Salvar gastos antes de fechar a página
window.addEventListener('beforeunload', function() {
    salvarGastos();
});