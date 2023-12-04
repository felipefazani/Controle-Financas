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
  
    // show all transactions of actual month
    const div_todos_os_lancamentos = document.getElementById("todos_os_lancamentos")
    for(let i=0;i<31;i++){
        let achou_dia = false
        let row_dia = document.createElement("div")
        row_dia.classList = 'row'
        // div_todos_os_lancamentos.appendChild(row_dia)

        let justify_center_dia = document.createElement("div")
        justify_center_dia.classList = 'tabela-dia col d-flex align-items-center justify-content-center'
        row_dia.appendChild(justify_center_dia)

        let span_dia = document.createElement('span')
        span_dia.classList = 'fs-3 fw-bold'
        span_dia.innerText = (i+1)
        justify_center_dia.appendChild(span_dia)

        let hr = document.createElement('hr')
        hr.classList = 'm-0'
        // div_todos_os_lancamentos.appendChild(hr)

        transactions.filter(trans => new Date(trans.date).getDay() === (i+1)).forEach(trans => {
          achou_dia = true
          console.log(trans.date)
          span_dia.innerText = (i+1)
        })

        // transactions.forEach(trans => {
        //   console.log(trans.description)
        // })

        // if(achou_dia == true){
        //   div_todos_os_lancamentos.appendChild(row_dia)
        //   div_todos_os_lancamentos.appendChild(hr)
        // }
        
      
    }
  
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