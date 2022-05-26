let navContent = document.getElementById("mobileNavContent")
let navIcon = document.getElementById("navIcone")
const darkTheme = window.matchMedia("(prefers-color-scheme: dark)");
navContent.style.display = "none"

function nav() {
    if (navIcon.classList.value.includes("opened")) {
        // close - open
        navContent.style.display = "flex"

        setTimeout(() => {
            navContent.classList.toggle("isOpen", true);
        }, 100)
    } else if (!navIcon.classList.value.includes("opened")) {
        // open - close
        navContent.classList.toggle("isOpen", false);

        setTimeout(() => {
            navContent.style.display = "none"

        })
    }
}

var width = $(window).width();
$(window).on('resize', function() {
    if ($(this).width() !== width) {
        width = $(this).width();
        if (width > 615) {
            if (navIcon.classList.value.includes("opened")) {
                navContent.classList.toggle("isOpen", false);
            }
        }
        if (width < 615 && navIcon.classList.value.includes("opened")) {
            if (!navContent.classList.toString().includes("isOpen")) {
                navContent.classList.toggle("isOpen", true);
            }
        }
    }
});
if (darkTheme.matches) {
    // Theme set to dark.
} else {
    // Theme set to light.
    navIcon.src = "./assets/menu-light.svg"
}

var resizingTextareas = [].slice.call(document.querySelectorAll('textarea[autoresize]'));

resizingTextareas.forEach(function(textarea) {
    textarea.addEventListener('input', autoresize, false);
});

function autoresize() {
    this.style.height = '300px';
    this.style.height = this.scrollHeight + 'px';
    this.scrollTop = this.scrollHeight;
    window.scrollTo(window.scrollLeft, (this.scrollTop + this.scrollHeight));
}

function resize() {
    let id = document.getElementById("ta")
    id.style.height = id.scrollHeight + 'px';
    id.scrollTop = id.scrollHeight;
    window.scrollTo(window.scrollLeft, (id.scrollTop + id.scrollHeight));
}