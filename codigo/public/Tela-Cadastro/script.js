window.onload = () => {

    form = document.getElementById("cadastro");
    btn = document.getElementById("add");
  
    const radios = document.querySelector(".radios");
    let radio="";
  
    radios.addEventListener("change", (event) => {
  
      radio = event.target.value;
  
    });
  
    btn.addEventListener('click', function(){
  
      let nome_campo = document.getElementById('nome').value
      let email_campo = document.getElementById('email').value
      let senha_campo = document.getElementById('senha').value
  
      if(radio == "")
          radio = "ONG"
  
      console.log(radio)  
  
      let cadastro = {
  
        nome: nome_campo,
        email: email_campo,
        senha: senha_campo,
        tipo: radio
      }
  
      cadastra(cadastro)
      form.reset();
    })
  }
  
  function cadastra(cadastro){
  
    fetch('/cadastrados', {
  
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cadastro),
    })
    .then(response => response.json())
    .then(data => {
  
      console.log("Cadastro efetuado com sucesso!!!");
  
    })
    .catch(error => {
      console.error('Erro ao inserir cadastro via API JSONServer: ',error);
    })
  }