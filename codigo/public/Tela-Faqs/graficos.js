let recebePorcentagem

document.addEventListener('DOMContentLoaded', () => {
  initCounters();
 

    fetch('/porcentagem')
    .then(response => response.json())
    .then(data =>{

        recebePorcentagem = data;
        initProgressBars();
    })
});

function initCounters() {
  const speed = 400;

  const formatNumber = (num, type) => {
      if (type === 'milhoes') {
          return (num / 1000000).toFixed(1).replace('.', ',') + ' milhões';
      } else if (type === 'mil') {
          return num.toLocaleString('pt-BR') + ' mil';
      } else if (type === 'porcentagem') {
          return num.toFixed(0) + '%';
      } else if (type === 'milhoes-extenso') {
          return formatMilhoesExtenso(num);
      } else {
          return num;
      }
  };

  const formatMilhoesExtenso = (num) => {
      if (num >= 1000000) {
          return (num / 1000000).toFixed(1).replace('.', ',') + ' milhões';
      } else {
          return num.toLocaleString('pt-BR');
      }
  };

  const startCountAnimation = (counter, target, formatType) => {
      const updateCount = () => {
          const count = +counter.querySelector('h2').innerText.replace(/[^\d]/g, '') || 0;
          const increment = target / speed;

          if (count < target) {
              counter.querySelector('h2').innerText = formatNumber(Math.ceil(count + increment), formatType);
              setTimeout(updateCount, 1);
          } else {
              counter.querySelector('h2').innerText = formatNumber(target, formatType);
              localStorage.setItem(counter.id, target.toString());
          }
      };

      updateCount();
  };

  const resetLocalStorage = () => {
      localStorage.clear();
  };

  resetLocalStorage();

  
    fetch('/pets')
    .then(response => response.json())
    .then(data => {
          const dados = data;

          const estDiv = document.querySelector('.est');
          dados.forEach(dado => {
              const div = document.createElement('div');
              div.id = dado.id.replace('dado', 'block');
              div.innerHTML = `
                  <h2>${dado.titulo}</h2>
                  <div id="${dado.id}" class="dado" data-target="${dado.quantidade}" data-format="${dado.formato}">
                      <h2>0</h2>
                  </div>
              `;
              estDiv.appendChild(div);

              const counter = document.getElementById(dado.id);
              const target = +counter.getAttribute('data-target');
              const formatType = counter.getAttribute('data-format');
              const storedValue = localStorage.getItem(dado.id);

              if (storedValue !== null) {
                  const numericValue = +storedValue;
                  counter.querySelector('h2').innerText = formatNumber(numericValue, formatType);
              } else {
                  startCountAnimation(counter, target, formatType);
              }
          });
      })
      .catch(error => {
          console.error('Erro ao carregar dados:', error);
      });
}

function initProgressBars() {

  const container = document.getElementById("container");

  for (let i = 0 ; i < recebePorcentagem.length ; i++) {
      
      const grafDiv = document.createElement("div");
      grafDiv.className = "graf";

      const skillDiv = document.createElement("div");
      skillDiv.className = "skill";

      const outerDiv = document.createElement("div");
      outerDiv.className = "outer";

      const innerDiv = document.createElement("div");
      innerDiv.className = "inner";

      const numberDiv = document.createElement("div");
      console.log(recebePorcentagem[i].title)
      numberDiv.id = `number${recebePorcentagem[i].title.replace(/[^a-zA-Z]/g, '')}`;

      const svgElement = `
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px">
              <defs>
                  <linearGradient id="GradientColor">
                      <stop offset="0%" stop-color="#FFA500" />
                      <stop offset="100%" stop-color="#FFFF00" />
                  </linearGradient>
              </defs>
              <circle cx="80" cy="80" r="70" stroke-linecap="round" />
          </svg>
      `;

      innerDiv.appendChild(numberDiv);
      outerDiv.appendChild(innerDiv);
      skillDiv.appendChild(outerDiv);
      skillDiv.innerHTML += svgElement;
      grafDiv.appendChild(skillDiv);

      const titleElement = document.createElement("h3");
      titleElement.textContent = recebePorcentagem[i].title;
      grafDiv.appendChild(titleElement);

      container.appendChild(grafDiv);

      animateProgressBar(numberDiv.id, recebePorcentagem[i].number, grafDiv.querySelector('circle'));
  }
}

function animateProgressBar(numberElementId, targetPercent, circleElement) {
      let numberElement = document.getElementById(numberElementId);
      let counter = 0;
      let interval = setInterval(() => {
          if (counter === targetPercent) {
              clearInterval(interval);
          } else {
              counter += 1;
              numberElement.innerHTML = counter + "%";
              updateCircleProgress(circleElement, counter);
          }
      }, 30);
  }

function updateCircleProgress(circle, percent) {

    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;
      
    circle.style.strokeDasharray = `${circumference}`;
    circle.style.strokeDashoffset = `${offset}`;
}
