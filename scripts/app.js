const menuNavigation = document.getElementById('menu-navigation')
const sectionsLinks = document.getElementsByClassName('sections')
const btnScrollToTop = document.getElementById('btn-scroll-top')
const headerStyle = document.querySelector('.header')
const navbarStyle = document.querySelector('.nav')

/* Fill navbar dinamically */
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

/* Page Scrool Events */
window.addEventListener('scroll', () => {
    /* Control Button Scroll to Top */
    if(document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
        btnScrollToTop.style.display = 'block'
    } else {
        btnScrollToTop.style.display = 'none'
    }

    /* Control Menu Bar Sticky */
    if(document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
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

    /* Control Active Links */
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

btnScrollToTop.addEventListener('click', () => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
})
