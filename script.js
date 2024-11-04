
const form = document.querySelector('#post-form');
const titulo = document.querySelector('#titulo');
const conteudo = document.querySelector('#conteudo');
const submitButton = document.querySelector('#submit-btn');
const tituloRenderizar = document.querySelector('#renderizador-titulo');
const conteudoRenderizar = document.querySelector('#renderizador-conteudo');


async function criarPost(event) {
    event.preventDefault();
    
    
    submitButton.disabled = true;
    submitButton.textContent = 'Publicando...';

   
    const data = {
        title: titulo.value,
        body: conteudo.value,
        userId: 1
    };

    try {
       
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });

        
        if (!response.ok) {
            throw new Error('Erro ao criar post');
        }

       
        const postCriado = await response.json();

        
        tituloRenderizar.innerHTML = postCriado.title;
        conteudoRenderizar.innerHTML = postCriado.body;

        
        form.reset();

        
        const erroExistente = document.querySelector('.error');
        if (erroExistente) {
            erroExistente.remove();
        }

    } catch (erro) {
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.textContent = 'Erro ao publicar o post. Tente novamente.';
        form.appendChild(errorDiv);
        
        console.error('Erro:', erro);
    } finally {
        
        submitButton.disabled = false;
        submitButton.textContent = 'Publicar Post';
    }
}


form.addEventListener('submit', criarPost);
