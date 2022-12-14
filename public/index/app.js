// Constructor to create li items
$(document).ready(function(){
    $("a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('body,html').animate({
                scrollTop: $(hash).offset().top
            }, 1400, function(){
                window.location.hash = hash;
            });
        }
    });
});


function List(headers){
    this.headers = headers;
    let sidemenu = document.getElementById('side-menu');
    console.log(sidemenu);


    headers.forEach(header => {
        if(header.nodeName === "H1"){

            let li = document.createElement('li');
            li.innerHTML= `<a class="p-1 nav-link" href="#">${header.innerHTML}</a>`;
            sidemenu.append(li);

            let div = document.createElement('div');
            div.setAttribute('class', 'collapse-menu');
            div.innerHTML =`<ul class="sub-menu"></ul>`;

            li.append(div);


        }
         if(header.nodeName === "H2"){
             let submenu = document.getElementsByClassName('sub-menu');
             let lastmenu = submenu[submenu.length-1];
             console.log(lastmenu);
             let lis = document.createElement('li');
             lis.innerHTML = `<a href="#">${header.innerHTML}</a>`;
             console.log(lis);
             lastmenu.append(lis);

        }

    });
   }

function clear(){
    document.getElementById('sections-nav').innerHTML ="";
}


function Toc(headerstoc){
    this.headerstoc = headerstoc;


    let toc = document.getElementById('section-nav');

    this.headerstoc.forEach(header => {
        if(header.nodeName === "H2"){
            let li = document.createElement('li');
            li.setAttribute("class", "toc-entry");
            li.innerHTML = `<a href="#">${header.innerHTML}`;
            toc.append(li);
        }

        if(header.nodeName === "H3"){
            let tocli = toc.getElementsByTagName('li');
            let lastli = tocli[tocli.length-1];
            let li3 = document.createElement('ul');
            li3.setAttribute("class", "toc-ul");
            li3.innerHTML = `<li class="toc-entry"><a href="#">${header.innerHTML}</a><li>`;
            lastli.appendChild(li3);

        }
    });

    }


// Get all h1 of section display on left

    let headers = document.querySelectorAll('h1, h2'); 
    new List(headers);


//check if element is viewable
function isviewable(elem, elem2){
    let bounding = elem.getBoundingClientRect();
    console.log(bounding);
    if (bounding.top >= -elem2.offsetTop) {
	      console.log('In the viewport!');
        return true;
    } else {
	      console.log('Not in the viewport... whomp whomp');
        return false;
    }
}

let sections = document.querySelectorAll('section');

console.log(sections[1].offsetTop);

// window.addEventListener('scroll', (event) => {
//     for (let i=0; i<= sections.length; i++){
//     if (isviewable(sections[i], sections[i+1])){
//         if(swi) {
//         let headers_toc = sections[0].querySelectorAll('h2, h3');
//         new Toc(headers_toc);
//             swi = false;
//         }
//     }
//   }
// });

new Toc(sections[0].querySelectorAll('h2, h3'));

let i = 0;

$(document).scroll(function() {
    var cutoff = $(window).scrollTop();
    $('section').each(function(){

        if($(this).offset().top + $(this).height() > cutoff){
            if($('section').eq(i).find('h2').eq(0).text() != $('.section-nav li a').eq(0).text()){
            $('.section-nav').empty();
            new Toc(this.querySelectorAll('h2, h3'));
            return false; // stops the iteration after the first one on screen
            }
        }else{
            i = i+1;
        }
    });
});


// for (let i = 0; i< sections.length; i++){
// let headers_toc = sections[i].querySelectorAll('h2, h3');

// console.log(headers_toc);

//     new Toc(headers_toc);
// }

