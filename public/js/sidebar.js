const body = document.querySelector('body')
let sidebar = body.querySelector('.sidebar')
let toggle = body.querySelector('.toggle')

toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close")
})