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
  catElem = document.getElementById("categorias");

  for (let i = 0; i < categories.length; i++) {
    catElem.innerHTML += `<option value=${categories[i].id_category}> ${categories[i].name_category} </option>`;
  }
}

main();