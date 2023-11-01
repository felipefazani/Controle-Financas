let user; // Declaração da variável user como global

fetch("/auth/profile", { method: "get" })
  .then(response => response.text())
  .then(data => {
    user = JSON.parse(data);
    const ids = ["boasvindas1", "boasvindas2"];

    ids.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.innerText = `${user.username}`;
      }
    });

    const infoUser = {
      idUser: user.idUser
    };

    return fetch("/api/accounts/getAccount", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(infoUser)
    });
  })
  .then(response => response.text())
  .then(data => {
    const account = JSON.parse(data);
    const ids = ["saldo1", "saldo2"];

    ids.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.innerText = `R$${account[account.length - 1].current_balance}`;
      }
    });
  })
  .catch(error => {
    console.log("Ocorreu um erro:", error);
  });
