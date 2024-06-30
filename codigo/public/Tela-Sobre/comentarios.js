let contador = 0;
let input = document.getElementById('comentario');
let add = document.getElementById('add');
let main  = document.getElementById('area');
let nome = document.getElementById('insiran');
let ocupacao = document.getElementById('ocupacao');
let erro = document.getElementById('erro');

const requestURL = "http://localhost:3000/db/db.json/comentarios";
const request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType ="json";
request.send();

let db = JSON.parse(localStorage.getItem('dados'));

request.onload = function () {

    const dbMock = request.response;

    if(!db){
         db = dbMock
    }

    salvaDados(db);
     User_logado ()
    imprimirComent();
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

function salvaDados(dados){

    localStorage.setItem('dados' , JSON.stringify(dados))

}

function imprimirComent(){

    let str = "";


    for(let i=0; i < db.length; i++){

        str += `<div class="item" id="${db[i].id}">
        <div id="cabecalho">
            <h2>${db[i].nome}</h2>
            <h3>${db[i].ocupacao}</h3>
            <p>${db[i].comentario}</p>
        </div>
        <div class="select">
            <button onclick="deletar(${db[i].id})" class="delete">
                <i class="bi bi-x-circle-fill"></i>
            </button>
        </div>
        <div id="editar">
            <button onclick="editarTexto(${db[i].id})"><i class="bi bi-pencil-fill"></i></button>
        </div>
    </div>`;
    }

    main.innerHTML = str;

}

function addTarefa(){
    
    erro.innerHTML = "";

    let valorInput = input.value;
    let valorNome = nome.value;
    let valorOcupacao = ocupacao.value;
    let novo;

    contador = db.length
    contador++;

    if(valorInput != "" && valorNome != "" && valorOcupacao !="") {

        novo = {id:contador, nome:valorNome, ocupacao:valorOcupacao,comentario:valorInput}
        nome.value = input.value = ocupacao.value = "";
        ++contador;

        db.push(novo)

    }
    else{
        erro.innerHTML = `<p>Informações incorretas</p>`
    }

    salvaDados(db);
    imprimirComent();

}

function deletar(id){

    var tarefa = document.getElementById(id);
    tarefa.remove();
    db = db.filter(item => item.id != id);
  salvaDados(db);
}

function editarTexto(id) {
    
    let comentItens = db.find(item => item.id === id);
    
    if(comentItens){
        
        let novoNome = prompt("Editar o nome:",comentItens.nome);
        let novaOcupacao = prompt("Editar a ocupação:",comentItens.ocupacao);
        let novoComentario = prompt("Editar o Comentario:",comentItens.comentario);

        if(novoNome !== null && novoNome.trim() !== ""){
            comentItens.nome = novoNome.trim();
        }
        if(novaOcupacao !== null && novaOcupacao.trim() !== ""){
            comentItens.ocupacao = novaOcupacao.trim();
        }
        if(novoComentario !== null && novoComentario.trim() !== ""){
            comentItens.comentario = novoComentario.trim();
        }
        salvaDados(db);
        imprimirComent();
    }

}

input.addEventListener("keyup", function (event){
    if(event.keyCode === 13){
        event.preventDefault();
        add.click();
    }
});

