let listaDeNumeroSorteados = [];
let numeroLimitado = 10;
let numeroSecreto = geradorNumeroAleatorio();
let tentativas = 1;

function alteradorDeTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female' , {rate:1.2})
}

function mudartextosdaTela() {
    alteradorDeTexto('h1', 'jogos numero secretos')
    alteradorDeTexto('p', 'Escolha um número entre 1 e 10') 
}

mudartextosdaTela();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        alteradorDeTexto('h1', 'Acertou!');
        let palavaraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `👏🏼Parabéns você acertou o número secreto Com ${tentativas} ${palavaraTentativa}`;
        alteradorDeTexto('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            alteradorDeTexto('p', 'O número secreto é menor');
        } else {
            alteradorDeTexto('p', 'O número  secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function geradorNumeroAleatorio() {
    let numeroEscolhido = Math.floor(Math.random() * numeroLimitado + 1);
    let quantidadeDeElementosNaLista = listaDeNumeroSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimitado) {
        listaDeNumeroSorteados = [];
    }

    if (listaDeNumeroSorteados.includes(numeroEscolhido)) {
        return geradorNumeroAleatorio();
    }else {
        listaDeNumeroSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = geradorNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mudartextosdaTela();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}