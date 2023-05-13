const ul_cartoes = document.querySelectorAll('.secao-ul-cartoes')
const ul_contas = document.querySelectorAll('.secao-ul-contas')

ul_cartoes.forEach(ul => {
    if(ul.offsetHeight > 320)
        ul.style = " max-height: 320px; overflow-y: scroll; overflow-x: hidden;"
})

ul_contas.forEach(ul => {
    if(ul.offsetHeight > 160)
        ul.style = "max-height: 160px; overflow-y: scroll; overflow-x: hidden;"
})