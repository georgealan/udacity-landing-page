const menuNavigation = document.getElementById('menu-navigation')
const sectionsLinks = document.getElementsByClassName('sections')
const btnScrollToTop = document.getElementById('btn-scroll-top')
const headerStyle = document.querySelector('.header')
const navbarStyle = document.querySelector('.nav')
const videoBackground = document.getElementById('video-bg')
const heroText = document.getElementById('hero-text')


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

    /* Control video background slider */
    function fillHeroTextContent(number) {
        fetch('hero-text.json').then((response) => {
            response.json().then((data) => {
                heroText.children[0].innerText = data.contents[number - 1].title
                heroText.children[1].innerText = data.contents[number - 1].body
                heroText.children[2].href = data.contents[number - 1].link
            })
        })
    }
    
    let count = 2
    videoBackground.addEventListener('ended', () => {
        videoBackground.src = 'assets/videos/video-0' + count + '.mp4'
        fillHeroTextContent(count)
        count++
        videoBackground.play()
        if(count === 6) {
            count = 1
        }
    })

    btnScrollToTop.addEventListener('click', () => {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
    })


