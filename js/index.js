 const mainLink = document.querySelector(".main-link");

 window.addEventListener('scroll', () => {
    if (window.scrollY > 120) {
        mainLink.style.display = "inline"
    }
    else {
        mainLink.style.display = "none"
    }
 }
 )
