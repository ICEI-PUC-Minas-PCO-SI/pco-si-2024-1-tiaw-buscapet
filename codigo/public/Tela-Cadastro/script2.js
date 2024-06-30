let btn = document.getElementById("add");
let erro = document.getElementById("erro");

fetch('/cadastrados')
.then(response => response.json())
.then(dados =>{

  btn.addEventListener('click', function(){

    erro.innerHTML = "";

    let Nachou = true;
    let campo_email = document.getElementById("email").value;
    let campo_senha = document.getElementById("senha").value;

    for(let i = 0 ; i < dados.length ; i++){

      if(dados[i].email == campo_email && dados[i].senha == campo_senha){

        Loga(dados[i]);
        Nachou = false
      }
    }

    //if(Nachou)
      //erro.innerHTML = "<p>Email ou senha incorreta!</p>"
  })
})

function Loga(cadastrado){

  fetch('/logado',{

    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cadastrado),
  })
}

