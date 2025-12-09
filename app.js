// As configuracoes agora vem do arquivo config.js
const API_BASE_URL = CONFIG?.API_BASE_URL || 'https://apiloterias.com.br/app/v2/resultado';
const API_TOKEN = CONFIG?.API_TOKEN || '';

// Configuracao de quantidade de numeros por tipo de loteria
const quantidadeNumerosPorJogo = {
    megasena: 6,
    quina: 5,
    lotofacil: 15,
    lotomania: 20,
    timemania: 7,
    duplasena: 6,
    diadesorte: 7
};

const elements = {
    form: document.getElementById('loteria-form'),
    loteriaInput: document.getElementById('loteria-nome'),
    quantidadeInput: document.getElementById('quantidade'),
    quantidadeEstatisticasInput: document.getElementById('quantidade-estatisticas'),
    hintEstatisticas: document.getElementById('hint-estatisticas'),
    jogoUsuarioInput: document.getElementById('jogo-usuario'),
    resultadosContainer: document.getElementById('resultados'),
    messageContainer: document.getElementById('message'),
    estatisticasContainer: document.getElementById('estatisticas'),
    comparacaoContainer: document.getElementById('comparacao'),
    submitBtn: document.querySelector('.btn-primary'),
    btnText: document.querySelector('.btn-text'),
    btnLoader: document.querySelector('.btn-loader')
};

elements.form.addEventListener('submit', handleFormSubmit);
elements.loteriaInput.addEventListener('input', updateHintEstatisticas);

function updateHintEstatisticas() {
    const loteria = elements.loteriaInput.value.trim().toLowerCase();
    const loteriaKey = loteria.replace(/[^a-z]/g, '');
    const quantidadeMinima = quantidadeNumerosPorJogo[loteriaKey];
    
    if (quantidadeMinima) {
        elements.hintEstatisticas.textContent = `Opcional - Minimo: ${quantidadeMinima} (quantidade de numeros da ${loteria})`;
        elements.quantidadeEstatisticasInput.min = quantidadeMinima;
    } else {
        elements.hintEstatisticas.textContent = 'Opcional - Minimo igual a quantidade de numeros da loteria';
        elements.quantidadeEstatisticasInput.min = 0;
    }
}

async function handleFormSubmit(event) {
    event.preventDefault();
    
    const loteria = elements.loteriaInput.value.trim().toLowerCase();
    const quantidade = parseInt(elements.quantidadeInput.value);
    const quantidadeEstatisticas = elements.quantidadeEstatisticasInput.value ? parseInt(elements.quantidadeEstatisticasInput.value) : null;

    if (!validateInputs(loteria, quantidade, quantidadeEstatisticas)) {
        return;
    }

    if (!API_TOKEN || API_TOKEN === 'SEU_TOKEN_AQUI') {
        showMessage('Erro: Configure o token da API no arquivo config.js antes de usar a aplicacao.', 'error');
        return;
    }

    await fetchResultados(loteria, quantidade, quantidadeEstatisticas);
}

function validateInputs(loteria, quantidade, quantidadeEstatisticas) {
    if (!loteria) {
        showMessage('Por favor, informe o nome da loteria.', 'error');
        return false;
    }

    if (!quantidade || quantidade < 1 || quantidade > 50) {
        showMessage('A quantidade deve ser entre 1 e 50.', 'error');
        return false;
    }

    if (quantidadeEstatisticas !== null) {
        const loteriaKey = loteria.toLowerCase().replace(/[^a-z]/g, '');
        const quantidadeMinima = quantidadeNumerosPorJogo[loteriaKey];
        
        if (quantidadeMinima && quantidadeEstatisticas < quantidadeMinima) {
            showMessage(`A quantidade de numeros mais sorteados deve ser no minimo ${quantidadeMinima} para ${loteria}.`, 'error');
            return false;
        }
    }

    return true;
}

async function fetchResultados(loteria, quantidade, quantidadeEstatisticas) {
setLoading(true);
hideMessage();
clearResultados();
clearEstatisticas();
clearComparacao();

try {
        const url = `${API_BASE_URL}?loteria=${encodeURIComponent(loteria)}&token=${API_TOKEN}&concurso=ultimos${quantidade}`;
        
        console.log('URL da requisicao:', url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Erro na requisicao: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        
        console.log('Dados recebidos da API:', data);
        console.log('Tipo dos dados:', Array.isArray(data) ? 'Array' : typeof data);

        if (!data || (Array.isArray(data) && data.length === 0)) {
            showMessage('Nenhum resultado encontrado. Verifique o nome da loteria.', 'info');
            return;
        }

        if (data.error || data.message) {
            throw new Error(data.message || 'Erro ao buscar resultados.');
        }

        renderResultados(data);
        calcularEstatisticas(data, loteria, quantidadeEstatisticas);
        
        const jogoUsuario = elements.jogoUsuarioInput.value.trim();
        if (jogoUsuario) {
            compararJogoComConcursos(data, jogoUsuario);
        }
        
        showMessage(`${Array.isArray(data) ? data.length : 1} concurso(s) encontrado(s).`, 'success');

    } catch (error) {
        console.error('Erro ao buscar resultados:', error);
        showMessage(`Erro ao buscar resultados: ${error.message}`, 'error');
    } finally {
        setLoading(false);
    }
}

function renderResultados(data) {
    const resultados = Array.isArray(data) ? data : [data];
    
    if (resultados.length === 0) {
        showMessage('Nenhum resultado encontrado.', 'info');
        return;
    }

    elements.resultadosContainer.innerHTML = '';

    resultados.forEach(resultado => {
        const card = createResultadoCard(resultado);
        elements.resultadosContainer.appendChild(card);
    });
}

function createResultadoCard(resultado) {
console.log('Dados do resultado:', resultado);
    
const card = document.createElement('div');
card.className = 'resultado-card';

const numeroConcurso = resultado.numero_concurso || resultado.concurso || resultado.numero || resultado.numeroConcurso || resultado.nrConcurso || 'N/A';
const dataResultado = resultado.data_concurso || resultado.data || resultado.dataApuracao || resultado.dataSorteio || resultado.dataRealizacao || null;

const header = document.createElement('div');
header.className = 'card-header';
header.innerHTML = `
    <span class="concurso-numero">Concurso ${numeroConcurso}</span>
    <span class="concurso-data">${formatDate(dataResultado)}</span>
`;

    const body = document.createElement('div');
    body.className = 'card-body';
    
    const dezenasLabel = document.createElement('span');
    dezenasLabel.className = 'dezenas-label';
    dezenasLabel.textContent = 'Dezenas Sorteadas:';
    
    const dezenasContainer = document.createElement('div');
    dezenasContainer.className = 'dezenas-container';
    
    const dezenas = extractDezenas(resultado);
    dezenas.forEach(dezena => {
        const dezenaElement = document.createElement('div');
        dezenaElement.className = 'dezena';
        dezenaElement.textContent = dezena;
        dezenasContainer.appendChild(dezenaElement);
    });

    body.appendChild(dezenasLabel);
    body.appendChild(dezenasContainer);

    const footer = document.createElement('div');
    footer.className = 'card-footer';
    
    const infoGrid = document.createElement('div');
    infoGrid.className = 'info-grid';
    infoGrid.innerHTML = createInfoItems(resultado);
    
    footer.appendChild(infoGrid);

    card.appendChild(header);
    card.appendChild(body);
    card.appendChild(footer);

    return card;
}

function extractDezenas(resultado) {
    if (resultado.dezenas && Array.isArray(resultado.dezenas)) {
        return resultado.dezenas;
    }

    if (resultado.listaDezenas) {
        return resultado.listaDezenas.split(',').map(d => d.trim());
    }

    const dezenasKeys = Object.keys(resultado).filter(key => 
        key.startsWith('dezena') && resultado[key]
    );
    
    if (dezenasKeys.length > 0) {
        return dezenasKeys.map(key => resultado[key]).filter(Boolean);
    }

    return [];
}

function createInfoItems(resultado) {
    const items = [];

    if (resultado.local) {
        items.push(createInfoItem('Local', resultado.local));
    }

    if (resultado.cidade) {
        items.push(createInfoItem('Cidade', resultado.cidade));
    }

    if (resultado.acumulou !== undefined) {
        const acumulou = resultado.acumulou === true || resultado.acumulou === 'SIM';
        items.push(createInfoItem('Acumulou', acumulou ? 'SIM' : 'NAO', acumulou));
    }

    if (resultado.valorEstimadoProximoConcurso || resultado.valorAcumulado) {
        const valor = resultado.valorEstimadoProximoConcurso || resultado.valorAcumulado;
        items.push(createInfoItem('Proximo Concurso', formatCurrency(valor), true));
    }

    if (resultado.premiacoes && Array.isArray(resultado.premiacoes)) {
        resultado.premiacoes.forEach((premiacao, index) => {
            if (premiacao.descricao && premiacao.ganhadores !== undefined) {
                const faixa = premiacao.descricao || `${premiacao.faixa || index + 1} acertos`;
                const ganhadores = premiacao.ganhadores || 0;
                const valor = premiacao.valorPremio || 0;
                
                items.push(createInfoItem(
                    faixa,
                    `${ganhadores} ganhador(es) - ${formatCurrency(valor)}`,
                    ganhadores > 0
                ));
            }
        });
    } else {
        if (resultado.ganhadores !== undefined) {
            const ganhadoresInfo = formatGanhadores(resultado.ganhadores);
            items.push(createInfoItem('Ganhadores', ganhadoresInfo));
        }

        if (resultado.valorPremio) {
            items.push(createInfoItem('Valor Premio', formatCurrency(resultado.valorPremio), true));
        }
    }

    return items.join('');
}

function createInfoItem(label, value, destaque = false) {
    return `
        <div class="info-item">
            <span class="info-label">${label}:</span>
            <span class="info-value ${destaque ? 'destaque' : ''}">${value}</span>
        </div>
    `;
}

function formatDate(dateString) {
    if (!dateString) return 'Data nao disponivel';

    try {
        // Se a data ja estiver no formato DD/MM/YYYY, retorna direto
        if (typeof dateString === 'string' && /^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
            return dateString;
        }
        
        // Tenta converter para objeto Date
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return dateString;
        }
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    } catch (error) {
        return dateString;
    }
}

function formatGanhadores(ganhadores) {
    if (!ganhadores) return '0';
    
    // Se for um numero simples
    if (typeof ganhadores === 'number') {
        return ganhadores.toString();
    }
    
    // Se for string
    if (typeof ganhadores === 'string') {
        return ganhadores;
    }
    
    // Se for um array de objetos com informacao de cidade
    if (Array.isArray(ganhadores)) {
        if (ganhadores.length === 0) {
            return '0';
        }
        
        // Extrai as cidades dos ganhadores
        const cidades = ganhadores
            .map(g => {
                if (typeof g === 'object' && g !== null) {
                    return g.cidade || g.municipio || g.localidade || g.uf || null;
                }
                return g;
            })
            .filter(Boolean);
        
        if (cidades.length > 0) {
            return `${ganhadores.length} - ${cidades.join(', ')}`;
        }
        
        return ganhadores.length.toString();
    }
    
    // Se for um objeto (caso tenha vindo um objeto unico)
    if (typeof ganhadores === 'object' && ganhadores !== null) {
        const cidade = ganhadores.cidade || ganhadores.municipio || ganhadores.localidade || ganhadores.uf;
        if (cidade) {
            return `1 - ${cidade}`;
        }
        return '1';
    }
    
    return String(ganhadores);
}

function formatCurrency(value) {
    if (!value && value !== 0) return 'N/A';

    try {
        const numValue = typeof value === 'string' ? parseFloat(value.replace(/[^\d,.-]/g, '').replace(',', '.')) : value;
        
        if (isNaN(numValue)) return value;

        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(numValue);
    } catch (error) {
        return value;
    }
}

function showMessage(message, type = 'info') {
    elements.messageContainer.textContent = message;
    elements.messageContainer.className = `message ${type}`;
    elements.messageContainer.style.display = 'block';

    setTimeout(() => {
        if (type === 'success' || type === 'info') {
            hideMessage();
        }
    }, 5000);
}

function hideMessage() {
    elements.messageContainer.style.display = 'none';
}

function clearResultados() {
    elements.resultadosContainer.innerHTML = '';
}

function clearEstatisticas() {
    elements.estatisticasContainer.innerHTML = '';
    elements.estatisticasContainer.style.display = 'none';
}

function clearComparacao() {
    elements.comparacaoContainer.innerHTML = '';
    elements.comparacaoContainer.style.display = 'none';
}

function contarFrequenciaDezenas(concursos) {
    const frequencias = {};
    
    const resultados = Array.isArray(concursos) ? concursos : [concursos];
    
    resultados.forEach(resultado => {
        const dezenas = extractDezenas(resultado);
        dezenas.forEach(dezena => {
            const numero = dezena.toString().padStart(2, '0');
            frequencias[numero] = (frequencias[numero] || 0) + 1;
        });
    });
    
    return frequencias;
}

function pegarMaisFrequentes(frequencias, quantidade) {
    const ordenados = Object.entries(frequencias)
        .sort((a, b) => b[1] - a[1])
        .slice(0, quantidade);
    
    return ordenados.map(item => ({
        numero: item[0],
        frequencia: item[1]
    }));
}

function calcularEstatisticas(data, loteria, quantidadeEstatisticas) {
    const loteriaKey = loteria.toLowerCase().replace(/[^a-z]/g, '');
    const quantidadePadrao = quantidadeNumerosPorJogo[loteriaKey];
    
    if (!quantidadePadrao) {
        console.log('Loteria nao configurada para estatisticas:', loteria);
        return;
    }
    
    const quantidadeNumeros = quantidadeEstatisticas || quantidadePadrao;
    
    const frequencias = contarFrequenciaDezenas(data);
    const maisFrequentes = pegarMaisFrequentes(frequencias, quantidadeNumeros);
    
    mostrarEstatisticas(maisFrequentes, loteria, quantidadeNumeros);
}

function mostrarEstatisticas(listaDezenas, loteria, quantidade) {
    if (!listaDezenas || listaDezenas.length === 0) {
        return;
    }
    
    elements.estatisticasContainer.innerHTML = '';
    
    const titulo = document.createElement('h2');
    titulo.className = 'estatisticas-titulo';
    titulo.textContent = 'Numeros Mais Sorteados';
    
    const subtitulo = document.createElement('p');
    subtitulo.className = 'estatisticas-subtitulo';
    subtitulo.textContent = `Top ${quantidade} numeros mais frequentes`;
    
    const dezenasContainer = document.createElement('div');
    dezenasContainer.className = 'estatisticas-dezenas';
    
    listaDezenas.forEach((item, index) => {
        const dezenaWrapper = document.createElement('div');
        dezenaWrapper.className = 'estatistica-item';
        
        const dezenaElement = document.createElement('div');
        dezenaElement.className = 'dezena-estatistica';
        dezenaElement.textContent = item.numero;
        
        const frequenciaElement = document.createElement('span');
        frequenciaElement.className = 'frequencia-label';
        frequenciaElement.textContent = `${item.frequencia}x`;
        
        dezenaWrapper.appendChild(dezenaElement);
        dezenaWrapper.appendChild(frequenciaElement);
        dezenasContainer.appendChild(dezenaWrapper);
    });
    
    elements.estatisticasContainer.appendChild(titulo);
    elements.estatisticasContainer.appendChild(subtitulo);
    elements.estatisticasContainer.appendChild(dezenasContainer);
    elements.estatisticasContainer.style.display = 'block';
}

function setLoading(isLoading) {
    if (isLoading) {
        elements.submitBtn.disabled = true;
        elements.btnText.style.display = 'none';
        elements.btnLoader.style.display = 'inline-block';
        elements.btnLoader.innerHTML = 'Carregando... <span class="loading-spinner"></span>';
    } else {
        elements.submitBtn.disabled = false;
        elements.btnText.style.display = 'inline-block';
        elements.btnLoader.style.display = 'none';
    }
}

function validarJogoUsuario(jogoString) {
    if (!jogoString || jogoString.trim() === '') {
        return null;
    }
    
    const numerosTexto = jogoString.trim().replace(/,/g, ' ').split(/\s+/);
    const numeros = [];
    
    for (let i = 0; i < numerosTexto.length; i++) {
        const num = parseInt(numerosTexto[i]);
        if (isNaN(num) || num < 1 || num > 99) {
            return null;
        }
        const numeroFormatado = num.toString().padStart(2, '0');
        if (!numeros.includes(numeroFormatado)) {
            numeros.push(numeroFormatado);
        }
    }
    
    return numeros.length > 0 ? numeros : null;
}

function compararJogoComConcursos(concursos, jogoUsuarioString) {
    const jogoUsuario = validarJogoUsuario(jogoUsuarioString);
    
    if (!jogoUsuario) {
        showMessage('Jogo invalido. Informe numeros entre 1 e 99 separados por espaco ou virgula.', 'error');
        return;
    }
    
    const resultados = Array.isArray(concursos) ? concursos : [concursos];
    const listaAcertos = [];
    
    resultados.forEach(concurso => {
        const dezenasConcurso = extractDezenas(concurso);
        const dezenasFormatadas = dezenasConcurso.map(d => d.toString().padStart(2, '0'));
        
        const acertos = jogoUsuario.filter(numero => dezenasFormatadas.includes(numero));
        
        listaAcertos.push({
            concurso: concurso.numero_concurso || concurso.concurso || concurso.numero || concurso.numeroConcurso || concurso.nrConcurso || 'N/A',
            data: concurso.data_concurso || concurso.data || concurso.dataApuracao || concurso.dataSorteio || concurso.dataRealizacao || null,
            quantidadeAcertos: acertos.length,
            numerosAcertados: acertos
        });
    });
    
    const resumo = gerarResumoAcertos(listaAcertos);
    mostrarResultadoComparacao(resumo);
}

function gerarResumoAcertos(listaAcertos) {
    if (!listaAcertos || listaAcertos.length === 0) {
        return {
            temAcertos: false,
            mensagem: 'Nenhum concurso disponivel para comparacao.'
        };
    }
    
    let melhorResultado = listaAcertos[0];
    
    for (let i = 1; i < listaAcertos.length; i++) {
        if (listaAcertos[i].quantidadeAcertos > melhorResultado.quantidadeAcertos) {
            melhorResultado = listaAcertos[i];
        }
    }
    
    if (melhorResultado.quantidadeAcertos === 0) {
        return {
            temAcertos: false,
            mensagem: 'Nenhum acerto encontrado nos concursos pesquisados.'
        };
    }
    
    return {
        temAcertos: true,
        concurso: melhorResultado.concurso,
        data: melhorResultado.data,
        quantidadeAcertos: melhorResultado.quantidadeAcertos,
        numerosAcertados: melhorResultado.numerosAcertados
    };
}

function mostrarResultadoComparacao(resumo) {
    elements.comparacaoContainer.innerHTML = '';
    
    const titulo = document.createElement('h2');
    titulo.className = 'comparacao-titulo';
    titulo.textContent = 'Resultado da Conferencia do Seu Jogo';
    
    const subtitulo = document.createElement('p');
    subtitulo.className = 'comparacao-subtitulo';
    subtitulo.textContent = 'Comparacao com os concursos consultados';
    
    elements.comparacaoContainer.appendChild(titulo);
    elements.comparacaoContainer.appendChild(subtitulo);
    
    if (!resumo.temAcertos) {
        const mensagem = document.createElement('div');
        mensagem.className = 'comparacao-sem-acertos';
        mensagem.textContent = resumo.mensagem;
        elements.comparacaoContainer.appendChild(mensagem);
    } else {
        const resultado = document.createElement('div');
        resultado.className = 'comparacao-resultado';
        
        const destaque = document.createElement('div');
        destaque.className = 'comparacao-destaque';
        destaque.textContent = `Concurso com mais acertos: ${resumo.concurso}`;
        
        const info = document.createElement('div');
        info.className = 'comparacao-info';
        
        const itemData = document.createElement('div');
        itemData.className = 'comparacao-info-item';
        itemData.innerHTML = `
            <span class="comparacao-info-label">Data:</span>
            <span class="comparacao-info-value">${formatDate(resumo.data)}</span>
        `;
        
        const itemAcertos = document.createElement('div');
        itemAcertos.className = 'comparacao-info-item';
        itemAcertos.innerHTML = `
            <span class="comparacao-info-label">Quantidade de acertos:</span>
            <span class="comparacao-info-value">${resumo.quantidadeAcertos}</span>
        `;
        
        info.appendChild(itemData);
        info.appendChild(itemAcertos);
        
        const labelNumeros = document.createElement('div');
        labelNumeros.className = 'comparacao-info-label';
        labelNumeros.textContent = 'Numeros que acertaram:';
        labelNumeros.style.textAlign = 'center';
        labelNumeros.style.marginTop = '1rem';
        labelNumeros.style.marginBottom = '0.5rem';
        
        const numerosContainer = document.createElement('div');
        numerosContainer.className = 'comparacao-numeros';
        
        resumo.numerosAcertados.forEach(numero => {
            const dezenaElement = document.createElement('div');
            dezenaElement.className = 'comparacao-dezena';
            dezenaElement.textContent = numero;
            numerosContainer.appendChild(dezenaElement);
        });
        
        resultado.appendChild(destaque);
        resultado.appendChild(info);
        resultado.appendChild(labelNumeros);
        resultado.appendChild(numerosContainer);
        
        elements.comparacaoContainer.appendChild(resultado);
    }
    
    elements.comparacaoContainer.style.display = 'block';
}
