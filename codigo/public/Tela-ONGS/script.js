window.sr = ScrollReveal({reset: true});
sr.reveal('#tit-pesquisa', {duration: 2000});

let titulo = document.getElementById('tit-inicio');
let texto = titulo.innerHTML
let i = 0;

const escrever = () =>{

    titulo.innerHTML = titulo.innerHTML.replace('|','')

    if(texto.length > i){

        if(i == 0){
            titulo.innerHTML = texto.charAt(i)

        }else{
            titulo.innerHTML += texto.charAt(i)
        
        }

        titulo.innerHTML += '|'

        i++;

        setTimeout(escrever, 200)
    }
}

let db;

window.onload = () => {

    fetch('/ongs')
    .then(response => response.json())
    .then(data => {
             
        escrever()
        salvaDados(data)
        db = data;
        imprimeOngs()
    })
    .catch(error => {
        alert('Erro ao obter dados do servidor: ' + error.message);
    })
}

const pesquisar = () => {
    
    let input = document.getElementById('pesquisar').value;
    input = input.toLowerCase();

    let ongs = document.getElementsByClassName('ong');
    let nomes = document.getElementsByClassName('nomeacao');
    let naoEncontrado = document.getElementById('naoEncontrado')
    let cont = 0;

    for (i = 0 ; i < nomes.length ; i++){

        if (nomes[i].innerHTML.toLocaleLowerCase().includes(input)){
            ongs[i].style.display = 'flex';
        
         }else{
            ongs[i].style.display = "none";
            cont++;
        }
    }

    if(cont == 6){

        naoEncontrado.style.display = 'block'
        naoEncontrado.innerHTML = 'Não foi possível encontrar nenhuma ONG com este nome'
        naoEncontrado.style.marginBottom = '100px'
        
    }else{

        naoEncontrado.style.display = 'none'
    }
}

function salvaDados(dados){

   
}

function imprimeOngs() {
    
    let str = '';
   
    for (let i = 0; i < db.length; i++) {

        const ong = db[i];

        if (i % 2 == 0){

            str += `<div class="ong">
       
                        <img src="${ong.img}" alt="">
                
                        <div class="info-ong">
                
                            <h3 class="nomeacao">${ong.nome}</h3>
                            <ul>
                                <li><span class="destaque">Descrição:</span> ${ong.descricao}</li>
                                <li><span class="destaque">Estado:</span> ${ong.estado}</li>
                                <li><span class="destaque">Instagram:</span> ${ong.instagram}/</li>
                                <li><span class="destaque">Telefone:</span> ${ong.telefone}</li>
                                <li><span class="destaque">Email:</span> ${ong.email}</li>
                            </ul>
                
                            <a href="https://institutoamparanimal.org.br/" target="_blank"><button type="submit">Contatar</button></a>
                        </div>  
                    </div>
                    
                    <p id="naoEncontrado"></p>`

        }else{

            str += `<div class="ong">
       
                        <div class="info-ong">
                
                            <h3 class="nomeacao">${ong.nome}</h3>
                            <ul>
                                <li><span class="destaque">Descrição:</span> ${ong.descricao}</li>
                                <li><span class="destaque">Estado:</span> ${ong.estado}</li>
                                <li><span class="destaque">Instagram:</span> ${ong.instagram}/</li>
                                <li><span class="destaque">Telefone:</span> ${ong.telefone}</li>
                                <li><span class="destaque">Email:</span> ${ong.email}</li>
                            </ul>
                
                            <a href="https://institutoamparanimal.org.br/" target="_blank"><button type="submit">Contatar</button></a>
                        </div>
                
                        <img src="${ong.img}" alt="" id="direita">
                    </div>`
        }
       
    document.getElementById('ongs').innerHTML = str;

    }
}