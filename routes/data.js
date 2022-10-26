var express = require('express');
var router = express.Router();
const db = require("../model/helper.js");

/*Optional filters for get function */
function makeWhereFromFilters(d) {
  let filters = [];

  //Filter by user ID
  if (d.user) {
      filters.push(`user_id = ${d.user}`);
  }

  // Filter by month
  if (d.month) {
    filters.push(`date LIKE '${d.month}%'`);
}
  // Return all filters joined by AND
  return filters.join(' AND ');
}


/* GET data with optional filters*/
router.get('/data', function(req,res,next) {
    let sql= 'SELECT * FROM data';
    let where = makeWhereFromFilters(req.query);
    if(where){
        sql += ` WHERE ${where};`;
        console.log(sql);
    }
    db(sql)
    .then(result => {
      res.send(result.data);
    })
    .catch(err => res.status(500).send(err));
});
    

/* POST new data */
router.post("/data", function(req, res, next){
    let {tracked_items_id, date, value, user_id} = req.body;
    db(
      `INSERT INTO data (tracked_items_id, date, value, user_id)
      VALUES (${tracked_items_id}, '${date}', ${value}, ${user_id});`
    )
    .then(() => {
      db("SELECT * FROM data;").then(result => 
        res.status(201).send(result.data)
        );
    })
    .catch(err => res.status(500).send({error: err.message}));
  });

module.exports = router;
