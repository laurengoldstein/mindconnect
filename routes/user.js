var express = require('express');
var router = express.Router();
const db = require("../model/helper.js");



/* GET all users. */
router.get('/', function(req, res, next) {
  db('SELECT * FROM user;')
    .then(result => {
      res.send(result.data);
    })
    .catch(err => res.status(500).send(err));
});

/* GET user by id. */
router.get("/:id", function(req, res, next){
  let userID = req.params.id;
  db(`SELECT * FROM user WHERE id = ${userID};`)
  .then(result => {
    if(!result.data.length) {
      res.status(404).send({error: "User not found"});
    } else {
      res.send(result.data);
    }
  })
  .catch(err => res.status(500).send({error: err.message}));
});

/* POST new user */
router.post("/", function(req, res, next){
  let {firstName, lastName, indicator_id, password, email} = req.body;
  db(
    `INSERT INTO user (firstName, lastName, indicator_id, password, email)
    VALUES ('${firstName}', '${lastName}', ${indicator_id}, '${password}', '${email}');`
  )
  .then(() => {
    db("SELECT * FROM user;").then(result => 
      res.status(201).send(result.data)
      );
  })
  .catch(err => res.status(500).send({error: err.message}));
});

/* PUT - modify existing user */
router.put("/:id", function(req, res, next){
  let userID = req.params.id;
  let {firstName, lastName, indicator_id, password, email} = req.body;
  db(`SELECT * FROM user WHERE id = ${userID};`)
  .then((result) => {
    if(!result.data.length){
      result.status(404).send({error: 'User not found'});
    } else {
      db(`UPDATE user SET firstName = '${firstName}', lastName = '${lastName}', indicator_id = ${indicator_id}, password = '${password}', email ='${email}' WHERE id = '${userID}';`)
      .then(()=> {
        db('SELECT * FROM user;')
        .then((result) => res.send(result.data))
      })
    .catch(err => res.status(500).send({error: err.message}))
  }})
});


module.exports = router;
