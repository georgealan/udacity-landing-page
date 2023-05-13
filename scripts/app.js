const menuNavigation = document.getElementById('menu-navigation')
const sectionsLinks = document.getElementsByClassName('sections')
const btnScrollToTop = document.getElementById('btn-scroll-top')
const headerStyle = document.querySelector('.header')
const navbarStyle = document.querySelector('.nav')
const videoBackground = document.getElementById('video-bg')
const heroText = document.getElementById('hero-text')
const btnSlideLeft = document.getElementById('btn-slide-left')
const btnSlideRight = document.getElementById('btn-slide-right')
const buttonsBreads = document.querySelectorAll('.btn-breed')

// Section breeds DOM elements
const imgHorseBreed = document.querySelector('.horse-breed-img')
const horseBreedName = document.querySelector('.horse-breed-name')
const horseBreedTitle = document.querySelector('.horse-title')
const horseBreedHeight = document.querySelector('.horse-height')
const horseBreedOrigin = document.querySelector('.horse-origin')
const horseBreedColor = document.querySelector('.horse-color')
const horseBreedOpeningText = document.querySelector('.call-description')
const horseBreedFirstTextHeader = document.querySelector('.tfcl-header')
const horseBreedFirstTextBody = document.querySelector('.tfcl-body')
const horseBreedSecondTextHeader = document.querySelector('.tscl-header')
const horseBreedSecondTextBody = document.querySelector('.tscl-body')

// Image Gallery itens
const breedsImageGallery = document.querySelectorAll('.gallery-item')
const modalImageGallery = document.querySelector('.gallery-img')
const modalGallery = document.querySelector('.gallery-modal')
const buttonCloseGalleryModal = document.querySelector('.btn-close-modal')
const buttonsNextImages = document.querySelectorAll('.btn-gallery')
let dialogModals = document.querySelectorAll('dialog');

window.onload = () => {
    // Fill navbar dinamically
    for(const section of sectionsLinks) {
        const list = document.createElement('li')
        const link = document.createElement('a')
        let hrefLink = '#' + section.id
        
        if(section.id === 'hero') {
            list.classList.add('active')
        }

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
            navbarStyle.style.height = 70 + 'px'
            navbarStyle.style.backgroundColor = null
        } else {
            headerStyle.style.position = 'absolute'
            headerStyle.style.top = 40 + 'px'
            headerStyle.style.justifyContent = null
            headerStyle.style.width = null
            headerStyle.style.backgroundColor = null
            
            navbarStyle.style.width = 85 + 'vw'
            navbarStyle.style.height = 80 + 'px'
            navbarStyle.style.backgroundColor = '#ffffff'
        }

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
    function transitionAnimationVideoRight() { // Control animation video slide css clip-path
        videoBackground.classList.add('animation-right')
        setTimeout(() => {
            videoBackground.classList.remove('animation-right')
        }, 1000)
    }

    function transitionAnimationVideoLeft() { // Control animation video slide css clip-path
        videoBackground.classList.add('animation-left')
        setTimeout(() => {
            videoBackground.classList.remove('animation-left')
        }, 1000)
    }

    // Populates the hero's content for the first time
    let count = 1
    videoBackground.src = 'assets/videos/video-0' + count + '.mp4'
    transitionAnimationVideoRight()
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
        transitionAnimationVideoRight()
        videoBackground.play()
    })

    // Manual control to switch the video in descending order
    btnSlideLeft.addEventListener('click', () => {
        if(count > 1) {
            count--
            videoBackground.src = 'assets/videos/video-0' + count + '.mp4'
            fillHeroTextContent(count)
            transitionAnimationVideoLeft()
        }
    })

    // Manual control to change the video, in an increasing order
    btnSlideRight.addEventListener('click', () => {
        if(count < 5) {
            count++
            videoBackground.src = 'assets/videos/video-0' + count + '.mp4'
            fillHeroTextContent(count)
            transitionAnimationVideoRight()
        }
    })

    // Control buttom scroll to top
    btnScrollToTop.addEventListener('click', () => {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
    })

    // Control buttons breeads section
    fillBreedTextContent(0) // Populate the breeds contents for the first time

    function fillBreedTextContent(index) {
        fetch('breed-text.json').then((response) => {
            response.json().then((data) => {
                horseBreedName.innerText = data.contents[index].breedName
                horseBreedHeight.innerText = data.contents[index].height
                horseBreedOrigin.innerText = data.contents[index].origin
                horseBreedColor.innerText = data.contents[index].colors
                imgHorseBreed.src = data.contents[index].imagePath
                horseBreedOpeningText.innerText = data.contents[index].openingText
                horseBreedFirstTextHeader.innerText = data.contents[index].firstTextHeader
                horseBreedFirstTextBody.innerText = data.contents[index].firstTextBody
                horseBreedSecondTextHeader.innerText = data.contents[index].secondTextHeader
                horseBreedSecondTextBody.innerText = data.contents[index].secondTextBody
            })
        })
    }

    buttonsBreads.forEach(button => {
        button.addEventListener('click', () => {
            removeCurrent()
            button.classList.add('current')
            let index = button.dataset.json
            fillBreedTextContent(index)
        })
    })

    function removeCurrent() {
        buttonsBreads.forEach(button => {
            button.classList.remove('current')
        })
    }

    // Control Image gallery modal view
    let totalImagesInGallery = breedsImageGallery.length
    let actualIndex = 0
    
    // Open modal when clicking on an image in the gallery
    breedsImageGallery.forEach(image => {
        image.addEventListener('click', () => {
            let actualImgIndex = image.dataset.index
            modalImageGallery.src = breedsImageGallery[actualImgIndex].src
            modalImageGallery.alt = breedsImageGallery[actualImgIndex].alt
            modalGallery.showModal()
            actualIndex = actualImgIndex
        })
    })

    // Control buttom close Modal
    buttonCloseGalleryModal.addEventListener('click', () => {
        modalGallery.close()
    })
    // Close dialog modals when click in outside, backdrop
    dialogModals.forEach(dialog => {
        dialog.addEventListener('click', (e) => {
            if(e.target.nodeName === 'DIALOG') {
                dialog.close();
            }
        });
    });

    // Control modal buttons next and preview images
    buttonsNextImages.forEach(buttom => {
        buttom.addEventListener('click', () => {
            if(buttom.dataset.side === 'left') {
                if(actualIndex > 0) {
                    actualIndex--
                    modalImageGallery.src = breedsImageGallery[actualIndex].src
                    modalImageGallery.alt = breedsImageGallery[actualIndex].alt
                }
            }
            
            if(buttom.dataset.side === 'right') {
                if(actualIndex < totalImagesInGallery - 1) {
                    actualIndex++
                    modalImageGallery.src = breedsImageGallery[actualIndex].src
                    modalImageGallery.alt = breedsImageGallery[actualIndex].alt
                }
            }
        })
    })

}