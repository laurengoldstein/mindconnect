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
  //Filter by date
  if (d.date) {
    filters.push(`date LIKE '${d.date}%'`);
  }
  // Return all filters joined by AND
  return filters.join(' AND ');
}

function joinToJson(result) {
  let rows = result.data;

  // Special case! No indicators found
  if (rows.length === 0) {
    return [];
  }

  // Array to store completed dayObjs
  let days = [];  

  // Create first dayObj with first indicator
  let row0 = rows.shift();
  let dayObj = {
    date: row0.date.toDateString(),
    [row0.indicator]: row0.value
  }

  // Loop over the rest of the rows
  for (let row of rows) {
    // Convert date obj to string
    let dateStr = row.date.toDateString();
    if (dayObj.date === dateStr) {
      // Same day... add another indicator
      dayObj[row.indicator] = row.value;
    } else {
      // New day... push dayObj and create new one
      days.push(dayObj);
      dayObj = {
        date: dateStr,
        [row.indicator]: row.value
      };
    }
  }

  // Push last dayObj
  days.push(dayObj);

  return days;
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
      res.send(joinToJson(result));
    })
    .catch(err => res.status(500).send(err));
});
    

/* POST new data */
router.post("/data", function(req, res, next){
    let {tracked_obj, user_id} = req.body;
    //Check how many tracked_items_id and reapeat db x counter
    for(let ti in tracked_obj){
      db(
        `INSERT INTO data (tracked_items_id, value, user_id)
        VALUES (${tracked_obj[ti].tracked_items_id}, ${tracked_obj[ti].value}, ${user_id});`
      )
      .catch(err => res.status(500).send({error: err.message}))
    }
        db(`SELECT data.*, tracked_items.*  
        FROM data 
        LEFT JOIN tracked_items ON data.tracked_items_id = tracked_items.id WHERE user_id = ${user_id};`)
        .then(result => 
          res.status(201).send(joinToJson(result))
          )
      .catch(err => res.status(500).send({error: err.message}));
  });

module.exports = router;
