document.addEventListener('DOMContentLoaded', function() {
    const accordion = document.querySelector('.accordion');
  
    fetch('/accordion')
      .then(response => response.json())
      .then(faqData => {
        faqData.items.forEach(item => {
          const container = document.createElement('div');
          container.classList.add('container');
  
          const label = document.createElement('div');
          label.classList.add('label');
          label.textContent = item.label;
  
          const content = document.createElement('div');
          content.classList.add('content');
          content.textContent = item.content;
  
          container.appendChild(label);
          container.appendChild(content);
          accordion.appendChild(container);
  
          container.addEventListener('click', function() {
            this.classList.toggle('active');
          });
        });
      })
      .catch(error => console.error('Error fetching FAQ data:', error));
  });
  