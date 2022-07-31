// copyright year

let copyrightYear = new Date().getFullYear()

document.getElementById('year').innerText = `Copyright ${copyrightYear} by Koraad. All Rights Reserved`

// url changes

loadContent();

window.addEventListener("hashchange", loadContent)

function loadContent(){
  

    let contents = document.querySelectorAll('.content')
    window.scrollTo(0, 0)

    contents.forEach(content => {
        let id = content.id

        content.classList.remove('active')

        if(!location.hash) {
            location.hash = "#home";
        }

        if(id == location.hash.replace('#','')) {
            
            content.classList.add('active')
        }
    })

  
}

// menu toggle 


const menuClose = document.getElementById('menu-close');
const menuOpen = document.getElementById('menu-open');
const mobileMenu = document.querySelector('nav .container ul');


menuClose.onclick = () => {
    mobileMenu.style.left = '-100%';
  
}
menuOpen.onclick = () => {
    mobileMenu.style.left = '0';
  
}


// nav underline

let underLine = document.getElementById('underline')
let menuItems = document.querySelectorAll('.container .menu__items')
let footerMenuItems = document.querySelectorAll('footer ul a')
let logoHeader = document.querySelector('header .logo')


logoHeader.onclick = () => {

    underLine.style.left = '0px';
    
}
    

menuItems.forEach(item => {
    item.onclick = (e) => {

        changeUnderlying(e);
        if(mobileMenu.style.backgroundColor == 'white') {
            mobileMenu.style.left = '-100%'
        } else {
            mobileMenu.style.left = '0'
        }
    };
    
})
footerMenuItems.forEach(item => {
    item.onclick = (e) => {

        changeUnderlying(e);
        
        
    };
    
})

function changeUnderlying(e) {
    let clicked = e.target;
        let menu = ['home', 'stories', 'features', 'pricing']
        
        for(let i=0; i<menu.length;i++) {
            if(menu[i] == clicked.innerText.toLowerCase()) {
                underLine.style.left = `calc( (${[i]} * 25%) )`;
            }
        }
}


// document scrolling effects

let openIcon = document.getElementById('open-icon')

document.onscroll = function() {

    // menu bar hide

    // menuToggle.classList.replace('fa-xmark', 'fa-bars');
    // document.querySelector('header nav').classList.remove('active');

    if (openIcon.classList.contains('bi-dash')) {
        // sticky social icons hide
        if (window.innerHeight + window.scrollY > document.body.clientHeight) {
            document.querySelector('.sticky-social').style.bottom ='-100%';
            document.querySelector('.sticky-social').style.opacity='0';
            document.querySelectorAll('.sticky-social i').forEach(icon => {
                icon.style.width='0';
            })
            openIcon.classList.replace('bi-dash', 'bi-plus')
            
        }
    }

    
    
}



// sticky open

const stickyOpen = document.querySelector('.sticky-open')

stickyOpen.onclick = ()=> {

    if (openIcon.classList.contains('bi-plus')) {

        openIcon.classList.replace('bi-plus', 'bi-dash')
        document.querySelector('.sticky-social').style.bottom ='15px';
        document.querySelector('.sticky-social').style.opacity='1';
        document.querySelectorAll('.sticky-social i').forEach(icon => {
            icon.style.width='50px';
        })
    } else {
        openIcon.classList.replace('bi-dash', 'bi-plus')
        document.querySelector('.sticky-social').style.bottom ='-100%';
        document.querySelector('.sticky-social').style.opacity='0';
        document.querySelectorAll('.sticky-social i').forEach(icon => {
            icon.style.width='0';
        })
    }
    
}


// gallery cards printing

// stories printing

const gallery = document.querySelector('.gallery')
const homeGallery = document.querySelector('.home-library')


fetch('./storage.json')
.then(response => response.json())
.then(data => {

    printing(data, data.length, gallery);
    printing(data, 4, homeGallery);
    
    
})

function printing(data, length, container) {
    for(let i=0;i<length;i++) {

        html = `<div class="card" id= "${i}">
                    <i class="bi bi-arrows-fullscreen"></i>
                    <div class="overlay"></div>
                    <img src="${data[i].imgSrc}" alt="">
                    <div class="card-content">
                        <small>${data[i].date}<br><span class="title">${data[i].photo}</span><br>by ${data[i].creator}</small>
                        <button class="card-btn">read story<i class="bi bi-arrow-right"></i></button>
                    </div>
                </div>`
        
        container.innerHTML += html

        // gallery preview

        let buttonsFull = document.querySelectorAll('.bi-arrows-fullscreen')
        let buttonsDetails = document.querySelectorAll('.card-btn')

        buttonsFull.forEach(button => {
            button.onclick = fullScreenOpen;
        })
        buttonsDetails.forEach(btn => {
            btn.onclick = previewOpen;
        })
        
    }
}


function fullScreenOpen(e) {
    preview.classList.add('active')

    let card = e.target.parentElement
    let index = card.id

    fetch('./storage.json')
    .then(response => response.json())
    .then(data => {

        let previewCard = preview.querySelector('.preview-card')

        html = `<div class="image">
                    <i class="bi bi-fullscreen-exit" id="minimize"></i>
                    <img src="${data[index].imgSrc}" alt="">
                </div>`
        
        previewCard.innerHTML = html

        previewCard.querySelector('#minimize').onclick = previewClose;
        
    })
           
}

const preview = document.querySelector('.preview-section')

function previewOpen(e) {

    preview.classList.add('active')

    let card = e.target.parentElement.parentElement
    let index = card.id

    fetch('./storage.json')
    .then(response => response.json())
    .then(data => {

        let previewCard = preview.querySelector('.preview-card')

        html = `<div class="image">
                    <img src="${data[index].imgSrc}" alt="">
                </div>

                <div class="preview-content">

                    <i class="bi bi-dash-lg" id="close"></i>

                    <small id="date-created">${data[index].date}</small>
                    <span id="image-name" class="title">"${data[index].photo}"</span><h5>by ${data[index].creator}</h5>
                    <p>${data[index].story}</p>
                </div>`
        
        previewCard.innerHTML = html

        previewCard.querySelector('#close').onclick = previewClose;
        
    })

}


// preview close

function previewClose() {
    
    preview.classList.remove('active')

}
