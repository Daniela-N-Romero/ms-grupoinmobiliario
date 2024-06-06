

// Scroll and header

const body = document.body;
let lastScroll = 0;

window.addEventListener("scroll", ()=>{
    const currentScroll = window.scrollY;
    if ( currentScroll <=0){
        body.classList.remove("scroll-up")
    }
    if (currentScroll > lastScroll && !body.classList.contains("scroll-down")){
        body.classList.remove("scroll-up");
        body.classList.add("scroll-down");
    }
    if (currentScroll < lastScroll && body.classList.contains("scroll-down")){
        body.classList.remove("scroll-down");
        body.classList.add("scroll-up");
    }
    lastScroll = currentScroll;
});

// Acordions

let acc = document.getElementsByClassName("accordion");
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active-accordion");

    /* Toggle between hiding and showing the active panel */
    let panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

//carousel

let nextDom = document.getElementById("next");
let prevDom = document.getElementById("prev");
let carouselDom = document.getElementById("carousel");
let carouselList = document.getElementById("carousel__list");
let thumnailsDivDom = document.getElementById("thumbnails");

let timeRunning = 3000;
let runTimeOut;
let timeAutoNext = 7000;

let runAutoRun = setTimeout(()=>{
  nextDom.click();
},timeAutoNext);



function showSlider(type){
  let itemSlider = document.querySelectorAll(".carousel__item")
  let itemThumbnail = document.querySelectorAll(".thumbnail");
  if (type ==="next"){
      carouselList.appendChild(itemSlider[0]);
      thumnailsDivDom.appendChild(itemThumbnail[0]);
      carouselDom.classList.add("next");
  }else{
      let positionLastItem = itemSlider.length - 1;
      carouselList.prepend(itemSlider[positionLastItem]);
      thumnailsDivDom.prepend(itemThumbnail[positionLastItem])
      carouselDom.classList.add("prev");
  }



      clearTimeout(runTimeOut);
      runTimeOut = setTimeout(()=>{
      carouselDom.classList.remove("next");
      carouselDom.classList.remove("prev");
      }, timeRunning);


      clearTimeout(runAutoRun);
      runAutoRun = setTimeout(()=>{
        nextDom.click();
      },timeAutoNext);

}

//click next

nextDom.addEventListener("click", function(type){
  showSlider("next");
})


//click prev

prevDom.addEventListener("click", function(type){
  showSlider("prev");
})
