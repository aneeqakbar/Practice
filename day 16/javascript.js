// SLIDESHOW

let slide = document.getElementsByClassName('slides');
let slidenum = 0;

function slideshow() {
    for (i = 0; i < slide.length; i++) {
        slide[i].style.display = "none";
    }
    slidenum++
    if(slidenum >= slide.length){
        slidenum = 0;
    }
    slide[slidenum].style.display = "block";
}setInterval(slideshow, 5000);
    
// SIDENAV BUTTON

let sidebtn = document.getElementById('btnside');
let sidenav = document.getElementById('sidenav');

sidebtn.addEventListener('click', function showside() {
    if (sidenav.style.transform != "scaleX(1)") {
        sidenav.style.transform = "scaleX(1)"
        sidebtn.style.left = "20%";
        sidebtn.innerHTML = "&#171;";
    }
    else{
        sidenav.style.transform = "scaleX(0)"
        sidebtn.style.left = "0";
        sidebtn.innerHTML = "&#187;";

    }
});

// CONTACT

let contbtn = document.getElementById('contbtn');
let contbtn1 = document.getElementById('hbtn2');
let contcancel = document.getElementById('contcancel');
let cont = document.getElementById('contact');
let contmain = document.getElementById('contmain');

contbtn.addEventListener("click", reveal);
contbtn1.addEventListener("click", reveal);
contcancel.addEventListener("click", reveal);

function reveal() {

    if (contmain.style.display != "block") {
        contmain.style.display = "block";
    }
    else{
        contmain.style.display = "none"
    }
}

// NAVBTN ACTIVE

let navbtns = document.getElementsByClassName('navbtn');

for (i = 0; i < navbtns.length; i++) {
    navbtns[i].addEventListener('click', function(){
        
    });
}

// FOOTER DATE

let fdate = document.getElementById('fdate');
let time = new Date();

function date(){
    document.getElementById('fdate').innerHTML = time.getDate() +"/"+ (time.getMonth()+1) +"/"+ time.getFullYear();
}
date();

// THEME SWITCHER

const body = document.body;
let themebtn = document.getElementById('themebtn');
let dot = document.getElementById('dot');

themebtn.addEventListener('click', theme);

function theme() {
    if (body.classList.contains('dark')) {
        body.classList.remove('dark');
        dot.style.right = "3rem";
        dot.style.backgroundColor = "rgb(0, 162, 255)";
    }
    else{
        body.classList.add('dark');
        dot.style.right = "0";
        dot.style.backgroundColor = "#f1f6f9";
    }
}
