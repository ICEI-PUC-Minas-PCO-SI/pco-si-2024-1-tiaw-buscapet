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
        db = data;
        User_logado()
        imprimeOngs()
    })
    .catch(error => {
        alert('Erro ao obter dados do servidor: ' + error.message);
    })
}

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

var form1 = document.getElementById("form1");
var form2 = document.getElementById("form2");

var Proximo = document.getElementById("Proximo");
var Voltar = document.getElementById("Voltar");

Proximo.onclick = function() {
  
  form1.style.left = "-850px";
  form2.style.left = "80px";
  progress.style.width = "760px";

}

Voltar.onclick = function() {
  
    form1.style.left = "80px";
    form2.style.left = "-850px";
    progress.style.width = "370px";
}


function leDados() {

  let strDados = localStorage.getItem('db');
  let objDados = {};

  if (strDados) {

    objDados = JSON.parse(strDados);

  } else {

    objDados = {contatos: []}
  }

  return objDados;
}

function salvaDados(dados) {

  localStorage.setItem('db', JSON.stringify(dados));
}

function incluirContato() {
  
  let objDados = leDados();

  let strNome = document.getElementById('nome').value
  let strTelefone = document.getElementById('telefone').value
  let strWhatsapp = document.getElementById('whatsapp').value
  let strEndereco = document.getElementById('endereco').value
  let strEmail = document.getElementById('email').value
  let strEstado = document.getElementById('estado').value
  let strFrequenciaAdocao = document.getElementById('frequenciaAdocao').value
  let strQuantosAnimaisProtecao = document.getElementById('quantosAnimaisProtecao').value
  let strTempoFilaDeAdocaoo = document.getElementById('tempoFilaDeAdocao').value
  let strTempoCuidadoso = document.getElementById('tempoCuidados').value
  let strRecolhemAnimais = document.querySelector('#recolhemAnimais').classList.contains('active') ? 'Sim' : 'Não';
  let strAceitamDoenteso = document.querySelector('#aceitamDoentes').classList.contains('active') ? 'Sim' : 'Não';

  let novoContato = {

    nome: strNome,
    telefone: strTelefone,
    whatsapp: strWhatsapp,
    endereco: strEndereco,
    email: strEmail,
    estado: strEstado,
    frequenciaAdocao: strFrequenciaAdocao,
    tempoCuidados: strTempoCuidadoso,
    tempoFilaDeAdocao: strTempoFilaDeAdocaoo,
    quantosAnimaisProtecao: strQuantosAnimaisProtecao,
    recolhemAnimais: strRecolhemAnimais,
    aceitamDoentes: strAceitamDoenteso
  };

  if (strFrequenciaAdocao > 1) {
    novoContato.frequenciaAdocao = "Muito";
  } else if (strFrequenciaAdocao == 1) {
    novoContato.frequenciaAdocao = "Médio";
  } else {
    novoContato.frequenciaAdocao = "Pouco";
  }

  if (strTempoCuidadoso > 1) {
    novoContato.tempoCuidados = "Muito";
  } else if (strTempoCuidadoso == 1) {
    novoContato.tempoCuidados = "Médio";
  } else {
    novoContato.tempoCuidados = "Pouco";
  }

  if (strTempoFilaDeAdocaoo > 1) {
    novoContato.tempoFilaDeAdocao = "Muito";
  } else if (strTempoFilaDeAdocaoo == 1) {
    novoContato.tempoFilaDeAdocao = "Médio";
  } else {
    novoContato.tempoFilaDeAdocao = "Pouco";
  }

  if (strQuantosAnimaisProtecao > 1) {
    novoContato.quantosAnimaisProtecao = "Muito";
  } else if (strQuantosAnimaisProtecao == 1) {
    novoContato.quantosAnimaisProtecao = "Médio";
  } else {
    novoContato.quantosAnimaisProtecao = "Pouco";
  }

  objDados.contatos.push(novoContato);

  salvaDados(objDados);
  alert("Formulário enviado com sucesso!");
  imprimeDados();
}

function imprimeDados() {

  let tela = document.getElementById('tela');
  let strHTML = '';
  let objDados = leDados();

  for (i = 0; i < objDados.contatos.length; i++) {
    strHTML += `<p>${objDados.contatos[i].nome} - ${objDados.contatos[i].telefone} - ${objDados.contatos[i].whatsapp} - ${objDados.contatos[i].endereco} - ${objDados.contatos[i].email} - ${objDados.contatos[i].estado} - ${objDados.contatos[i].frequenciaAdocao} - ${objDados.contatos[i].tempoCuidados} - ${objDados.contatos[i].tempoFilaDeAdocao} - ${objDados.contatos[i].quantosAnimaisProtecao} - ${objDados.contatos[i].recolhemAnimais} - ${objDados.contatos[i].aceitamDoentes} </p>`
  }

  tela.innerHTML = strHTML;
}

document.getElementById('btnIncluirContato').addEventListener('click', incluirContato);

document.addEventListener('DOMContentLoaded', function () {
  const estadoDropdown = document.getElementById('estado');
  estadoDropdown.addEventListener('change', function (event) {
    const selectedEstado = event.target.value;
    const formState = {selectedEstado};
    localStorage.setItem('formState', JSON.stringify(formState));
  });
});
