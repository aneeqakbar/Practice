let endscreen = document.getElementById("gameend");
let minmoves = document.getElementById("minmoves");
let curmoves = document.getElementById("curmoves");

let card = document.getElementsByClassName("flipme");
let movestext = document.getElementById("moves");
let rotated0 = "matrix(1, 0, 0, 1, 0, 0)";

let namestobesorted = [
  "Sheep",
  "Ghost",
  "Goat",
  "Deer",
  "Cat",
  "Dog",
  "Cream",
  "Mouse",
  "Mic",
  "Bottle",
  "NYC",
  "VS Code",
  "Anique",
];

let namessorted1 = [],
  namessorted2 = [],
  numbers = [],
  moves = 0,
  solvednumber = 0,
  cardselected = [],
  disabled = false,
  difficultylevel;

function cardgen(numtogen, difficulty) {
  difficultylevel = difficulty;
  let card_cont = document.getElementById("card-cont");
  let difficulties = document.getElementsByClassName("difficulties");
  movestext.innerText = `Moves: ${moves}`;

  for (let i = 0; i < numtogen; i++) {
    let div = document.createElement("div");
    div.className = "flipme";
    div.setAttribute("onclick", "flipcard(this)");
    card_cont.appendChild(div);
    randcolor();
  }

  for (let i = 0; i < difficulties.length; i++) {
    difficulties[i].style.display = "none";
  }

  function randcolor() {
    function colorpick() {
      let color = Math.floor((Math.random() * 200) + 30);
      return color;
    }
    for (let i = 0; i < card.length; i++) {
      card[
        i
      ].style.background = `rgb(${colorpick()},${colorpick()},${colorpick()})`;
    }
  }
  namecards(numtogen / 2);
  cardvisibility();
}
function flipcard(card) {
  if (disabled === true) return;

  card.style.transform = "rotateY(0deg)";
  card.classList.remove("cardhidden");
  moves++;
  movestext.innerText = `Moves: ${moves}`;

  if (cardselected[0] === card) return;
  else cardselected.push(card);

  if (cardselected.length === 2) {
    cardlogic(cardselected);
    cardselected = [];
    disabled = true;
  }
}
function cardlogic(cardselected) {
  let c1 = cardselected[0].innerHTML;
  let c2 = cardselected[1].innerHTML;
  setTimeout(() => {
    if (c1 === c2) {
      for (let i = 0; i < cardselected.length; i++) {
        cardselected[i].style.background = "green";
        cardselected[i].removeAttribute("onclick");
      }
      gameend(1);
    } else if (c1 !== c2) {
      for (let i = 0; i < cardselected.length; i++) {
        cardselected[i].style.transform = "rotateY(180deg)";
      }
      cardvisibility();
    }
    disabled = false;
  }, 700);
}
function cardvisibility() {
  setTimeout(() => {
    for (let i = 0; i < card.length; i++) {
      let a = window.getComputedStyle(card[i]).getPropertyValue("transform");
      if (a !== rotated0) {
        card[i].classList.add("cardhidden");
      }
    }
  }, 50);
}
function namecards(num) {
  for (let i = 0; i < num; i++) {
    combinenamecontrol(num, 1);
  }
  numbers = [];
  for (let i = 0; i < num; i++) {
    combinenamecontrol(num, 2);
  }
  let names = combinenames(num);
  for (let i = 0; i < card.length; i++) {
    card[i].innerHTML = names[i];
  }
}
function combinenamecontrol(num, condition) {
  let number = Math.floor(Math.random() * num);
  if (condition === 1) {
    return namegenerator(number, num, namessorted1, condition);
  } else if (condition === 2) {
    return namegenerator(number, num, namessorted2, condition);
  }
}
function namegenerator(number, num, arrname, condition) {
  for (let i = 0; i < numbers.length + 1; i++) {
    if (numbers[i] === number) {
      combinenamecontrol(num, condition);
      return;
    }
  }
  numbers.push(number);
  arrname.push(namestobesorted[number]);
}
function combinenames(num) {
  let names = [];
  for (let i = 0; i < num; i++) {
    names.push(namessorted1[i]);
    names.push(namessorted2[i]);
  }
  return names;
}
// pick, sort && pick, sort Then Combine algorithm

function gameend(solved) {
  solvednumber += solved;
  if (solvednumber >= card.length / 2) {
    for (let i = 0; i < card.length; i++) {
      card[i].style.display = "none";
      endscreen.style.display = "flex";
      highestscore();
    }
  }
}

function highestscore() {
  let minimummoves = localStorage.getItem(`${difficultylevel}-MinimumMoves`);
  if (minimummoves > moves || minimummoves === null) {
    localStorage.setItem(`${difficultylevel}-MinimumMoves`, moves);
  }
  minmoves.innerText = `Minimum Moves Ever: ${minimummoves}`;
  curmoves.innerText = `Current Moves: ${moves}`;
}
