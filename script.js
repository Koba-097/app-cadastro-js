class Cadastro {
    constructor () { //busca dados salvos no navegador, sempre retorna string texto ou null
        const salvo = localStorage.getItem("dados");

        //se existir algo salvo, converte de textoJSON para array se nao existir, cria array vazio
        const dadosParseados = salvo ? JSON.parse(salvo) : [];

        //garante que o sistema sempre comece com um array valido, MESMO COM LOCALSTORAGE QUEBRADO
        this.dados = Array.isArray(dadosParseados) ? dadosParseados : [];
    }

    salvar() { //converte o array em texto e salva no navegadro
        localStorage.setItem("dados", JSON.stringify(this.dados));
    }

    adicionar(valor) { //
        this.dados.push(valor); //COLOCA O VALOR DENTRO DOARRAY
        this.salvar(); //SALVA ELE NA PAGINA
    }

    remover(indice) {
        this.dados.splice(indice, 1);
        this.salvar();
    }

    limpar() {
    this.dados = []; //RESETA O ARRAY
        this.salvar(); //ATUALIZA O LOCAL STORAGE
    }
}
//CONSTRUCAO DO OBJETO, CONSTRUCTOR É EXCECUTADO AQUI
const cadastro = new Cadastro();

//CONEXAO COM O HTML AQUI O JS ENXERGA A PAGINA

const entrada =
document.getElementById("entrada");
const lista =
document.getElementById("lista");
const mensagem =
document.getElementById("mensagem");
const botaoAdicionar =
document.getElementById("adicionar");
const botaoLimpar =
document.getElementById("limpar");

//FUNCAO ATUALIZAR LISTA

function atualizarLista() {
    lista.innerHTML = ""; // LIMPA TUDO QUE ESTA APARECENDO NA LISTA
    cadastro.dados.forEach((item, index)=> { //PERCORRE TODOS OS DADOS SALVOS

    const li = //CRIA UM ELEMENTO LI
document.createElement("li");
        li.innerText = item; // COLOCA O ELEMENTO DENTRO DO LI

        const btnRemover =
document.createElement("button");
        btnRemover.innerText = "❌";


btnRemover.addEventListener("click", function() {
            cadastro.remover(index);
            atualizarLista();
            });

            li.appendChild(btnRemover);
            lista.appendChild(li);
    });
}

botaoAdicionar.addEventListener("click", function () { //PEGA O TEXTO DIGITADO NO INPUT TRIM REMOVE ESPAÇOS
    const valor = entrada.value.trim();

    if (valor === "") { //SE O CAMPO ESTIVER VAZIO
        mensagem.innerText = "Digite algo!";
        return; // PARA TUDO AQUI
    }

    if (cadastro.dados.includes(valor)) { // SE ESTIVER NO ARRAY
        mensagem.innerText = "Nome já existe";
        return; //PARA TUDO AQUI
    }

    cadastro.adicionar(valor); //ADICIONA O VALOR AO CADASTRO
    atualizarLista(); //ATUALIZA A LISTA NA TELA

    mensagem.innerText = "Adicionado!";
    entrada.value = "";
});

// EVENTO: CLIQUE NO BOTAO LIMPAR
    botaoLimpar.addEventListener("click", function () {
        cadastro.limpar(); // LIMPA TODOS DADOS DE CADASTRO
        atualizarLista(); // ATUALIZA A LISTA VISUAL
        mensagem.innerText = "Lista Limpa"; //

        });