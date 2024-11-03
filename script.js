// Seletores
const form = document.querySelector('#post-form');
const titulo = document.querySelector('#titulo');
const conteudo = document.querySelector('#conteudo');
const submitButton = document.querySelector('#submit-btn');
const tituloRenderizar = document.querySelector('#renderizador-titulo');
const conteudoRenderizar = document.querySelector('#renderizador-conteudo');

// Função para criar o post
async function criarPost(event) {
    event.preventDefault();
    
    // Desabilita o botão durante o envio
    submitButton.disabled = true;
    submitButton.textContent = 'Publicando...';

    // Cria o objeto com os dados do post
    const data = {
        title: titulo.value,
        body: conteudo.value,
        userId: 1
    };

    try {
        // Faz a requisição POST
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });

        // Verifica se a requisição foi bem sucedida
        if (!response.ok) {
            throw new Error('Erro ao criar post');
        }

        // Converte a resposta para JSON
        const postCriado = await response.json();

        // Renderiza o post na tela
        tituloRenderizar.innerHTML = postCriado.title;
        conteudoRenderizar.innerHTML = postCriado.body;

        // Limpa o formulário
        form.reset();

        // Remove qualquer mensagem de erro anterior
        const erroExistente = document.querySelector('.error');
        if (erroExistente) {
            erroExistente.remove();
        }

    } catch (erro) {
        // Cria elemento para mostrar o erro
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.textContent = 'Erro ao publicar o post. Tente novamente.';
        form.appendChild(errorDiv);
        
        console.error('Erro:', erro);
    } finally {
        // Reabilita o botão após o envio
        submitButton.disabled = false;
        submitButton.textContent = 'Publicar Post';
    }
}

// Adiciona o evento de submit ao formulário
form.addEventListener('submit', criarPost);