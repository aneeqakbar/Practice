let name = document.querySelectorAll("#name path");

for(i = 0; i<name.length; i++){
    console.log(`letter ${i} is ${name[i].getTotalLength()}`);
}