var express = require("express");
var router = express.Router();
const { ensureSameUser, ensureUserLoggedIn } = require("../middleware/guards");
const db = require("../model/helper.js");

/* GET all tracked_items. */
router.get("/tracked_items", function (req, res, next) {
  db("SELECT * FROM tracked_items;")
    .then((result) => res.send(result.data))
    .catch((err) => res.status(500).send({ error: err.message }));
});

module.exports = router;

/* POST new tracked_item. */
router.post("/tracked_items", function (req, res, next) {
  let { indicator, user_id } = req.body;
  db(
    `INSERT INTO tracked_items (indicator) VALUES ('${indicator}'); SELECT LAST_INSERT_ID();`
  )
    .then((data) => {
      db(
        `INSERT INTO tracked_items_user (user_id, tracked_items_id) VALUES (${user_id}, ${data.data[0].insertId});`
      );
    })
    .then(() => {
      db(
        `SELECT * FROM tracked_items LEFT JOIN tracked_items_user ON tracked_items_user.tracked_items_id=tracked_items.id WHERE user_id=${user_id};`
      ).then((result) => res.status(201).send(result.data));
    })
    .catch((err) => res.status(500).send({ error: err.message }));
});
