var express = require('express');
var router = express.Router();
const { ObjectId } = require("mongodb");
const { mongoDB, dbUrl, MongoClient } = require("../dbConfig");

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

router.put("/edituser/:id", async (req, res) => {
  const find = req.body.find;
  const replace = req.body.replace
  const body = req.body;
  let id = req.params.id;
  const client = await MongoClient.connect(dbUrl);
  try {
    let db = await client.db("nodemongoconnect");
    // let document = await db.collection("users").updateOne(find, { $set: replace });
    let document = await db.collection("users").findOneAndReplace({ _id:mongoDB.ObjectId(id)}, body);
    if (document.value) {
      res.send({
        message: "User Information updated successfully"
      });
    }
    else {
      res.status(404).send({
        message:"Invalid ID"
      })
    }
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

router.delete("/deleteUser/:id", async (req, res) => {
  const find = req.body;
  const client = await MongoClient.connect(dbUrl);
  try {
    let db = client.db("nodemongoconnect");
    // await db.collection("users").deleteOne(find);
    let document=await db.collection("users").findOneAndDelete({ _id: mongoDB.ObjectId(req.params.id) });
    if (document.value) {
      res.send({
        message: "User Deleted Successfully"
      }); 
    }
    else {
      res.send({
        message:"Invalid ID"
      })
    }
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
