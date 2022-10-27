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

function joinToJson(result){
let finalData = [];

  for(let i=0; i<=result.data.length; i++) {
  let row0 = result.data[i];
  

  console.log(row0);

  let tracked_items = [];
  if(row0.tracked_items_id){
    tracked_items = result.data.map(ti => ({
      id: ti.tracked_items_id,
      indicator: ti.indicator,
      value: ti.value,
    }));
  };

  let data = {
    id: row0.id,
    date: row0.date,
    user_id: row0.user_id,
    tracked_items
  };
  finalData.push(data)
  console.log(finalData);
  };


return finalData
}

/* GET data with optional filters*/
router.get('/data', function(req,res,next) {
  let sql = `
            SELECT data.*, tracked_items.*  
            FROM data 
            LEFT JOIN tracked_items ON data.tracked_items_id = tracked_items.id
          `;
    let where = makeWhereFromFilters(req.query);
    if(where){
        sql += ` WHERE ${where} 
        ORDER BY data.date;`;
    }
    db(sql)
    .then(result => {
      // res.send(joinToJson(result));
      res.send(result.data)
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
