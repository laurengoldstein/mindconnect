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
router.put("/:id", ensureUserExists, async function(req, res){
  let userID = Number(req.params.id);
  let {firstName, lastName, password, email, tracked_items_id} = req.body;
  try{
    await db(`UPDATE user SET firstName = '${firstName}', lastName = '${lastName}', password = '${password}', email ='${email}' WHERE id = ${userID};`)
    await db(`DELETE FROM tracked_items_user WHERE user_id = ${userID};`)
    for (let ti of tracked_items_id){
     await db(`INSERT INTO tracked_items_user (user_id, tracked_items_id) VALUES (${userID}, ${Number(ti)})`)
    }
    let result = await db(`SELECT u.*, t.*, u.id AS user_id, t.id AS tracked_items_id
    FROM user AS u
    LEFT JOIN tracked_items_user AS tu ON u.id = tu.user_id
    LEFT JOIN tracked_items AS t ON tu.tracked_items_id = t.id
    WHERE u.id = ${userID};`)
    let result2 = joinToJson(result)
    res.status(201).send(result2)
  } catch (err) {
    res.status(500).send({error: err.message});
  }
})

module.exports = router;
