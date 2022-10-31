var express = require('express');
var router = express.Router();
const db = require("../model/helper.js");

/**
 * Guards
 **/

function ensureUserExists(req,res,next) {
  db(`SELECT * FROM user WHERE id = ${req.params.id};`)
  .then((result) => {
    if(result.data.length ===1){
      res.locals.user = result.data[0];
      next();
    } else {
      res.status(404).send({error: 'User not found'});
    }
  })
  .catch((err)=>{res.status(500).send({error: err.message})});
}

/**
 * Helpers
 **/

function sendAllUsers(res) {
  db('SELECT * FROM user ORDER BY lastName, firstName;')
  .then(result => res.send(result.data));
}

function joinToJson(result){
  let row0 = result.data[0];
  

  let tracked_items = [];
  if(row0.tracked_items_id){
    tracked_items = result.data.map(ti => ({
      id: ti.tracked_items_id,
      indicator: ti.indicator
    }));
  };

  let user = {
    id: row0.user_id,
    firstName: row0.firstName,
    lastName: row0.lastName,
    password: row0.password,
    email: row0.email,
    tracked_items
  };

  return user;

}


/* GET all users. */
router.get('/', async function(req, res) {
  try {
    sendAllUsers(res);    
  } catch(err) {
    res.status(500).send({error: err.message});
  }
});

/* GET user by id. */
router.get("/:id", ensureUserExists, function(req, res){
  let user = res.locals.user;
  let sql = `
            SELECT u.*, t.*, u.id AS user_id, t.id AS tracked_items_id
            FROM user AS u
            LEFT JOIN tracked_items_user AS tu ON u.id = tu.user_id
            LEFT JOIN tracked_items AS t ON tu.tracked_items_id = t.id
            WHERE u.id = ${user.id};
        `;
  db(sql)
  .then((result) => res.send(joinToJson(result)))
  .catch(err => res.status(500).send({error: err.message}));
});

/* POST new user */
// router.post("/", function(req, res){
//   let {firstName, lastName, password, email, tracked_items_id} = req.body;
  
//   let sql=`INSERT INTO user (firstName, lastName, password, email)
//     VALUES ('${firstName}', '${lastName}', '${password}', '${email}');
//     SELECT LAST_INSERT_ID();`
  
//   db(sql)
//   .then((result) => {
//     let userId = result.data[0].insertId;
//     if (tracked_items_id && tracked_items_id.length){
//       let vals = [];
//       for(let ti_ID of tracked_items_id){
//         vals.push(`(${userId}, ${ti_ID}`);
//       }
//       let sql = `
//                 INSERT INTO tracked_items_user (user_id, tracked_items_id)
//                 VALUES ${vals.join(',')}`;
//             console.log(sql)
//             db(sql)
//             .then(() =>  { 
//               res.status(201);
//               sendAllUsers(res);})
//             .catch(err => res.status(500).send({error: err.message}));
//     }  
// })
//   .catch(err => res.status(500).send({error: err.message}));
// });

router.post("/", async function(req, res){
 let {firstName, lastName, password, email, tracked_items_id} = req.body;
 
 let sql=`INSERT INTO user (firstName, lastName, password, email)
      VALUES ('${firstName}', '${lastName}', '${password}', '${email}');
      SELECT LAST_INSERT_ID();`

try {
  let results = await db(sql);
  let userId = results.data[0].insertId;
    if (tracked_items_id && tracked_items_id.length){
      let vals = [];
      for(let ti_ID of tracked_items_id){
        vals.push(`(${userId}, ${ti_ID}`);
      }
      let sql = `
          INSERT INTO tracked_items_user (user_id, tracked_items_id)
          VALUES ${vals.join(',')}`;
      await db(sql);
    }
    res.status(201);
    sendAllUsers(res);
  } catch (err) {
    res.status(500).send({ error: err.message });  
}
});

/* PUT - modify existing user */
router.put("/:id", ensureUserExists, function(req, res){
  let userID = req.params.id;
  let {firstName, lastName, password, email, tracked_items_id} = req.body;
  db(`SELECT * FROM user WHERE id = ${userID};`)
  .then((result) => {
    if(!result.data.length){
      result.status(404).send({error: 'User not found'});
    } else {
      db(`UPDATE user SET firstName = '${firstName}', lastName = '${lastName}', password = '${password}', email ='${email}' WHERE id = '${userID}';`)
      .then(()=> {
        db(`SELECT * FROM user WHERE id = ${userID};`)
        .then((result) => res.send(result.data[0]))
      })
    .catch(err => res.status(500).send({error: err.message}))
  }})
//Delete traacked_items_user for user_id = id
//For loop for each tracked item - insert into tracked items user
});


module.exports = router;
