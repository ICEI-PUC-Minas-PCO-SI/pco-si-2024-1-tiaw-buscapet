const tabs = document.querySelectorAll('.tab-btn');
let area = document.getElementById('areaTab')
let db_tabs;

fetch('/Tabs')
.then(resposta => resposta.json())
.then(dados =>{

    db_tabs = dados;
    imprimir();
})

function imprimir() {

    let str = ''
    let banco = db_tabs;
    let cont = 1
    let show = "show";

    Array.from(banco).forEach(item =>{

        str += `<div class="content ${show}" id="ex${cont}">
                   <img src="${item.img}" class="exemplo${cont}">

                   <div class="infos">
                       <h1 class="titulo">${item.Titulo}</h1>
                       <h2 class="subtitulo">${item.Subtitulo}</h2>
                       <p class="texto">
                          ${item.Texto}
                       </p>
                   </div>
                </div>`
        cont++
        show=''
    })

    area.innerHTML = str;
}

tabs.forEach(tab => tab.addEventListener('click', () => tabClicked(tab)));

const tabClicked = (tab) => {
    const contents = document.querySelectorAll('.content');

    contents.forEach(content => content.classList.remove('show'));

    const contentId = tab.getAttribute('content-id');
    const contentToShow = document.getElementById(contentId);

    contentToShow.classList.add('show');
}

imprimir();