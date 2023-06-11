const conn = require("../config/databaseconnection");
const express = require('express');

const accountRouter = express.Router();

async function databaseQuery(query) {
  return new Promise((resolve, reject) => {
    conn.query(query, (err, result) => {
      if (err) {
        reject(`Database Query error: \n ${err}`);
        return;
      }

      resolve(result);
    });
  });
};

async function insertAccount(idUser, bank, description, currentBalance, accountType) {
  return new Promise(async (resolve, reject) => {
    varName = false;
    if (idUser === undefined)
      varName = "idUser";
    if (bank === undefined)
      varName = "bank";
    if (description === undefined)
      varName = "description";
    if (currentBalance === undefined)
      varName = "currentBalance";
    if (accountType === undefined)
      varName = "accountType";


    if (varName) {
      reject({ msg: `${varName} is null, try again!`, error: true, code: 1000 });
      return;
    }

    const insertAccountQuery = `INSERT INTO account (id_user, bank_institution, description, current_balance, account_type)
                                VALUES ('${idUser}', '${bank}', '${description}', '${currentBalance}', '${accountType}')`;
    const insertAccountResult = await databaseQuery(insertAccountQuery);

    const account = {
      idAccount: insertAccountResult.insertId,
      idUser,
      bank,
      description,
      currentBalance,
      accountType
    }

    resolve(account);
    return;
  });
}

accountRouter.route('/insertAccount').post(async (req, res) => {
  const idUser = req.body.idUser;
  const bank = req.body.bank;
  const description = req.body.description;
  const currentBalance = req.body.currentBalance;
  const accountType = 'tipo';

  try {
    result = await insertAccount(idUser, bank, description, currentBalance, accountType);
    res.send(result);
  } catch (error) {
    res.send(error);
  }

});

accountRouter.route('/getAccount').post(async (req, res) => {

});


module.exports = accountRouter;