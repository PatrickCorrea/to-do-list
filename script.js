const input = document.querySelector('.input');
const button = document.querySelector('.botao');
const listaCompleta = document.querySelector('.lista');

let listaItens = [];

//Add Item

function adicionaTarefa() {

    if (!input.value) {
        alert('Digite uma tarefa')
    }
    else {
        listaItens.push({
            tarefa: input.value,
            concluida: false
        });
    };

    input.value = ''

    mostrarTarefa();
};

function mostrarTarefa() {
    let novaLi = ''

    listaItens.forEach((item, index) => {
        novaLi = novaLi + `

        <li class="tarefa ${item.concluida && "done"}">
                <img src="./assets/check.png" alt="check" onclick="concluirTarefa(${index})">
                <p>${item.tarefa}</p>
                <img src="./assets/lixeira.png" alt="exluir tarefa" onclick="deletarItem(${index})">
        </li>
        `

    });

    listaCompleta.innerHTML = novaLi;

    //local storage
    localStorage.setItem('lista', JSON.stringify(listaItens));
};

//concluir 

function concluirTarefa(index) {
    listaItens[index].concluida = !listaItens[index].concluida

    //chamar função mostrarTarefa novamente para remontar as Li depois de ser alterada
    mostrarTarefa();
};

//Deletando Item

function deletarItem(index) {

    listaItens.splice(index, 1)

    //chamar função mostrarTarefa novamente para remontar as Li depois de ser alterada
    mostrarTarefa();
};

//Resgatando lista do local storage ao carregar a pág

function recaregarTarefas() {
    const tarefasLocalStorage = localStorage.getItem('lista');

    if (tarefasLocalStorage) {
        listaItens = JSON.parse(tarefasLocalStorage)
    };

    mostrarTarefa();
};

recaregarTarefas();

button.addEventListener('click', adicionaTarefa);