async function main() {
  // add user name in page
  user = await getUserProfile();
  const ids = ["boasvindas1", "boasvindas2"];

  for (let i = 0; i < ids.length; i++) {
    const element = document.getElementById(ids[i]);
    element.innerText = `${user.username}`;
  }

  // get user account
  user.account = await getUserAccounts(user.idUser);

  if (user.account == "withoutAccount") {
    user.account = createUserAccount(user.idUser);
    location.reload();
  }
  console.log(user);

  const saldoElement = document.getElementById("saldo1");
  if (saldoElement) {
    if (user.account.current_balance == undefined)
      user.account.current_balance = 0;
    saldoElement.innerText = `R$${user.account.current_balance}`;
  }

  transactions = await getTransactions(user.account.id_account);
  currentDate = new Date();

  currentMonthTrans = transactions.filter(transaction =>
    new Date(transaction.date).getMonth() == currentDate.getMonth() & new Date(transaction.date).getYear() == currentDate.getYear()
  );

  currMonthIncome = 0;
  currentMonthTrans.filter(trans => trans.type == 1).forEach(trans => {
    currMonthIncome += trans.value;
  });

  currMonthExpense = 0;
  currentMonthTrans.filter(trans => trans.type == 0).forEach(trans => {
    currMonthExpense += trans.value;
  });

  currMonthIncomeElem = document.getElementById("receitaMensal");
  currMonthIncomeElem.innerText = `R$ ${currMonthIncome}`;

  currMonthExpenseElem = document.getElementById("despesaMensal");
  if (currMonthExpense != 0) {
    currMonthExpenseElem.innerText = `R$ -${currMonthExpense}`;
  } else {
    currMonthExpenseElem.innerText = `R$ ${currMonthExpense}`;
  }

  // get categories
  categories = await getCategories();
  catElem = document.getElementById("categoriasDespesa");

  for (let i = 0; i < categories.length; i++) {
    catElem.innerHTML += `<option value=${categories[i].id_category}> ${categories[i].name_category} </option>`;
  }

  // Show transactions % values in 'Gastos do mês atual' div
  lista_gastos_mes_atual = document.getElementById('lista_gastos_mes_atual')
  let total_gastos = 0
  let total_gastos_mercado = 0
  let total_gastos_shopping = 0
  let total_gastos_roupas = 0

  transactions.filter(trans => trans.type == 0 && new Date(trans.date).getMonth() == currentDate.getMonth()).forEach(trans => {
    total_gastos += trans.value
  })

  console.log("TOTAL GASTOS = " + total_gastos)

  // Gastos com mercado
  transactions.filter(trans => trans.id_category == "2" && new Date(trans.date).getMonth() == currentDate.getMonth()).forEach(trans => {
    total_gastos_mercado += trans.value
  })

  // Gastos com compras
  transactions.filter(trans => trans.id_category == "3" && new Date(trans.date).getMonth() == currentDate.getMonth()).forEach(trans => {
    total_gastos_shopping += trans.value
  })

  // Gastos com roupas
  transactions.filter(trans => trans.id_category == "4" && new Date(trans.date).getMonth() == currentDate.getMonth()).forEach(trans => {
    total_gastos_roupas += trans.value
  })


  if(total_gastos_mercado != 0)
    criarGastoAtual("2", total_gastos_mercado, lista_gastos_mes_atual)
  if(total_gastos_shopping != 0)
    criarGastoAtual("3", total_gastos_shopping, lista_gastos_mes_atual)
  if(total_gastos_roupas != 0)
    criarGastoAtual("4", total_gastos_roupas, lista_gastos_mes_atual)

  function criarGastoAtual(id, transValue, lista_gastos_mes_atual){
    const sem_dados = document.getElementById("sem_dados_gastos_mes_atual")
    sem_dados.classList.add('d-none')

    const li = document.createElement("li")
    li.classList = 'item'

    const col_icon = document.createElement("div")
    col_icon.classList = 'col-3 mr'
    li.appendChild(col_icon)

    const icon = document.createElement("i")
    icon.classList = 'bx item-icon'
    col_icon.appendChild(icon)

    const col_category_name = document.createElement("div")
    col_category_name.classList = 'col'
    li.appendChild(col_category_name)

    const span_name = document.createElement("span")
    col_category_name.appendChild(span_name)

    const span_percentage = document.createElement("span")
    span_percentage.classList = 'fw-light mx-1'
    span_percentage.innerText = ((transValue * 100) / total_gastos).toFixed(2) + "%"
    col_category_name.appendChild(span_percentage)

    switch(id){
      case "2":
        icon.classList.add("bxs-cart", "mercado")
        span_name.innerText = 'Mercado'
        break
      case "3":
        icon.classList.add("bxs-shopping-bags", "shopping")
        span_name.innerText = 'Compras'
        break
      case "4":
        icon.classList.add("bx-closet", "roupa")
        span_name.innerText = 'Roupas'
        break
      default:
        span_name.innerText = 'Default'
        icon.classList.add("bx-dollar")
    }

    lista_gastos_mes_atual.appendChild(li)
  }

  //  Show transaction values in 'Contas a Pagar' div
  lista_itens_hoje = document.getElementById('lista_itens_hoje')
  lista_itens_proximos = document.getElementById('lista_itens_proximos')
  sem_dados_contas_hoje = document.getElementById('sem_dados_contas_hoje')
  sem_dados_contas_proximas = document.getElementById('sem_dados_contas_proximas')

  transactions.forEach(trans => {

    const li = document.createElement("li")
    li.classList = 'item'

    const col_icon = document.createElement("div")
    col_icon.classList = 'col-1'
    li.appendChild(col_icon)

    const icon = document.createElement("i")
    icon.classList = 'bx item-icon'
    col_icon.appendChild(icon)

    const col_category_name = document.createElement("div")
    col_category_name.classList = 'col-6'
    li.appendChild(col_category_name)

    const row_category_name = document.createElement("div")
    row_category_name.classList = 'row'
    col_category_name.appendChild(row_category_name)

    const span_category_name = document.createElement("span")
    row_category_name.appendChild(span_category_name)

    const row_date = document.createElement("div")
    row_date.classList = 'row'
    col_category_name.appendChild(row_date)

    const small_date = document.createElement("small")
    small_date.innerText = new Date(trans.date).getDate() + "/" + (new Date(trans.date).getMonth() + 1) + "/" + new Date(trans.date).getFullYear()
    row_date.appendChild(small_date)

    const col_value = document.createElement("div")
    col_value.classList = 'col-3 text-end'
    li.appendChild(col_value)

    const span_value = document.createElement("span")
    span_value.innerText = "R$" + trans.value
    col_value.appendChild(span_value)


    switch (trans.id_category) {
      case "2":
        icon.classList.add("bxs-cart", "mercado")
        span_category_name.innerText = 'Mercado'
        break
      case "3":
        icon.classList.add("bxs-shopping-bags", "shopping")
        span_category_name.innerText = 'Compras'
        break
      case "4":
        icon.classList.add("bx-closet", "roupa")
        span_category_name.innerText = 'Roupas'
        break
      default:
        span_category_name.innerText = 'Default'
        icon.classList.add("bx-dollar")
    }

    if (trans.type == 0) {
      if (new Date(trans.date).getDate() == currentDate.getDate()) {
        sem_dados_contas_hoje.classList.add('d-none')
        lista_itens_hoje.appendChild(li)
      } else {
        sem_dados_contas_proximas.classList.add('d-none')
        lista_itens_proximos.appendChild(li)
      }
    }

  });

  // Show transaction values in 'Contas a receber' div
  
  const contas_a_receber_este_mes = document.getElementById("lista_contas_a_receber_este_mes")
  const contas_a_receber_proximas = document.getElementById("lista_contas_a_receber_proximas")
  const sem_dados_receber_mes_atual = document.getElementById("sem_dados_receber_mes_atual")
  const sem_dados_receber_proximos = document.getElementById("sem_dados_receber_proximos")

  transactions.forEach(trans => {

    const li = document.createElement("li")
    li.classList = 'item'

    const col_icon = document.createElement("div")
    col_icon.classList = 'col-1'
    li.appendChild(col_icon)

    const icon = document.createElement("i")
    icon.classList = 'bx item-icon'
    col_icon.appendChild(icon)

    const col_category_name = document.createElement("div")
    col_category_name.classList = 'col-6'
    li.appendChild(col_category_name)

    const row_category_name = document.createElement("div")
    row_category_name.classList = 'row'
    col_category_name.appendChild(row_category_name)

    const span_category_name = document.createElement("span")
    row_category_name.appendChild(span_category_name)

    const row_date = document.createElement("div")
    row_date.classList = 'row'
    col_category_name.appendChild(row_date)

    const small_date = document.createElement("small")
    small_date.innerText = new Date(trans.date).getDate() + "/" + (new Date(trans.date).getMonth() + 1) + "/" + new Date(trans.date).getFullYear()
    row_date.appendChild(small_date)

    const col_value = document.createElement("div")
    col_value.classList = 'col-3 text-end'
    li.appendChild(col_value)

    const span_value = document.createElement("span")
    span_value.innerText = "R$" + trans.value
    col_value.appendChild(span_value)


    switch (trans.id_category) {
      case "10":
        icon.classList.add("bxs-bar-chart-alt-2")
        span_category_name.innerText = 'Investimento'
        break
      case "11":
        icon.classList.add("bx-dollar")
        span_category_name.innerText = 'Vendas'
        break
      case "12":
        icon.classList.add("bx-dolar")
        span_category_name.innerText = 'Salário'
        break
      case "13":
        icon.classList.add("bx-dollar")
        span_category_name.innerText = 'Outros'
      default:
        span_category_name.innerText = 'Outros'
        icon.classList.add("bx-dollar")
    }

    if (trans.type == 1) {
      if (new Date(trans.date).getMonth() == currentDate.getMonth()) {
        sem_dados_receber_mes_atual.classList.add('d-none')
        contas_a_receber_este_mes.appendChild(li)
      } else {
        sem_dados_receber_proximos.classList.add('d-none')
        contas_a_receber_proximas.appendChild(li)
      }
    }

  });

  //  Show card in 'Cartão de crédito' div
  cards = await getCard(user.idUser)
  const lista_cartoes = document.getElementById('lista_cartoes')

  try{
    cards.forEach(card => {

      const li = document.createElement("li")
      li.classList = 'item'

      const col_icon = document.createElement("div")
      col_icon.classList = 'col-1'
      li.appendChild(col_icon)

      const cardIcon = document.createElement("i")
      cardIcon.classList = 'bx item-icon'
      col_icon.appendChild(cardIcon)

      const col_card_info = document.createElement("div")
      col_card_info.classList = 'col-6'
      li.appendChild(col_card_info)

      const row_card_name = document.createElement("div")
      row_card_name.classList = 'row'
      col_card_info.appendChild(row_card_name)

      const span_card_name = document.createElement("span")
      span_card_name.innerText = card.card_name
      row_card_name.appendChild(span_card_name)

      const row_fatura_atual = document.createElement("div")
      row_fatura_atual.classList = 'row'
      col_card_info.appendChild(row_fatura_atual)

      const small_fatura_atual = document.createElement("small")
      small_fatura_atual.innerText = "Fatura Atual"
      row_fatura_atual.appendChild(small_fatura_atual)

      const row_valor_fatura = document.createElement("div")
      row_valor_fatura.classList = 'row'
      col_card_info.appendChild(row_valor_fatura)

      const valor_fatura = document.createElement("small")
      valor_fatura.classList = 'text-danger'
      valor_fatura.innerText = "R$0"
      row_valor_fatura.appendChild(valor_fatura)

      const col_limite_cartao = document.createElement("div")
      col_limite_cartao.classList = 'col-5'
      li.appendChild(col_limite_cartao)

      const row_btn_acessar_fatura = document.createElement("div")
      row_btn_acessar_fatura.classList = 'row w-100'
      col_limite_cartao.appendChild(row_btn_acessar_fatura)

      const btn_acessar_fatura = document.createElement("button")
      btn_acessar_fatura.classList = 'btn btn-secondary btn-sm fs-7'
      btn_acessar_fatura.innerText = "Acessar Fatura"
      row_btn_acessar_fatura.appendChild(btn_acessar_fatura)

      const row_limite_disponivel = document.createElement("div")
      row_limite_disponivel.classList = 'row w-100'
      col_limite_cartao.appendChild(row_limite_disponivel)

      const span_texto_disponivel = document.createElement("span")
      span_texto_disponivel.classList = 'd-flex justify-content-end fs-8'
      span_texto_disponivel.innerText = "Disponível"
      row_limite_disponivel.appendChild(span_texto_disponivel)

      const small_valor_limite = document.createElement("small")
      small_valor_limite.classList = 'd-flex justify-content-end fs-9 fw-lighter'
      small_valor_limite.innerText = "R$" + card.credit_limit
      row_limite_disponivel.appendChild(small_valor_limite)

      switch (card.card_brand) {
        case "Paypal":
          cardIcon.classList.add("bxl-paypal", "paypal")
          break
        case "Mastercard":
          cardIcon.classList.add("bxl-mastercard", "mastercard")
          break
        case "Visa":
          cardIcon.classList.add("bxl-visa", "visa")
          break
        case "Venmo":
          cardIcon.classList.add("bxl-venmo", "venmo")
          break
        default:
          cardIcon.classList.add("bx-dollar")
      }

      sem_dados_cartao.classList.add('d-none')
      lista_cartoes.appendChild(li)

      // const a = document.createElement("p")
      // a.innerText = card.card_name
      // lista_cartoes.appendChild(a)
    })
  }catch(e){
    console.log('nenhum cartao foi cadastrado ainda')
  }

  // Show 'Balanço do mês' div
  const balanco_do_mes = document.getElementById("balanco_do_mes")
  let total_despesas = 0
  let total_receitas = 0
  
  transactions.filter(trans => trans.type == 0 && new Date(trans.date).getMonth() == currentDate.getMonth()).forEach(trans => {
    total_despesas += trans.value
  })

  transactions.filter(trans => trans.type == 1 && new Date(trans.date).getMonth() == currentDate.getMonth()).forEach(trans => {
    total_receitas += trans.value
  })

  const resultado_final = total_receitas - total_despesas

  console.log("TOT DESPESA " + total_despesas)
  console.log("TOT RECEITA " + total_receitas)
  console.log("TOT RESULT" + resultado_final)
  
  const div_receita = document.createElement('div')
  div_receita.classList = 'row my-3'

  const span_valores_receita = document.createElement('span')
  div_receita.appendChild(span_valores_receita)

  const small_receita = document.createElement('small')
  small_receita.innerText = "Receita - " + total_receitas
  span_valores_receita.appendChild(small_receita)

  const div_porcentagem_receita = document.createElement('div')
  div_porcentagem_receita.classList = 'balanco-porcentagem receita d-flex align-items-center justify-content-center'
  span_valores_receita.appendChild(div_porcentagem_receita)

  const small_porcentagem_receita = document.createElement('small')
  small_porcentagem_receita.innerText = ((total_receitas * 100) / (total_receitas + total_despesas)).toFixed(2) + "%"
  div_porcentagem_receita.appendChild(small_porcentagem_receita)

  div_porcentagem_receita.style.width = ((total_receitas * 100) / (total_receitas + total_despesas)) + "%";

  balanco_do_mes.appendChild(div_receita)

  if(total_despesas != 0){
    const div_despesa = document.createElement('div')
    div_despesa.classList = 'row'
  
    const span_valores_despesa = document.createElement('span')
    div_despesa.appendChild(span_valores_despesa)
  
    const small_despesa = document.createElement('small')
    small_despesa.innerText = "despesa - " + total_despesas
    span_valores_despesa.appendChild(small_despesa)
  
    const div_porcentagem_despesa = document.createElement('div')
    div_porcentagem_despesa.classList = 'balanco-porcentagem despesa d-flex align-items-center justify-content-center'
    span_valores_despesa.appendChild(div_porcentagem_despesa)
  
    const small_porcentagem_despesa = document.createElement('small') 
    small_porcentagem_despesa.innerText = ((total_despesas * 100) / (total_receitas + total_despesas)).toFixed(2) + "%"
    div_porcentagem_despesa.appendChild(small_porcentagem_despesa)
  
    div_porcentagem_despesa.style.width = ((total_despesas * 100) / (total_receitas + total_despesas)) + "%"
  
    balanco_do_mes.appendChild(div_despesa)
  
  }
  const div_result_final = document.createElement('div')
  div_result_final.classList = 'row my-4'

  const h4_resuldado = document.createElement('h4')
  h4_resuldado.style.color = "#666666"
  h4_resuldado.innerText = "Resultado: "
  div_result_final.appendChild(h4_resuldado)

  const span_valor_final = document.createElement('span')
  span_valor_final.classList = 'fs-4 text-success fw-light'
  span_valor_final.innerText = "R$" + resultado_final

  div_result_final.appendChild(span_valor_final)

  balanco_do_mes.appendChild(div_result_final)

  // Hide overflow 
  const ul_cartoes = document.querySelectorAll('.secao-ul-cartoes')
  const ul_contas = document.querySelectorAll('.secao-ul-contas')

  ul_cartoes.forEach(ul => {
    if (ul.offsetHeight > 320)
      ul.style = "max-height: 320px; overflow-y: scroll; overflow-x: hidden;"
  })

  ul_contas.forEach(ul => {
    if (ul.offsetHeight > 160)
      ul.style = "max-height: 160px; overflow-y: scroll; overflow-x: hidden;"
  })

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