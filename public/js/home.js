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
    saldoElement.innerText = `R$${user.account.current_balance}`;
  }
}

main();