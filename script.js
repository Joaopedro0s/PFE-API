const apiUrl = "https://api-mural.onrender.com/recados";
const listaDeRecadosElement = document.getElementById('mural-lista');

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro de rede! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(dados => {
        console.log("Dados recebidos com sucesso:", dados);

        listaDeRecadosElement.innerHTML = ''; 

        dados.forEach(recado => {
            const item = document.createElement('li');
            const dataFormatada = new Date(recado.data_criacao).toLocaleString('pt-BR');

            item.innerHTML = `
                <strong>${recado.autor}</strong>
                <p>${recado.mensagem}</p>
                <small>Postado em: ${dataFormatada}</small>
            `;

            listaDeRecadosElement.appendChild(item);
        });
    })
    .catch(error => {
        console.error("Falha ao processar a requisição:", error);
        listaDeRecadosElement.innerHTML = `<li>Houve um erro ao carregar os recados. Tente novamente mais tarde.</li>`
    });
