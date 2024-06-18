const slidesContainer = document.querySelector('.carousel .slides');
const thumbnailsContainer = document.querySelector('.carousel .thumbnails');
let carouselData

document.addEventListener('DOMContentLoaded', function() {

  fetch('/carouselData')
  .then(response => response.json())
  .then(data => {
    carouselData = data
    Funcionar();
  })
  //.catch(error => {alert ('Erro ao carregar os dados do carrossel' + error.message)})
})

function Funcionar(){

   console.log(Array.from(carouselData[1].slides))

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
