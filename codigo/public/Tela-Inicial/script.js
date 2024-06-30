const slidesContainer = document.querySelector('.carousel .slides');
const thumbnailsContainer = document.querySelector('.carousel .thumbnails');
let carouselData

document.addEventListener('DOMContentLoaded', function() {

  fetch('/carouselData')
  .then(response => response.json())
  .then(data => {
    carouselData = data
     User_logado()
    Funcionar();
   
  })
  
  /************************************* Script POP-UP*************************************************/

  fetch('/pop-upItens')
  .then(response => response.json())
  .then(data => {
    
    document.getElementById('popup-titulo').textContent = data[0].titulo;
    document.getElementById('popup-subtitulo').textContent = data[0].subtitulo;
    document.getElementById('popup-imagem').src = data[0].imageSrc;
    document.getElementById('popup-ajuda-titulo').textContent = data[0].tituloAjuda;

    const ajudaLista = document.getElementById('popup-lista-ajuda');

    console.log(data[0])
    data[0].ajudaItens.forEach(ajudaItem => {
  
      const li = document.createElement('li');
      li.classList.add("li-ajuda");
      
      const b = document.createElement('b');
      
      b.textContent = ajudaItem.titulo;
      li.appendChild(b);
      
      const subLista = document.createElement('ul');
      
      ajudaItem.itens.forEach(subItem => {
        
        const subLi = document.createElement('li');
        subLi.classList.add("subLi-ajuda");
        
        subLi.style.color = '#E55812';
        subLi.textContent = subItem;
        
        subLista.appendChild(subLi);
      });
    
      li.appendChild(subLista);
      ajudaLista.appendChild(li);
    });

    const botaoDoacao = document.getElementById('popup-botao-doacao');
    botaoDoacao.textContent = data[0].textoBotaoDoacao;

    botaoDoacao.addEventListener('click', function() {
        window.open('https://www.vakinha.com.br/vaquinha/a-maior-campanha-solidaria-do-rs', '_blank');
    });
    
    document.getElementById('popup-local-doacao-titulo').textContent = data[0].doacaoLocalTitulo;
    document.getElementById('popup-local-doacao').textContent = data[0].doacaoLocal;
  
    document.getElementById('popup-contato-titulo').textContent = data[0].contatoTitulo;
    document.getElementById('popup-contato-informacoes').textContent = data[0].contatoInformacoes[0];
    document.getElementById('popup-contato-telefone').textContent = data[0].contatoInformacoes[1];

    document.getElementById("popup").classList.add("show");
  })


  document.getElementById("botao-fechar").addEventListener("click", function() {
    document.getElementById("popup").classList.remove("show");
  });
})

function User_logado (){

  let user = document.getElementById("user");

  fetch(`/logado`, {

     method: 'GET',
  })
  .then(response =>  response.json())
  .then(data => {

    user.innerHTML = `<p>Olá, ${data.nome}</p>`;

    if(data.tipo != "ONG"){

      let form_ONG = document.getElementById("forms_ONG");

      form_ONG.style.display = "none";

    }
  })
  .catch(error => {

    console.error("Erro ao soliciar elemento via API JSONServer: ", error)
  })
}

function Funcionar(){

  //Array.prototype.slice.call(slides)[slideIndex -1].
  Array.from(carouselData[1].slides).forEach((slide, index) => {
    
    const slideElement = document.createElement('div');
    const imgElement = document.createElement('img');
    const textTransp = document.createElement('div');
    const ulElement = document.createElement('ul');

    imgElement.src = slide.imageSrc;
    imgElement.alt = `Imagem ${slide.details.nome}`;
    imgElement.classList.add("teste2")

    textTransp.classList.add('text-transp');

    for (const [key, value] of Object.entries(slide.details)) {
      const liElement = document.createElement('li');
      liElement.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`;
      ulElement.appendChild(liElement);
    }

    textTransp.appendChild(ulElement);
    slideElement.appendChild(imgElement);
    slideElement.appendChild(textTransp);
    slideElement.classList.add("teste");

    slidesContainer.appendChild(slideElement);
  });

  carouselData.thumbnails.forEach((thumbnail, index) => {
    const imgElement = document.createElement('img');
    imgElement.src = thumbnail.imageSrc;
    imgElement.alt = thumbnail.altText;
    imgElement.onclick = () => currentSlide(thumbnail.index);
    thumbnailsContainer.appendChild(imgElement);
  });

  window.sr = ScrollReveal({ reset: true });
  sr.reveal('#mini-text', { duration: 2000 });

  showSlides(slideIndex); 

}

let slideIndex = 1;

showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

  // Função para definir o slide atual
  function currentSlide(n) {
    showSlides(slideIndex = n);
}

  // Função para mostrar os slides e atualizar as miniaturas
  function showSlides(n) {
    
    const slides = document.getElementsByClassName("teste");
    const imagens = document.getElementsByClassName("teste2")
    const thumbnails = thumbnailsContainer.getElementsByTagName("img");

    if (n > slides.length) {
      slideIndex = 1;
    }

    if (n < 1) {
      slideIndex = slides.length;
    }

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    for (let i = 0; i < thumbnails.length; i++) {
      thumbnails[i].classList.remove("active");
    }

    Array.prototype.slice.call(slides)[slideIndex -1].style.display = "block";
    Array.prototype.slice.call(imagens)[slideIndex -1].style.display = "block";
    Array.prototype.slice.call(slides)[slideIndex -1].classList.add("active");
    thumbnails[slideIndex - 1].classList.add("active");
  };
