async function getUserProfile() {
  await fetch("/auth/profile", { method: "get" })
    .then(response => response.text())
    .then(data => {
      user = JSON.parse(data);
    })

  return user;
}

async function createUserAccount(userId) {
  options = {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idUser: userId,
      bank: "standard",
      description: "first account",
      currentBalance: 0
    })
  }

  await fetch("/api/accounts/insertAccount", options)
    .then(response => response.text())
    .then(data => {
      account = JSON.parse(data);
    })

  return account;
}

async function getUserAccounts(userId) {
  options = {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: await JSON.stringify({
      idUser: userId
    })
  }

  await fetch("/api/accounts/getAccount", options)
    .then(response => response.text())
    .then(async data => {
      accounts = await JSON.parse(data);
    })

  if (accounts.error) {
    if (accounts.msg == "This user has no accounts in database!") {
      return "withoutAccount";
    }
  } else {
    return accounts[0];
  }
}

async function insertTransactions(isInput, date, value, description, idAccount, idCategory) {
  options = {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      date: date,
      type: isInput,
      value: value,
      description: description,
      idAccount: idAccount,
      idCategory: idCategory,
    })
  }

  await fetch("/api/accounts/insertTransactions", options)
    .then(response => response.text())
    .then(data => {
      transaction = JSON.parse(data);
    })

  return transaction;
}

async function getTransactions(idAccount) {
  options = {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idAccount: idAccount,
    })
  }

  await fetch("/api/accounts/getTransactions", options)
    .then(response => response.text())
    .then(data => {
      transactions = JSON.parse(data);
    })

  return transactions;
}

async function getCategories() {
  options = {
    method: "post",
    headers: { "Content-Type": "application/json" },
  }

  await fetch("/api/creditCard/getCategory", options)
    .then(response => response.text())
    .then(data => {
      categories = JSON.parse(data);
    })

  return categories;
}

async function insertCategories(category) {
  options = {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      category: category
    })
  }

  await fetch("/api/creditCard/insertCategory", options)
    .then(response => response.text())
    .then(data => {
      inserted = JSON.parse(data);
    })

  return inserted;
}

async function insertExpense(idBill, date, value, description, recurringExpense, idCategory, isInstallment, numberTimes) {
  options = {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      date: date,
      idBill: idBill,
      value: value,
      description: description,
      recurringExpense: recurringExpense,
      idCategory: idCategory,
      isInstallment,
      numberTimes,
      currentInstallment: 0
    })
  }

  await fetch("/api/creditCard/insertExpense", options)
    .then(response => response.text())
    .then(data => {
      expense = JSON.parse(data);
    })

  return expense;
}

async function getBill(idCard) {
  options = {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idCard: idCard,
    })
  }

  await fetch("/api/creditCard/getBill", options)
    .then(response => response.text())
    .then(data => {
      bills = JSON.parse(data);
    })

  return bills;
}

async function insertBill(idCard, month, year) {
  options = {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idCard: idCard,
      month: month,
      year: year
    })
  }

  await fetch("/api/creditCard/insertBill", options)
    .then(response => response.text())
    .then(data => {
      bill = JSON.parse(data);
    })

  return bill;
}

async function getCard(idUser) {
  options = {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idUser: idUser,
    })
  }

  await fetch("/api/creditCard/getCard", options)
    .then(response => response.text())
    .then(data => {
      cards = JSON.parse(data);
    })

  return cards;
}

async function insertCard(idUser, cardName, cardBrand, closeDate, creditLimit, dueDate) {
  options = {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idUser, 
      cardName, 
      cardBrand, 
      closeDate, 
      creditLimit, 
      dueDate,
    })
  }

  await fetch("/api/creditCard/insertCard", options)
    .then(response => response.text())
    .then(data => {
      card = JSON.parse(data);
    })

  return card;
}
