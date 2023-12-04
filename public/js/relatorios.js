async function main() {
    // add user name in page
    user = await getUserProfile();
    const ids = ["boasvindas1"];

    for (let i = 0; i < ids.length; i++) {
      const element = document.getElementById(ids[i]);
      element.innerText = `${user.username}`;
    }

    // get user account
    user.account = await getUserAccounts(user.idUser);

    console.log("USER: " + user)
    console.log("USER ACCOUNT: " + user.account)
  
    transactions = await getTransactions(user.account.id_account);
    currentDate = new Date();
  
    // get categories
    categories = await getCategories();
    catElem = document.getElementById("categoriasDespesa");

    currentDate = new Date();
    
    var data = []
    var entradas = []
    var saida = []
    var resultados = []
    const valores_relatorio = document.getElementById("valores_relatorio")
    for(let i=1;i<=31;i++){
        var valEntradas = 0
        var valSaidas = 0
        var resultadoFinal = 0
        var data
        transactions.filter(trans => new Date(trans.date).getDate() === i).forEach(trans => {
            if(trans.type == 0){
                valSaidas += trans.value
            }
            if(trans.type == 1){
                valEntradas += trans.value
            }

            data = new Date(trans.date)
        })
        resultadoFinal = valEntradas - valSaidas
        if(resultadoFinal != 0){
            let tr = document.createElement('tr')
            valores_relatorio.appendChild(tr)

            let th1 = document.createElement('th')
            th1.scope = 'row'
            th1.innerText = data.getDate() + "/" + data.getMonth() + "/" + data.getFullYear()
            tr.appendChild(th1)
            
            let td1 = document.createElement('td')
            td1.classList = 'entrada'
            td1.innerText = "R$" + valEntradas
            tr.appendChild(td1)
            
            let td2 = document.createElement('td')
            td2.classList = 'saida'
            td2.innerText = "R$" + valSaidas
            tr.appendChild(td2)

            let result = document.createElement('td')
            result.innerText = "R$" + resultadoFinal
            tr.appendChild(result)
        }

    }


    // transactions.forEach(trans => {
    //     console.log(new Date(trans.date).getDate())
    // })

    // transactions.forEach(trans => {
    //     console.log(trans.date)
    // })
  
  }
  
 main();
  
  
  // Inserir Receita
  async function salvarDadosReceita() {
    const descricao = document.getElementById('descricaoReceita')
    const valor = document.getElementById('valorReceita')
    const data = document.getElementById('dataReceita')
    const categoria = document.getElementById('categoriasReceita')
    // const observacao = document.getElementById('observacaoReceita')
    insertTransactions(1, data.value, valor.value, descricao.value, user.account.id_account, categoria.value)
  }
  
  // Inserir Despesa
  async function salvarDadosDespesa() {
    const descricao = document.getElementById('descricaoDespesa')
    const valor = document.getElementById('valorDespesa')
    const data = document.getElementById('dataDespesa')
    const categoria = document.getElementById('categoriasDespesa')
    insertTransactions(0, data.value, valor.value, descricao.value, user.account.id_account, categoria.value)
  }
  
  // Inserir cartão
  async function salvarCartão() {
    const bandeiraCartao = document.getElementById('bandeiraCartao')
    const limiteCartao = document.getElementById('limiteCartao')
    const dia_fechamento = document.getElementById('dia_fechamento')
    const dia_vencimento = document.getElementById('dia_vencimento')
    const nome_cartao = document.getElementById('nome_cartao')
    insertCard(user.idUser, nome_cartao.value, bandeiraCartao.value, dia_fechamento.value, limiteCartao.value, dia_vencimento.value)
  }