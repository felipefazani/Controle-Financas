// const ul_cartoes = document.querySelectorAll('.secao-ul-cartoes')
// const ul_contas = document.querySelectorAll('.secao-ul-contas')

// ul_cartoes.forEach(ul => {
//     if (ul.offsetHeight > 320)
//         ul.style = " max-height: 320px; overflow-y: scroll; overflow-x: hidden;"
// })

// ul_contas.forEach(ul => {
//     if (ul.offsetHeight > 160)
//         ul.style = "max-height: 160px; overflow-y: scroll; overflow-x: hidden;"
// })

const dia_fechamento = document.getElementById('dia_fechamento')
for(let i = 1; i <= 31; i++){
    const select_fechamento = document.getElementById('dia_fechamento')
    const select_vencimento = document.getElementById('dia_vencimento')
    const opcao = document.createElement("option")
    const opcao2 = document.createElement("option")
    opcao.innerText = i
    opcao2.innerText = i
    opcao.id = i
    opcao2.id = i
    select_fechamento.appendChild(opcao)
    select_vencimento.appendChild(opcao2)
}

function dispararModal(tipo) {
    const tituloModal = document.querySelector('#tituloModal')
    const iconModal = document.querySelector('#iconModal')

    if (tipo == 'receita') {
        tituloModal.innerText = 'Nova Receita'
        iconModal.classList = 'bx bx-dollar-circle fs-1 text-success mx-2'
    } else {
        tituloModal.innerText = 'Nova Despesa'
        iconModal.classList = 'bx bxs-dollar-circle fs-1 text-danger mx-2'
    }
}

function repetir() {
    const opcoes_repetir = document.querySelector('#opcoes_repeticao')
    opcoes_repetir.classList.toggle('d-none')
}

function log_cad() {
    const login = document.querySelector('#login')
    const cadastro = document.querySelector('#cadastro')
    const div = document.querySelectorAll('.switch')
    const col = document.querySelectorAll('.bg')

    cadastro.classList.toggle('d-none')
    login.classList.toggle('d-none')

    div.forEach(div => {
        div.classList.toggle('d-none')
    })
}