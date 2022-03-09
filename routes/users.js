var express = require('express');
var router = express.Router();
const { mongoDb, dbUrl, MongoClient } = require("../dbConfig");

/* GET users listing. */
router.get('/',async function(req, res, next) {
  const client = await MongoClient.connect(dbUrl);
  try {
    let db =await client.db("nodemongoconnect");
    let document =await db.collection("users").find().toArray();
    res.status(200).send({
      data: document,
      message:"Success"
    })
  }
  catch (err) {
    console.log(err);
    res.send({
      message:"Internal Server Error"
    })
  }
  finally {
    client.close();
  }

});

router.post("/register", async(req, res) => {
  const client = await MongoClient.connect(dbUrl);
  try {
    let db = await client.db("nodemongoconnect");
    let document = await db.collection("users").insertOne(req.body);

    res.send({ message: "User added Successfully" });
  }
  catch (err) {
    console.log(err);
    res.send({ message: "Internal server Error !" });
  }
  finally {
    client.close();
  }
})

router.put("/edituser", async (req, res) => {
  const find = req.body.find;
  const replace=req.body.replace
  const client = await MongoClient.connect(dbUrl);
  try {
    let db = await client.db("nodemongoconnect");
    let document = await db.collection("users").updateOne(find, { $set: replace });
    res.send({
      message: "User Information updated successfully"
    });
  }
  catch (err) {
    console.log(err);
    res.send({
      message:"Internal Server Error"
    })
  }
  finally {
    client.close();
  }
})

router.delete("/deleteUser", async (req, res) => {
  const find = req.body;
  const client = await MongoClient.connect(dbUrl);
  try {
    let db = client.db("nodemongoconnect");
    await db.collection("users").deleteOne(find);
    res.send({
      message: "User Deleted Successfully"
    })
  }
  catch (err) {
    console.log(err);
    res.send({
      message: "Internal Server Error"
    })
  }
  finally {
    client.close();
  }
})

module.exports = router;
