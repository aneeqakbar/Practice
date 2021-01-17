let count = 0;
let add = ['a','d','d'];
let input = [];
document.addEventListener('keypress', (key) => {
  keyCheck(key);
});


function keyCheck(keyToCheck){
  keyToCheck = keyToCheck.key;
  input.push(keyToCheck);
  let matching = false;

  for (let i = 0; i < input.length; i++) {
    if (input[i] != add[i]) {
      input = [];
    }
    matching = true;
  }
  strComp(matching);
}

function strComp(matching) {
  if (matching == true && input.length === add.length) {
    input = [];
    count++;
    updateCount();
  }
}

function updateCount() {
  if (count >= 41) {
    console.log("Done!!!");
    let done = new Audio("swish.m4a");
    done.play();
    setTimeout(() => {
      location.reload();
    }, 1000);
  }
  else{
    console.log(count);
  }
}