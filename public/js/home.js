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
transactions.forEach(trans => {
  if(trans.type == 0){
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
    small_date.innerText = "02/02/02"
    row_date.appendChild(small_date)

    const col_value = document.createElement("div")
    col_value.classList = 'col-3 text-end'
    li.appendChild(col_value)

    const span_value = document.createElement("span")
    span_value.innerText = "R$" + trans.value
    col_value.appendChild(span_value)


    switch(trans.id_category){
      case "2":
        icon.classList.add("bxs-cart", "mercado")
        span_category_name.innerText = 'Mercado'
        break
      case "3":
        icon.classList.add("bxl-amazon", "online")
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

    lista_itens_hoje.appendChild(li)
  }

  
  


const ul_cartoes = document.querySelectorAll('.secao-ul-cartoes')
const ul_contas = document.querySelectorAll('.secao-ul-contas')

ul_cartoes.forEach(ul => {
    if (ul.offsetHeight > 320)
        ul.style = " max-height: 320px; overflow-y: scroll; overflow-x: hidden;"
})

ul_contas.forEach(ul => {
    if (ul.offsetHeight > 160)
        ul.style = "max-height: 160px; overflow-y: scroll; overflow-x: hidden;"
})


});
 
}

main();


// Insert Receita
async function salvarDadosReceita(){
  const descricao = document.getElementById('descricaoReceita')
  const valor = document.getElementById('valorReceita')
  const data = document.getElementById('dataReceita')
  const categoria = document.getElementById('categoriasReceita')
  // const observacao = document.getElementById('observacaoReceita')
  insertTransactions(1, data.value, valor.value, descricao.value, user.account.id_account, categoria.value)
}

// Insert Despesa
async function salvarDadosDespesa(){
  const descricao = document.getElementById('descricaoDespesa')
  const valor = document.getElementById('valorDespesa')
  const data = document.getElementById('dataDespesa')
  const categoria = document.getElementById('categoriasDespesa')
  insertTransactions(0, data.value, valor.value, descricao.value, user.account.id_account, categoria.value)
}