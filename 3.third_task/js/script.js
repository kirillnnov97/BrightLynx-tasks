var myCards = document.getElementById('container');
var resultsArray = [];
var counter = 0;
var text = document.getElementById('text');
var seconds = 00;
var tens = 00;
var tries = 0;
var appendTens = document.getElementById("tens");
var appendSeconds = document.getElementById("seconds");
var buttonPause = document.getElementById('button-pause');

var Interval ;
var images = ['1', '2', '3', '4', '5', '6', '7', '8'];

var clone = images.slice(0); 
var cards = images.concat(clone); 

// Растасуем карты
function shuffle(o){
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i],   o[i] = o[j], o[j] = x);
  return o;
}
shuffle(cards);



for (var i = 0; i < cards.length; i++) {
  card = document.createElement('div');
  card.dataset.item = cards[i];
  card.dataset.view = "card";
  myCards.appendChild(card);

  card.onclick = function () { //событие "левый клик"
    if (this.className != 'flipped' && this.className != 'correct'){ // повороты картинкой наверх
        this.className = 'flipped';
        var result = this.dataset.item;
        resultsArray.push(result);
        clearInterval(Interval);
        Interval = setInterval(startTimer, 10);
    }


    if (resultsArray.length > 1) {
      if (resultsArray[0] === resultsArray[1]) { //апрув верного
        check("correct");
        counter ++;
        win();
        resultsArray = [];
      } else {
        check("reverse"); //откат неверного
        resultsArray = [];
      }

    }

  }

};


//обратный дроп
var check = function(className) {
  var x = document.getElementsByClassName("flipped");

  setTimeout(function() {

    for(var i = (x.length - 1); i >= 0; i--) {
      x[i].className = className;
    }

  },500);

}

//победа
var win = function () {

  if(counter === 8) {
    clearInterval(Interval);
  }

}




//таймер
function startTimer () {
  tens++;

  if(tens < 9){
    appendTens.innerHTML = "0" + tens;
  }

  if (tens > 9){
    appendTens.innerHTML = tens;

  }

  if (tens > 99) {
    seconds++;
    appendSeconds.innerHTML = "0" + seconds;
    tens = 0;
    appendTens.innerHTML = "0" + 0;
  }

  if (seconds > 9){
    appendSeconds.innerHTML = seconds;
  }

}
