const apiUrl = "https://api-mural.onrender.com/recados";
const listaDeRecadosElement = document.getElementById('mural-lista');
const recadosCountElement = document.getElementById('recados-count');
const btnEscreverRecado = document.getElementById('btn-escrever-recado');
const filtroOrdemSelect = document.getElementById('filtro-ordem');

const formRecado = document.getElementById('form-recado');
const inputAutor = document.getElementById('autor');
const inputMensagem = document.getElementById('mensagem');
const btnPublicarRecado = document.getElementById('btn-publicar-recado');

let recados = [];

function ordenarRecados() {
    const filtro = filtroOrdemSelect.value;

    switch (filtro) {
        case 'data_asc':
            recados.sort((a, b) => new Date(a.data_criacao) - new Date(b.data_criacao));
            break;
        case 'data_desc':
            recados.sort((a, b) => new Date(b.data_criacao) - new Date(a.data_criacao));
            break;
        case 'autor_asc':
            recados.sort((a, b) => a.autor.localeCompare(b.autor));
            break;
        case 'autor_desc':
            recados.sort((a, b) => b.autor.localeCompare(a.autor));
            break;
    }
}

function renderizarRecados() {
    ordenarRecados();

    listaDeRecadosElement.innerHTML = '';

    recados.forEach(recado => {
        const item = document.createElement('li');
        const dataFormatada = new Date(recado.data_criacao).toLocaleString('pt-BR');

        item.innerHTML = `
            <strong>${recado.autor}</strong>
            <p>${recado.mensagem}</p>
            <small>Postado em: ${dataFormatada}</small>
        `;

        listaDeRecadosElement.appendChild(item);
    });

    recadosCountElement.textContent = recados.length;
}

function carregarRecados() {
    listaDeRecadosElement.innerHTML = '<div class="loading">Carregando recados...</div>';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro de rede! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(dados => {
            recados = dados;
            renderizarRecados();
        })
        .catch(error => {
            console.error("Falha ao processar a requisição:", error);
            listaDeRecadosElement.innerHTML = `<li class="error-message">Houve um erro ao carregar os recados. Tente novamente mais tarde.</li>`;
            recadosCountElement.textContent = '0';
        });
}

// Abrir/fechar formulário para escrever recado
btnEscreverRecado.addEventListener('click', () => {
    if (formRecado.style.display === 'none' || formRecado.style.display === '') {
        formRecado.style.display = 'flex';
        inputAutor.focus();
    } else {
        formRecado.style.display = 'none';
    }
});

// Publicar recado local (não envia para API, só adiciona na lista atual)
btnPublicarRecado.addEventListener('click', () => {
    const autor = inputAutor.value.trim();
    const mensagem = inputMensagem.value.trim();

    if (autor === '' || mensagem === '') {
        alert('Por favor, preencha seu nome e a mensagem do recado.');
        return;
    }

    const novoRecado = {
        autor,
        mensagem,
        data_criacao: new Date().toISOString()
    };

    recados.unshift(novoRecado); // adiciona no início
    renderizarRecados();

    // Limpa formulário e fecha
    inputAutor.value = '';
    inputMensagem.value = '';
    formRecado.style.display = 'none';
});

filtroOrdemSelect.addEventListener('change', () => {
    renderizarRecados();
});

// Carrega os recados quando a página abre
carregarRecados();
