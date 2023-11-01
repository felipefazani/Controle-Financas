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
      body: JSON.stringify({
        idUser: userId
      })
    }
  
    await fetch("/api/accounts/getAccount", options)
      .then(response => response.text())
      .then(data => {
        accounts = JSON.parse(data);
      })
  
    if (accounts.error) {
      if (accounts.msg == "This user has no accounts in database!") {
        return await createUserAccount(userId);
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