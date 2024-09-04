let header = document.querySelectorAll("header")
let footer = document.querySelectorAll("footer")

//  console.log(footer)
 
//footer.innerHTML = ``;

// var here = location.href.split('/').slice(3);

// var parts = [{ "text": 'Home', "link": '/' }];

// for( var i = 0; i < here.length; i++ ) {
//     var part = here[i];
//     var text = part.toUpperCase();
//     var link = '/' + here.slice( 0, i + 1 ).join('/');
//     parts.push({ "text": text, "link": link });

// }
// console.log(here)
// console.log(parts)

//stackoverflow.com/questions/6445240/jquery-generate-breadcrumbs-from-url





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