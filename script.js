const url = "https://meusite.com/api/usuarios";

fetch(url)
  .then(response => response.json())
  .then(dados => {
    const lista = document.getElementById("lista");
    dados.forEach(usuario => {
      const li = document.createElement("li");
      li.textContent = `${usuario.nome} - ${usuario.idade} anos`;
      lista.appendChild(li);
    });
  })
  .catch(erro => console.error("Erro:", erro));
