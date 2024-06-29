fetch('/cards')
  .then(response => response.json())
  .then(dados => {
    const container = document.getElementById('cards');
    dados.forEach(dica => {
      const card = criarCartao(dica);
      container.appendChild(card);
    });

    VanillaTilt.init(document.querySelectorAll(".card"), {
      max: 25,
      speed: 400,
      glare: true,
      "max-glare": 0.5
    });
  });

function criarCartao(dica) {
  const card = document.createElement('div');
  card.className = 'card';
  card.setAttribute('data-tilt', '');

  const img = document.createElement('img');
  img.src = dica.image;

  const content = document.createElement('div');
  content.className = 'content';

  const title = document.createElement('h3');
  title.textContent = dica.title;

  const text = document.createElement('p');
  text.textContent = dica.content;

  content.appendChild(title);
  content.appendChild(text);

  card.appendChild(img);
  card.appendChild(content);

  return card;
}
