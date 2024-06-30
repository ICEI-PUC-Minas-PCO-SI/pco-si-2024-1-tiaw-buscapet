const requestURL = "http://localhost:3000/db/db.json/animais";
const request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType ="json";
request.send();

let db = JSON.parse(localStorage.getItem('dados_animais'));

request.onload = function () {

    const dbMock = request.response;

    if(!db){

         db = dbMock
    }

    salvaDados(db);
    User_logado ()
    pets()

}

function User_logado (){

  let user = document.getElementById("user");

  fetch(`/logado`, {

     method: 'GET',
  })
  .then(response =>  response.json())
  .then(data => {

    user.innerHTML = `<p>Olá, ${data.nome}</p>`;

    if(data.tipo != "Pessoa"){

      let form_ONG = document.getElementById("Quiz_pessoas");

      form_ONG.style.display = "none";

    }
  })
  .catch(error => {

    console.error("Erro ao soliciar elemento via API JSONServer: ", error)
  })
}

function salvaDados(dados){

    localStorage.setItem('dados_animais' , JSON.stringify(dados))

}

const controls = document.querySelectorAll('.control');
const items = document.getElementsByClassName("item")

controls.forEach(control => {

    let currentItem = 0;

    control.addEventListener('click',() =>{

        const isLeft = control.classList.contains("arrow-left");
        const maxItems = Array.prototype.slice.call(items).length

        if(isLeft){

            currentItem -= 1;

        }else{

            currentItem += 1;

        }

        if(currentItem >= maxItems){

            currentItem = 0;
        }

        if(currentItem < 0){

            currentItem = maxItems - 1;

        }

        Array.from(items).forEach(item => {
                item.classList.remove('current-item')

            }
        )

        Array.prototype.slice.call(items)[currentItem].scrollIntoView({

            inline: "center",
            behavior:"smooth"
        })

        items[currentItem].classList.add("current-item");
    })
})

function pets() {

    let adocao = document.getElementById("adocao")
    let str = ""
    let current = "current-item"
    let k = 0;
    let coracao = "";

    for (let i=0 ; i < 3 ; i++)  {

        let secao = 1;

        str += ` <div class="item ${current}">
                     <div id="secao${secao}"> `;

        secao++
        current = ""

        for (let j=0 ; j < 2 ; j++) {

            if (db[k].clicado == true) {

                coracao = "post-rating-selected"
            }

            str +=`<div id="pets">
                      <img src="${db[k].image}" alt="Imagem 1">
                      <div class="informacoes">
                        <h4>${db[k].name}</h4>
                        <p>${db[k].descriotion} </p>
                        <div class="post ${coracao}" id="${db[k].id}" data-post-id="${db[k].id}">
                          <div class="post-rating-container">
                            <div class="post-rating">
                              <span class="post-rating-button material-symbols-outlined" onclick="likes(${db[k].id})">favorite</span>
                              <span class="post-rating-count">${db[k].like}</span>
                            </div>
                          </div>
                        </div>
                        <button type="button"><a href="https://institutoamparanimal.org.br/" >Adotar</a></button>
                        <style>
                          a {
                            text-decoration: none;
                            color: inherit;
                          }
                        </style>
                    </div>
                </div>`

            k++
            coracao = ""
        } 


        if (db[k].clicado == true) {

            coracao = "post-rating-selected"
        }

        str += `</div>

                <div id="secaodestaque">
                      <h2>Pet em destaque</h2>
                      <div id="pets">
                        <img src="${db[k].image}" alt="Imagem 3">
                        <div class="informacoes">
                          <h4>${db[k].name}</h4>
                          <p>${db[k].descriotion} </p>
                          <div class="post ${coracao}" data-post-id="${db[k].id}" id="${db[k].id}">
                            <div class="post-rating-container">
                              <div class="post-rating">
                                <span class="post-rating-button material-symbols-outlined" onclick="likes(${db[k].id})">favorite</span>
                                <span class="post-rating-count">${db[k].like}</span>
                              </div>
                            </div>
                          </div>
                          <button type="button" ><a href="https://institutoamparanimal.org.br/">Adotar</a></button>
                                <style>
                                  a {
                                    text-decoration: none;
                                    color: inherit;
                                  }
                                </style>
                        </div>
                      </div>
            </div>

             <div id="secao${secao}"> `

        k++
        coracao = ""

        for (let j=0 ; j < 2 ; j++) {

            if (db[k].clicado == true) {

                coracao = "post-rating-selected"
            }

            str +=`<div id="pets">
                      <img src="${db[k].image}" alt="Imagem 1">
                      <div class="informacoes">
                        <h4>${db[k].name}</h4>
                        <p>${db[k].descriotion} </p>
                        <div class="post ${coracao}" data-post-id="${db[k].id}" id="${db[k].id}">
                          <div class="post-rating-container">
                            <div class="post-rating">
                              <span class="post-rating-button material-symbols-outlined" onclick="likes(${db[k].id})">favorite</span>
                              <span class="post-rating-count">${db[k].like}</span>
                            </div>
                          </div>
                        </div>
                        <button type="button" ><a href="https://institutoamparanimal.org.br/">Adotar</a></button>
                        <style>
                          a {
                            text-decoration: none;
                            color: inherit;
                          }
                        </style>
                    </div>
                </div>`
            k++
            coracao = ""
        } 

        str += ` </div> 
            </div>  
        </div>`

    }  

    adocao.innerHTML = str 
}

function likes(id){

    let posts = document.querySelectorAll(".post");

    console.log(db[id-1].like)

    posts.forEach(post => {

        const postId = post.dataset.postId;

        if (postId == id){

            const rating = post.querySelector(".post-rating");
            const count = rating.querySelector(".post-rating-count");

            if(db[id-1].clicado) {

                post.classList.remove("post-rating-selected");
                count.textContent = parseInt(count.textContent) - 1;
                db[id-1].like = db[id-1].like - 1
                db[id-1].clicado = false

            }else{

                post.classList.add("post-rating-selected");
                count.textContent = parseInt(count.textContent) + 1;
                db[id-1].like = db[id-1].like + 1
                db[id-1].clicado = true
            }
        }
    });

     salvaDados(db)
}

document.querySelectorAll(".post").forEach(post => {

    const postId = post.dataset.postId;
    const rating = post.querySelector(".post-rating");
    const button = rating.querySelector(".post-rating-button");
    const count = rating.querySelector(".post-rating-count");
    let likes = document.getElementsByClassName("post-rating-button");

    button.addEventListener("click", () => {

        console.log(likes)

      if(post.classList.contains("post-rating-selected")) {

        post.classList.remove("post-rating-selected");
        count.textContent = parseInt(count.textContent) - 1;

      }else{

        post.classList.add("post-rating-selected");
        count.textContent = parseInt(count.textContent) + 1;
      }
    });
  });