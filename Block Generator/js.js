let warning = document.getElementById("warnings");
let blockcont = document.getElementById("blocks-cont");

function blocks(btn) {
  let c = document.getElementById("blockcol");
  let r = document.getElementById("blockrow");
  validations(c.value, r.value, btn);
}

function validations(c, r, btn) {
  if (btn.value === "Stair") {
    if (c === "" || c === null || c === undefined || c > 100) {
      warning.style.color = "red";
      warning.innerHTML = "Column Number Invalid!";
      return;
    }
  } else {
    if (r === "" || r === null || r === undefined || r > 100) {
      warning.style.color = "red";
      warning.innerHTML = "Row Number Invalid!";
      return;
    } else if (c === "" || c === null || c === undefined || c > 100) {
      warning.style.color = "red";
      warning.innerHTML = "Column Number Invalid!";
      return;
    }
  }
  mario(c, r, btn);
}

function mario(c, r, btn) {
  for (let i = 0; i < c; i++) {
    let row = document.createElement("div");
    row.setAttribute("class", "row");

    if (btn.value === "Stair") {
      BlockMaker(i + 1, row);
    } else if (btn.value === "Square") {
      BlockMaker(r, row);
    }
    blockcont.style.border = "2px solid black";
  }
}
function putblocks(col, NumofBlocks) {
  for (let j = 0; j < NumofBlocks; j++) {
    var block = document.createElement("div");
    block.setAttribute("class", "block");
    col.appendChild(block);
  }
  return col;
}

async function BlockMaker(NumofBlocks, row) {
  let col = document.createElement("div");
  col.setAttribute("class", "col");

  const readycol = await putblocks(col, NumofBlocks);

  appendinrow(readycol,row);
}

function appendinrow(col,row) {
  row.appendChild(col);
  document.getElementById("blocks-cont").appendChild(row);
  randcolor();

  warning.innerHTML = "Generation Done!";
  warning.style.color = "green";
  
  setTimeout(() => {
    warning.innerHTML = "Another Generation?";
    warning.style.color = "yellow";
  }, 500);
}

function randcolor() {
  function colorpick() {
    let color = Math.floor(Math.random() * 255);
    return color;
  }
  let blockcolor = document.getElementsByClassName("block");
  for (let i = 0; i < blockcolor.length; i++) {
    blockcolor[i].style.background = `rgb(${colorpick()},${colorpick()},${colorpick()})`;
  }
}
