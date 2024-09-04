
//autocarousel

let nextDom = document.getElementById("next");
let prevDom = document.getElementById("prev");
let autocarouselDom = document.getElementById("autocarousel");
let autocarouselList = document.getElementById("autocarousel__list");
let thumnailsDivDom = document.getElementById("thumbnails");

let timeRunning = 3000;
let runTimeOut;
let timeAutoNext = 7000;

let runAutoRun = setTimeout(()=>{
  nextDom.click();
},timeAutoNext);
 


function showSlider(type){
  let itemSlider = document.querySelectorAll(".autocarousel__item")
  let itemThumbnail = document.querySelectorAll(".thumbnail");
  if (type ==="next"){
      autocarouselList.appendChild(itemSlider[0]);
      if (thumnailsDivDom){
      thumnailsDivDom.appendChild(itemThumbnail[0]);        
      }
      autocarouselDom.classList.add("next");
  }else{
      let positionLastItem = itemSlider.length - 1;
      autocarouselList.prepend(itemSlider[positionLastItem]);
      if (thumnailsDivDom){
        thumnailsDivDom.prepend(itemThumbnail[positionLastItem])
      }
      autocarouselDom.classList.add("prev");
  }

      clearTimeout(runTimeOut);
      runTimeOut = setTimeout(()=>{
      autocarouselDom.classList.remove("next");
      autocarouselDom.classList.remove("prev");
      }, timeRunning);


      clearTimeout(runAutoRun);
      runAutoRun = setTimeout(()=>{
        nextDom.click();
      },timeAutoNext);

}

//click next

if (nextDom){
  nextDom.addEventListener("click", function(type){
    showSlider("next");
  })
}


//click prev

if (prevDom){
    prevDom.addEventListener("click", function(type){
    showSlider("prev");
  })
}