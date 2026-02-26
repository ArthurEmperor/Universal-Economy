// Função para alternar entre abas
function openTab(tabName) {
    // Esconde todas as abas
    const tabs = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }
    
    // Remove classe active de todos os botões
    const buttons = document.getElementsByClassName('tab-btn');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
    }
    
    // Mostra a aba selecionada e ativa o botão
    document.getElementById(tabName).classList.add('active');
    
    // Ativa o botão correspondente
    const activeButton = Array.from(buttons).find(btn => 
        btn.textContent.toLowerCase().includes(tabName)
    );
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    // Salva a aba ativa no localStorage
    localStorage.setItem('abaAtiva', tabName);
}

// Função para mostrar notificações
function mostrarNotificacao(mensagem, tipo = 'info') {
    const notificacao = document.createElement('div');
    notificacao.className = `alert alert-${tipo}`;
    notificacao.innerHTML = `
        <i class="fas ${tipo === 'success' ? 'fa-check-circle' : 
                         tipo === 'warning' ? 'fa-exclamation-triangle' :
                         tipo === 'danger' ? 'fa-times-circle' : 'fa-info-circle'}"></i>
        <span>${mensagem}</span>
    `;
    
    notificacao.style.position = 'fixed';
    notificacao.style.top = '20px';
    notificacao.style.right = '20px';
    notificacao.style.zIndex = '9999';
    notificacao.style.minWidth = '300px';
    notificacao.style.animation = 'slideIn 0.3s';
    
    document.body.appendChild(notificacao);
    
    setTimeout(() => {
        notificacao.style.animation = 'slideOut 0.3s';
        setTimeout(() => {
            document.body.removeChild(notificacao);
        }, 300);
    }, 3000);
}

// Animações CSS para notificações
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Função para formatar números
function formatarNumero(numero, casas = 2) {
    return numero.toFixed(casas).replace('.', ',');
}

// Função para validar inputs
function validarInput(input) {
    return input && !isNaN(input) && input > 0;
}

// Função para calcular porcentagem
function calcularPorcentagem(valor, porcentagem) {
    return valor * (porcentagem / 100);
}

// Função para limpar todos os campos
function limparCampos() {
    const inputs = document.querySelectorAll('input[type="number"], input[type="text"]');
    inputs.forEach(input => {
        if (input.id !== 'descricaoGasto' && input.id !== 'valorGasto') {
            input.value = '';
        }
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Recupera a última aba ativa
    const abaAtiva = localStorage.getItem('abaAtiva');
    if (abaAtiva) {
        openTab(abaAtiva);
    }
    
    // Adiciona listeners para inputs numéricos
    const inputsNumericos = document.querySelectorAll('input[type="number"]');
    inputsNumericos.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                // Tenta encontrar o botão de calcular mais próximo
                const card = this.closest('.card');
                if (card) {
                    const botao = card.querySelector('button');
                    if (botao) {
                        botao.click();
                    }
                }
            }
        });
    });
    
    // Mostra mensagem de boas-vindas
    mostrarNotificacao('Bem-vindo ao Economiza Aí!', 'success');
});

// Função para exportar dados
function exportarDados() {
    const dados = {
        gastos: gastos,
        totalGastos: totalGastos,
        data: new Date().toLocaleDateString()
    };
    
    const dadosString = JSON.stringify(dados, null, 2);
    const blob = new Blob([dadosString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `economiza-ai-backup-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
    mostrarNotificacao('Dados exportados com sucesso!', 'success');
}

// Função para importar dados
function importarDados() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            try {
                const dados = JSON.parse(e.target.result);
                if (dados.gastos && dados.totalGastos !== undefined) {
                    gastos = dados.gastos;
                    totalGastos = dados.totalGastos;
                    atualizarListaGastos();
                    salvarGastos();
                    mostrarNotificacao('Dados importados com sucesso!', 'success');
                } else {
                    mostrarNotificacao('Arquivo inválido!', 'danger');
                }
            } catch (error) {
                mostrarNotificacao('Erro ao importar arquivo!', 'danger');
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

// Adiciona botões de exportar/importar (opcional)
window.addEventListener('load', function() {
    const footer = document.createElement('div');
    footer.style.cssText = 'text-align: center; margin-top: 30px; padding: 20px;';
    footer.innerHTML = `
        <button onclick="exportarDados()" class="btn-converter" style="width: auto; margin-right: 10px;">
            <i class="fas fa-download"></i> Exportar Dados
        </button>
        <button onclick="importarDados()" class="btn-converter" style="width: auto; background: linear-gradient(135deg, #28a745, #20c997);">
            <i class="fas fa-upload"></i> Importar Dados
        </button>
    `;
    document.querySelector('.container').appendChild(footer);
});