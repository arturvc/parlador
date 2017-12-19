var mensagem = ""; // variável para "pushar" no array de mensangens
var mensagemArray = []; // array de mensangens
var linguas = [];
var linguaSelecionada = "Brazilian Portuguese Female";
var mensagemMemoria;
var mensagemIndice = 0;
var indiceTerminal = 0;
var paragrafosDiv = []; // cópia pra ver se funciona

//  elementos no HTML
var selecionarLingua;
var tituloH1;
var entradaTerminal;
var paragrafoMemoria = [];

function preload() {
  linguas = loadStrings('linguas.txt');
  //linguas = responsiveVoice.getVoices();
}

function setup() {
  noCanvas();
  tituloH1 = select('#titulo');
  entradaTerminal = select("#terminal");
  entradaTerminal.changed(atualizarTexto);
  entradaTerminal.elt.focus();
  selecionarLingua = select("#lingua");
  for (var i = 0; i < linguas.length; i++) {
    selecionarLingua.option(linguas[i]);
  }
  selecionarLingua.changed(mudarLingua);
}


function mudarLingua() {
  linguaSelecionada = selecionarLingua.value();
}

function atualizarTexto() {
  mensagem = entradaTerminal.value();
  mensagemArray.push(mensagem);
  responsiveVoice.speak(mensagemArray[mensagemArray.length - 1], linguaSelecionada);
  entradaTerminal.value("");
  mensagemIndice = -1;

  paragrafoMemoria.push(createP(mensagem));
  for (var i = paragrafoMemoria.length - 1; i >= 0; i--) {
    paragrafoMemoria[i].html(mensagemArray[i]);
    paragrafoMemoria[i].parent("textoTerminal");
    paragrafoMemoria[i].class("paragrafoTerminalDiv");
  }
  paragrafosDiv = selectAll(".paragrafoTerminalDiv");
  for (var i = 0; i < paragrafosDiv.length; i++) {
    paragrafosDiv[i].mousePressed(lerNovamente);
    paragrafosDiv[i].mouseOver(destaque);
    paragrafosDiv[i].mouseOut(reDestaque);
  }


}

function lerNovamente() {
  responsiveVoice.speak(this.elt.innerText, linguaSelecionada);
}

function destaque() {
  this.style("text-decoration", "underline dashed #00FF00");
  this.style("color", "white");
}

function reDestaque() {
  this.style("text-decoration", "none");
  this.style("color", "#CCC");

}


function draw() {
  var x = random(2);
  var y = random(2);

  //console.log(x);
  if (responsiveVoice.isPlaying()) {
    tituloH1.style("color", "#00FF00");
    tituloH1.style("text-shadow", "0 0 100px  red");
    tituloH1.style("text-shadow", x + "px " + y + "px 30px  green");
    tituloH1.style("padding-left", x + "px");
  } else {
    tituloH1.style("color", "white");
    tituloH1.style("text-shadow", "none");
    tituloH1.style("margin-left", "0");
  }

}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    if (mensagemArray.length - 1 - mensagemIndice <= 0) {} else {
      mensagemIndice++;
    }
    mensagemMemoria = mensagemArray[mensagemArray.length - 1 - mensagemIndice];
    entradaTerminal.value(mensagemMemoria);
  } else if (keyCode === DOWN_ARROW) {
    if (mensagemIndice === -1) {
      mensagemIndice = 0;
    }
    if (mensagemArray.length - 1 - mensagemIndice >= mensagemArray.length - 1) {} else {
      mensagemIndice--;
    }
    mensagemMemoria = mensagemArray[mensagemArray.length - 1 - mensagemIndice];
    entradaTerminal.value(mensagemMemoria);
  }
}
