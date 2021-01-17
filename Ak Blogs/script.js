const slideimgs = document.getElementsByClassName("slides-img");

let slidetoshow = 0;
let switchforce;

slideshow();

function slideshow() {
  for (let i = 0; i < slideimgs.length; i++) {
    slideimgs[i].style.display = "none";
  }
  if (switchforce === false) slidetoshow++;
  if (slidetoshow > slideimgs.length - 1 || slidetoshow < 0) {
    slidetoshow = 0;
  }

  slideimgs[slidetoshow].style.display = "block";
  switchforce = false;
}
setInterval(slideshow, 5000);

function switchslide(btn) {
  if (btn.id === "next") {
    slidetoshow++;
  } else if (btn.id === "prev") {
    slidetoshow--;
    if (slidetoshow < 0) {
      slidetoshow = slideimgs.length - 1;
    }
  }
  switchforce = true;
  slideshow();
}

function recentslider(slidedirect) {
  let recent_slide = document.getElementById("recent-cont");

  let left = window.getComputedStyle(recent_slide).getPropertyValue("left");
  
  if (slidedirect.value === "Next") {
    if (parseInt(left) - 250 < -1400) {
      recent_slide.style.left = "-1400px"
      console.log(left);
      return;
    } else {
      recent_slide.style.left = `${parseInt(left) - 250}px`;
    }
  } else if (slidedirect.value === "Prev") {
    if (parseInt(left) + 250 > -20) {
      recent_slide.style.left = "-20px"
      console.log(left);
      return;
    } else {
      recent_slide.style.left = `${parseInt(left) + 250}px`;
    }
  }
}
