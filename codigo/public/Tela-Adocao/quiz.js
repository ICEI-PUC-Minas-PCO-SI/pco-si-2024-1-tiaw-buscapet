var requestURL2 = "/quiz";
var request2 = new XMLHttpRequest();

request2.open("GET", requestURL2);
request2.responseType = "json";
request2.send();

let db_quiz = JSON.parse(localStorage.getItem('dbQuiz'));

const pergunta = document.getElementById("pergunta");
const area = document.getElementById("quiz");
const nextButton = document.getElementById("next");
const backButton = document.getElementById("back");
const containResult = document.getElementById("container")
const resetButton = document.getElementById("reset");
const erro = document.getElementById("erro")

let indiceAtual = 0;
let pontuacao = 0;

request2.onload = function() {

    const dbMock = request2.response;

    if (!db_quiz) {

        db_quiz = dbMock
    }

    salvaDados_quiz(db_quiz);
    iniciaQuiz();
    mostraQuestoes();
}

function salvaDados_quiz(dados) {

    localStorage.setItem('dbQuiz', JSON.stringify(dados))
}

function iniciaQuiz() {

    indiceAtual = 0;
    pontuacao = 0;
    reseta();

}

function mostraQuestoes() {

    nextButton.style.display = "block";
    let dados = db_quiz
    let questaoAtual = dados[0].questoes[indiceAtual];
    let numeracao = indiceAtual + 1;
    let numeracaoOP = 1;
    let str = '';
    let escolhida = false;
    let desabilita = ""
    let desbotado = ""

    str = `<div class="questoes">
                <div id="pergunta">
                    <h2>${numeracao}. ${questaoAtual.pergunta}</h2>
                </div>`

    questaoAtual.opcoes.forEach(opcao => {

        if (opcao.marcada) {

            desabilita = "desativa";
            escolhida = true
        }
    })

    questaoAtual.opcoes.forEach(opcao => {

        if (!opcao.marcada && escolhida) {

            desbotado = "desbota";

        } else {
            desbotado = "";
        }

        str += `<div class="opcoes ${desabilita} ${desbotado}" id="opcao${numeracaoOP}" onclick="selecionaOpcao(${numeracaoOP}, ${numeracao})">
                        <img src="${opcao.img}" alt="">
                        <p>${opcao.descricao}</p>
                    </div>`

        numeracaoOP++;
    });


    str += `</div>`;

    area.innerHTML = str;

    if (indiceAtual > 0) {
        backButton.style.display = "block";
    } else {
        backButton.style.display = "none";
    }
}

function selecionaOpcao(id, idQuestao) {

    let aux = "opcao" + id;
    let aux2 = db_quiz[0].questoes

    const resposta = document.getElementsByClassName("opcoes")

    Array.from(resposta).forEach(element => {

        if (element.id != aux) {
            element.classList.add("desbota")

        } else {

            element.classList.add("nitido")

            Array.from(aux2).forEach(op => {

                Array.from(op.opcoes).forEach(op2 => {

                    if (element.innerText == op2.descricao) {

                        pontuacao += op2.pontos

                        db_quiz[0].questoes[idQuestao - 1].opcoes[id - 1].marcada = true;

                    }
                })
            })
        }

        element.classList.add("desativa")

    });

    salvaDados_quiz(db_quiz);

}

function reseta() {

    console.log(db_quiz)
    for (let i = 0; i < db_quiz[0].questoes.length; i++) {

        for (let j = 0; j < db_quiz[0].questoes[i].opcoes.length; j++) {

            db_quiz[0].questoes[i].opcoes[j].marcada = false;
        }
    }

    salvaDados_quiz(db_quiz);
    pontuacao = 0;
    mostraQuestoes()
}

function botaoProximo() {

    indiceAtual++;

    let aux = db_quiz[0].questoes;

    if (indiceAtual < aux.length) {

        mostraQuestoes()

    } else {

        if (marcouTodas()) {
            erro.innerHTML = ""
            resultado();
        } else {
            erro.innerHTML = "Responda todas as questões primeiro!!!"
        }
    }
}

nextButton.addEventListener("click", () => {

    let aux = db_quiz[0].questoes;

    if (indiceAtual < aux.length) {

        botaoProximo()

    } else {

        if (marcouTodas()) {
            erro.innerHTML = ""
            resultado();
        } else {
            erro.innerHTML = "Responda todas as questões primeiro!!!"
        }
    }
})

backButton.addEventListener("click", () => {

    erro.innerHTML = ""

    if (indiceAtual == 6)
        indiceAtual--;

    if (indiceAtual > 0) {
        indiceAtual--;
    }

    let aux = db_quiz[0].questoes;

    if (indiceAtual < aux.length) {

        mostraQuestoes()
    }
})

function marcouTodas() {

    let cont = 0;

    for (let i = 0; i < db_quiz[0].questoes.length; i++) {

        for (let j = 0; j < db_quiz[0].questoes[i].opcoes.length; j++) {

            if (db_quiz[0].questoes[i].opcoes[j].marcada == true) {
                cont++

            }
        }
    }

    if (cont == 6) {

        return true
    }

    return false;

}

function resultado() {

    area.innerHTML = '';
    let animal = ''

    if (pontuacao <= 12) {

        animal = db_quiz[1].resultado[0];

    } else {

        animal = db_quiz[1].resultado[1];

    }

    area.innerHTML = ` <div id="resultado">
                                <h1>Resultado: <span>${animal.animais}</span></h1>
                                <img src="${animal.img}" alt="">
                                <p>${animal.descricao}</p>
                                <button id="reset" onclick="reseta()">Tentar Novamente</button>
                            </div>`;

    nextButton.style.display = "none";
    indiceAtual = 0;
    backButton.style.display = "none";
}