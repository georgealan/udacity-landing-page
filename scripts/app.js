const menuNavigation = document.getElementById('menu-navigation')
const sectionsLinks = document.getElementsByClassName('sections')
const btnScrollToTop = document.getElementById('btn-scroll-top')
const headerStyle = document.querySelector('.header')
const navbarStyle = document.querySelector('.nav')
const videoBackground = document.getElementById('video-bg')
const heroText = document.getElementById('hero-text')
const btnSlideLeft = document.getElementById('btn-slide-left')
const btnSlideRight = document.getElementById('btn-slide-right')
const heroSection = document.getElementById('hero')
// const servicesSection = document.getElementById('services')


// Fill navbar dinamically
for(const section of sectionsLinks) {
    const list = document.createElement('li')
    const link = document.createElement('a')
    let hrefLink = '#' + section.id
    
    link.setAttribute('href', hrefLink)
    list.classList.add(section.id)
    link.innerText = section.dataset.nav
    list.appendChild(link)
    menuNavigation.appendChild(list)
}

// Page Scrool Events
window.addEventListener('scroll', () => {
    // Control Button Scroll to Top
    if(document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
        btnScrollToTop.style.display = 'block'
    } else {
        btnScrollToTop.style.display = 'none'
    }

    // Control Menu Bar Sticky
    if(document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
        headerStyle.style.position = 'sticky'
        headerStyle.style.top = 0
        headerStyle.style.justifyContent = 'center'
        headerStyle.style.width = 100 + 'vw'
        headerStyle.style.backgroundColor = '#ffffff'
        
        navbarStyle.style.width = 100 + '%'
        navbarStyle.style.backgroundColor = null
    } else {
        headerStyle.style.position = 'absolute'
        headerStyle.style.top = 40 + 'px'
        headerStyle.style.justifyContent = null
        headerStyle.style.width = null
        headerStyle.style.backgroundColor = null
        
        navbarStyle.style.width = 85 + 'vw'
        navbarStyle.style.backgroundColor = '#ffffff'
    }
    
    // setTimeout(() => {
    //     console.log('Scrolling has stopped!')
    //     headerStyle.style.display = 'none'
    // }, 5000)

    // Control Active Links
    let scrollPosition = document.documentElement.scrollTop

    for(const section of sectionsLinks) {
        if(scrollPosition >= section.offsetTop - section.offsetHeight * 0.25 && 
            scrollPosition < section.offsetTop + section.offsetHeight - section.offsetHeight * 0.25) {
            activeClass(section.attributes.id.value)
        }
    }
})

function activeClass(id) {
    const linksNav = document.querySelectorAll('#menu-navigation li')
    linksNav.forEach(link => {
        link.classList.remove('active')
        if(link.classList.contains(id)) {
            link.classList.add('active')
        }
    })
}

// Control video background slider
let count = 1
videoBackground.src = 'assets/videos/video-0' + count + '.mp4'
fillHeroTextContent(count)

// Takes the contents of the json file to fill the html tags in the corresponding section
function fillHeroTextContent(videoNumber) {
    fetch('hero-text.json').then((response) => {
        response.json().then((data) => {
            heroText.children[0].innerText = data.contents[videoNumber - 1].title
            heroText.children[1].innerText = data.contents[videoNumber - 1].body
            heroText.children[2].href = data.contents[videoNumber - 1].link
        })
    })
}

/*
It listens when the video ends and after that it switches to the next video in 
the folder until it finds the last one and starts over in an infinite loop 
 */
videoBackground.addEventListener('ended', () => {
    if(count === 5) {
        count = 0
    }
    count++
    videoBackground.src = 'assets/videos/video-0' + count + '.mp4'
    fillHeroTextContent(count)
    videoBackground.play()
})

// Manual control to switch the video in descending order
btnSlideLeft.addEventListener('click', () => {
    if(count > 1) {
        count--
        videoBackground.src = 'assets/videos/video-0' + count + '.mp4'
        fillHeroTextContent(count)
    }
})

// Manual control to change the video, in an increasing order
btnSlideRight.addEventListener('click', () => {
    if(count < 5) {
        count++
        videoBackground.src = 'assets/videos/video-0' + count + '.mp4'
        fillHeroTextContent(count)
    }
})

// servicesSection.addEventListener('wheel', (e) => {
//     e.preventDefault()
//     servicesSection.scrollLeft += e.deltaY
// })

// Control buttom scroll to top
btnScrollToTop.addEventListener('click', () => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
})

