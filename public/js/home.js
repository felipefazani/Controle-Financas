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
    small_date.innerText = new Date(trans.date).getDate() + "/" + new Date(trans.date).getMonth() + "/" + new Date(trans.date).getFullYear()
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

  //  Show card in 'Cartão de crédito' div
  cards = await getCard(user.idUser)
  const lista_cartoes = document.getElementById('lista_cartoes')

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