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


function dispararModal(tipo) {
    const tituloModal = document.querySelector('#tituloModal')
    const iconModal = document.querySelector('#iconModal')

    if(tipo == 'receita'){
        tituloModal.innerText = 'Nova Receita'
        iconModal.classList = 'bx bx-dollar-circle fs-1 text-success mx-2'
    }else{
        tituloModal.innerText = 'Nova Despesa'
        iconModal.classList = 'bx bxs-dollar-circle fs-1 text-danger mx-2'
    }
}

function repetir(){
    const opcoes_repetir = document.querySelector('#opcoes_repeticao')
    opcoes_repetir.classList.toggle('d-none')
}