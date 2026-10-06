function email() {
    let url = "https://mail.google.com/mail/?view=cm&fs=1&to=HouseFood@gmail.com"
    window.open(url, "_blank")
}
function wathsape() {
    let url = "https://wa.me/212786829991"
    window.open(url, "_blank")
}

function toggleMenu() {
    let navLink = document.getElementById("nav-links")
    navLink.classList.toggle("active");
    if(innerWidth <= 700){
        document.querySelectorAll("#nav-links a").forEach(e => e.onclick = () => {
            navLink.classList.remove("active")
        } )
    }
}

