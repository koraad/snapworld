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


// gallery preview

const preview = document.querySelector('.preview-section')
let cardViews = document.querySelectorAll('.card .bi-arrow-right')
const cardFullScreen = document.querySelectorAll('.card .bi-arrows-fullscreen')



// gallery cards printing

// const gallery = document.querySelector('.gallery')

// fetch('./storage.json')
// .then(response => response.json())
// .then(data => {

//     for(let i=0;i<data.length;i++) {
//         let card = document.createElement('div')

//         card.classList.add('card')

//         html = `<i class="bi bi-arrows-fullscreen"></i>
//                 <div class="overlay"></div>
//                 <img src="${data[i].imgSrc}" alt="">
//                 <div class="card-content">
//                     <small>${data[i].date}<br><span class="title">${data[i].photo}</span><br>by ${data[i].creator}</small>
//                     <button class="card-btn">read story<i class="bi bi-arrow-right"></i></button>
//                 </div>`
        
//         card.innerHTML = html
//         gallery.append(card)

//         previewOpen()
//         fullScreenOpen()
//     }

    

//     // previewCard.querySelector('#close').onclick = previewClose;
    
// })

// preview open

previewOpen()
fullScreenOpen()

function previewOpen() {
    cardViews.forEach(view => {
        view.onclick = (e)=> {
            preview.classList.add('active')
    
            let card = e.target.parentElement.parentElement.parentElement
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
    })
}

function fullScreenOpen() {
    cardFullScreen.forEach(view => {
    view.onclick = (e)=> {
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
})
}

// preview close

function previewClose() {
    
    preview.classList.remove('active')

}
