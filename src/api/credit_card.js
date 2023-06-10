const conn = require("../config/databaseconnection");
const express = require('express');

const creditRouter = express.Router();

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

async function insertBill(idCard, price, month, year, paid, valuePaid) {
  return new Promise(async (resolve, reject) => {
    let varName = false;

    if (idCard === undefined)
      varName = "idCard";
    if (price === undefined)
      varName = "price";
    if (month === undefined)
      varName = "month";
    if (year === undefined)
      varName = "year";
    if (paid === undefined)
      varName = "paid";
    if (valuePaid === undefined)
      varName = "valuePaid";

    if (varName) {
      resolve({ msg: `${varName} is null, try again!`, error: true, code: 1000 });
      return;
    }

    if (month >= 13 || month <= 0) {
      resolve({ msg: "month cannot be greater than 12 and less than 1", error: true, code: 1000 });
      return;
    } else if (price < 0) {
      resolve({ msg: "price cannot be less than 0", error: true, code: 1000 });
      return;
    } else {
      // check if the bill already exists
      const billQuery = `SELECT * FROM card_bill WHERE id_card=${idCard} AND month=${month} AND year=${year}`;
      const billResult = await databaseQuery(billQuery);

      if (billResult.length == 0) {
        const insertBillQuery = `INSERT INTO card_bill (price, month, year, paid, value_paid, id_card) 
                                VALUES ('${price}', '${month}', '${year}', '${paid}', '${valuePaid}', '${idCard}')`;

        const insertBillResult = await databaseQuery(insertBillQuery);

        const bill = {
          idCard,
          price,
          month,
          year,
          paid,
          valuePaid,
          idBill: insertBillResult.insertId,
        };
        resolve(bill);
        return;

      } else {
        const bill = {
          "idCard": billResult[0].id_card,
          price,
          month,
          year,
          paid,
          "valuePaid": billResult[0].value_paid,
          "idBill": billResult[0].id_bill,
        }
        resolve(bill);
        return;

      }
    }
  });
}

async function insertExpense(idBill, value, date, description, recurringExpense, isInstallment, numberTimes, currentInstallment, idCategory, installmentControl = 1) {
  return new Promise((resolve, reject) => {
    let varName = false;

    if (idBill === undefined)
      varName = "idBill";
    if (idCategory === undefined)
      varName = "idCategory";
    if (value === undefined)
      varName = "value";
    if (date === undefined)
      varName = "date";
    if (description === undefined)
      varName = "description";
    if (recurringExpense === undefined)
      varName = "recurringExpense";
    if (isInstallment === undefined)
      varName = "isInstallment";
    if (numberTimes === undefined)
      varName = "numberTimes";
    if (currentInstallment === undefined)
      varName = "currentInstallment";

    if (varName) {
      resolve({ msg: `${varName} is null, try again!`, error: true, code: 1000 });
      return;
    }
    else {
      if (isInstallment & installmentControl) {
        value = value / numberTimes;
        currentInstallment = currentInstallment + 1;
      }

      conn.query(`INSERT INTO card_expense (id_bill, category, value, date, description, recurring_expense, is_installment, number_of_times, current_installment)
            VALUES ('${idBill}', '${idCategory}', '${value}', '${date}', '${description}', '${recurringExpense}', '${isInstallment}', '${numberTimes}', '${currentInstallment}')`
        , (err, result) => {
          if (err) {
            reject(err);
            return;
          } else {
            conn.query(`UPDATE card_bill SET price= price + ${value} WHERE id_bill = ${idBill}`
              , (err, result) => {
                if (err) {
                  reject(err);
                  return;
                }
              });

            if (isInstallment & installmentControl) {
              conn.query(`SELECT id_card, month, year FROM card_bill WHERE id_bill= ${idBill}`
                , async (err, result) => {
                  if (err) {
                    reject(err);
                    return;
                  } else {
                    const idCard = result[0].id_card;
                    let month = result[0].month;
                    let year = result[0].year;

                    for (let i = 0; i < numberTimes - 1; i++) {
                      month++;
                      if (month == 13) {
                        month = 1;
                        year++;
                      }

                      const bill = await insertBill(idCard, 0, month, year, 0, 0);
                      console.log(bill.idBill);
                      const expense = await insertExpense(bill.idBill, value, date, description, 0, isInstallment, numberTimes, i + 1, idCategory, installmentControl = 0);
                      console.log(expense);
                    }
                  }
                });
            }

            cardExpense = {
              idBill,
              idCategory,
              value,
              date,
              description,
              recurringExpense,
              isInstallment,
              numberTimes,
              currentInstallment,
              "idCardExpense": result.insertId,
            }

            resolve(cardExpense);
            return;
          }
        });
    }

  })
};

creditRouter.route("/insertCard").post(async (req, res) => {
  // getting information 
  const idUser = req.body.idUser;
  const cardName = req.body.cardName;
  const cardBrand = req.body.cardBrand;
  const closeDate = req.body.closeDate;
  const creditLimit = req.body.creditLimit;
  const dueDate = req.body.dueDate;

  if
    (
    cardName === undefined ||
    cardBrand === undefined ||
    closeDate === undefined ||
    creditLimit === undefined ||
    dueDate === undefined
  ) {
    res.send({ msg: "Some variable is null, try again!", error: true, code: 1000 });
  } else if
    (
    cardName.length === 0 ||
    cardBrand.length === 0 ||
    closeDate.length === 0 ||
    creditLimit.length === 0 ||
    dueDate.length === 0
  ) {
    res.send({ msg: "Some variable is empty, try again!", error: true, code: 1000 });
  } else if (dueDate <= 0 || dueDate >= 32) {
    res.send({ msg: `DueDate cannot be ${dueDate}, it must to be between 1 and 31!`, error: true, code: 1000 });
  } else if (creditLimit < 0) {
    res.send({ msg: "Credit Limit cannot be negative!", error: true, code: 1000 })
  } else {
    const userQuery = `SELECT * from user WHERE id_user= ${idUser}`;
    const userResult = await databaseQuery(userQuery);

    if (userResult.length == 0) {
      res.send({ msg: `User (id: ${idUser} doesn't exist in database!)`, error: true, code: 1001 })
    } else {
      const insertCardQuery = `INSERT INTO credit_card (card_name, card_brand, close_date, credit_limit, due_date, id_user) 
                                VALUES ('${cardName}', '${cardBrand}', '${closeDate}', '${creditLimit}', '${dueDate}', '${idUser}')`;
      const insertCardResult = await databaseQuery(insertCardQuery);

      const credit = {
        cardName,
        cardBrand,
        closeDate,
        creditLimit,
        dueDate,
        idUser,
        "idCard": insertCardResult.insertId,
      };
      res.send(credit);
    }
  }
});

creditRouter.route("/getCard").post(async (req, res) => {
  const idUser = req.body.idUser;

  if (idUser === undefined)
    res.send({ msg: "idUser is null, try again!", error: true, code: 1000 });
  else {
    const query = `SELECT * FROM credit_card WHERE id_user = '${idUser}'`;
    const result = await databaseQuery(query);

    if (result.length == 0) {
      const userQuery = `SELECT * FROM user WHERE id_user = '${idUser}'`;
      const userResult = await databaseQuery(userQuery);

      let msg;
      if (userResult.length == 0) {
        msg = "This user doesn't exists in database!";
      } else {
        msg = "This user has no cards in database!";
      }

      res.send({ msg, error: true, code: 1001 });

    } else {
      res.send(result);
    }
  }
});

creditRouter.route("/insertBill").post(async (req, res) => {
  const idCard = req.body.idCard;
  const price = 0;
  const month = req.body.month;
  const year = req.body.year;
  const paid = 0; // 0 or 1
  const valuePaid = 0;

  const result = await insertBill(idCard, price, month, year, paid, valuePaid);
  res.send(result);
});

creditRouter.route("/getBill").post(async (req, res) => {
  const idCard = req.body.idCard;

  if (idCard === undefined)
    res.send({ msg: "idCard is null, try again!", error: true, code: 1000 });
  else {
    const query = `SELECT * FROM card_bill WHERE id_card=${idCard}`;
    const result = await databaseQuery(query);

    if (result.length == 0) {
      const cardQuery = `SELECT * FROM credit_card WHERE id_card=${idCard}`;
      const cardResult = await databaseQuery(cardQuery);

      let msg;
      if (cardResult.length == 0) {
        msg = "This card doesn't exists in database!";
      } else {
        msg = "This card has no bills in database!";
      }

      res.send({ msg, error: true, code: 1001 });
      // res.send({ msg: "This card doesn't have bill or doesn't exists, try to create one!", error: true, code: 1001 });
    } else
      res.send(result);
  }
});

creditRouter.route("/insertExpense").post(async (req, res) => {
  const idBill = req.body.idBill;
  const value = req.body.value;
  const date = req.body.date;
  const description = req.body.description;
  const recurringExpense = req.body.recurringExpense;
  const isInstallment = req.body.isInstallment;
  const numberTimes = req.body.numberTimes;
  const currentInstallment = 0;
  const idCategory = req.body.idCategory;

  const result = await insertExpense(
    idBill, value, date, description, recurringExpense, isInstallment, numberTimes, currentInstallment, idCategory
  );
  res.send(result);
});

creditRouter.route("/getExpense").post(async (req, res) => {
  const idBill = req.body.idBill;

  if (idBill === undefined)
    res.send({ msg: "idBill is null, try again!", error: true, code: 1000 });
  else {
    const selectExpense = `SELECT * FROM card_expense WHERE id_bill='${idBill}'`;
    const expense = await databaseQuery(selectExpense);

    if (expense.length == 0) {
      const selectBill = `SELECT * FROM card_bill WHERE id_bill='${idBill}'`;
      const bill = await databaseQuery(selectBill);

      let msg;
      if (bill.length == 0) {
        msg = "This bill doesn't exists in database!";
      } else {
        msg = "This bill has no expenses in database!";
      }

      res.send({ msg, error: true, code: 1001 });
    } else {
      res.send(expense);
    }
  }
})

creditRouter.route("/insertCategory").post(async (req, res) => {
  const category = req.body.category;

  if (category === undefined)
    res.send({ msg: "category is null, try again!", error: true, code: 1000 });
  else {
    const query = `INSERT INTO category (name_category) values ('${category}')`;
    const result = await databaseQuery(query);
    res.send(result);
  }
});

creditRouter.route("/getCategory").post(async (req, res) => {
  query = `SELECT * FROM category`
  result = await databaseQuery(query);

  res.send(result);
});

module.exports = creditRouter;