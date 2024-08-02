
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
      if (thumnailsDivDom){
      thumnailsDivDom.appendChild(itemThumbnail[0]);        
      }
      carouselDom.classList.add("next");
  }else{
      let positionLastItem = itemSlider.length - 1;
      carouselList.prepend(itemSlider[positionLastItem]);
      if (thumnailsDivDom){
        thumnailsDivDom.prepend(itemThumbnail[positionLastItem])
      }
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