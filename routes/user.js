var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");
const { ensureSameUser } = require("../middleware/guards");
const db = require("../model/helper.js");

/**
 * Helpers
 **/

function sendAllUsers(res) {
  db("SELECT * FROM user ORDER BY lastName, firstName;").then((result) =>
    res.send(result.data)
  );
}

function joinToJson(result) {
  let row0 = result.data[0];

  let tracked_items = [];
  if (row0.tracked_items_id) {
    tracked_items = result.data.map((ti) => ({
      id: ti.tracked_items_id,
      indicator: ti.indicator,
    }));
  }

  let user = {
    id: row0.user_id,
    firstName: row0.firstName,
    lastName: row0.lastName,
    password: row0.password,
    email: row0.email,
    tracked_items,
  };

  return user;
}

/* GET all users. */
router.get("/", async function (req, res) {
  try {
    sendAllUsers(res);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

/* GET user by id. */
/* Gets all user info from USER table + tracked items associated with that user from TRACKED_ITEMS table*/
router.get("/:id", ensureSameUser, function (req, res) {
  // let user = res.locals.user;
  let sql = `
            SELECT u.*, t.*, u.id AS user_id, t.id AS tracked_items_id
            FROM user AS u
            LEFT JOIN tracked_items_user AS tu ON u.id = tu.user_id
            LEFT JOIN tracked_items AS t ON tu.tracked_items_id = t.id
            WHERE u.id = ${req.params.id};
        `;
  db(sql)
    .then((result) => res.send(joinToJson(result)))
    .catch((err) => res.status(500).send({ error: err.message }));
});
//  ensureSameUser,
/* PUT - modify existing user */
router.put("/:id", async function (req, res) {
  console.log("REQ");
  let userID = Number(req.params.id);
  let { firstName, lastName, email, tracked_items_id } = req.body["input"];
  try {
    await db(
      `UPDATE user SET firstName = '${firstName}', lastName = '${lastName}', email ='${email}' WHERE id = ${userID};`
    );
    // Remove user from TRACKED_ITEMS_USER table
    await db(`DELETE FROM tracked_items_user WHERE user_id = ${userID};`);

    for (let ti of tracked_items_id) {
      // Lines below add each tracked item associated with the user to the TRACKED_ITEMS_USER table
      await db(
        `INSERT INTO tracked_items_user (user_id, tracked_items_id) VALUES (${userID}, ${Number(
          ti
        )})`
      );
    }
    let result =
      // Get all user info from USER table + tracked items associated with that user from TRACKED_ITEMS table
      await db(`SELECT u.*, t.*, u.id AS user_id, t.id AS tracked_items_id
        FROM user AS u
        LEFT JOIN tracked_items_user AS tu ON u.id = tu.user_id
        LEFT JOIN tracked_items AS t ON tu.tracked_items_id = t.id
        WHERE u.id = ${userID};`);
    // Helper function sends back a new object for that user
    let result2 = joinToJson(result);
    res.status(201).send(result2);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
