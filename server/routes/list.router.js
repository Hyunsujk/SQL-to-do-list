// import/set express, router and pool
const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

// get the data from the database using the queryText,
// once the response is return, send the rows to frontend since data is stored in the rows
// if there is an error, console.log it
router.get("/", (req, res) => {
  const queryText = `SELECT * FROM "list" ORDER BY "id" ASC;`;
  pool
    .query(queryText)
    .then((responseDB) => {
      const dbRows = responseDB.rows;
      console.table(dbRows);
      res.send(dbRows);
    })
    .catch((err) => {
      console.log("Error:", err);
      res.sendStatus(500);
    });
});

// save the new data using  post.
// if it's successfully created, send status 201 which states created
// if there was an error, console.log it
router.post("/", (req, res) => {
  const dataSentFromClient = req.body;
  const queryText = `INSERT INTO "list" ("item","complete") VALUES ($1,$2);`;
  pool
    .query(queryText, [dataSentFromClient.item, dataSentFromClient.complete])
    .then((responseDB) => {
      console.log(responseDB);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("Error:", err);
      res.sendStatus(500);
    });
});

// delete the item for the id using the queryText,
// once it's deleted, send status 200 which states ok
// if there was an error, console.log it
router.delete("/:id", (req, res) => {
  const itemId = req.params.id;
  console.log(itemId);
  const queryText = `DELETE FROM "list" WHERE "id" = $1;`;

  pool
    .query(queryText, [itemId])
    .then((responseDB) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error:", err);
      res.sendStatus(500);
    });
});

// update the data for the id using put.
// once it's updated, send status 200
// if there was an error, console.log the error
router.put("/:id", (req, res) => {
  const itemId = req.params.id;
  const completedItem = req.body;
  const queryText = `UPDATE "list" SET "item"=$1, "complete"=$2 WHERE "id"=$3;`;
  pool
    .query(queryText, [completedItem.item, completedItem.complete, itemId])
    .then((responseDB) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error:", err);
      res.sendStatus(500);
    });
});

module.exports = router;
