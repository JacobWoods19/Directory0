var express = require('express');
const { MongoClient, ObjectId } = require("mongodb");
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
    let client = new MongoClient("mongodb+srv://doadmin:6SK073Fneg2E189s@db-mongodb-nyc1-63759-f32d7869.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=db-mongodb-nyc1-63759", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    //insert website into database
    router.post("/", jsonParser, async (req, res) => {
        // check req.body.name, req.body.description, req.body.url are not empty, or undefined
        if (req.body.language == undefined || req.body.description == undefined || req.body.image_url == undefined)  { 
            res.json({message: "Missing required fields"}, 400);
            return;
        }
        if (req.body.name == "" || req.body.description == "" || req.body.url == "") {
            res.json({message: "Missing required fields"}, 400);
            return;
        }
        const info = {
            language: req.body.language,
            description: req.body.description,
            image_url: req.body.image_url
        };
        const info_exists = await client.db("sources").collection('information').find({url: info.language}).toArray();
        if (info_exists.length != 0) {
            res.json({message: "Info already exists in database"}, 400);
            return;
        }
        const result = await client.db("sources").collection('information').insertOne(info);
        res.json(result);
    });
    router.get('/search', async (req, res) => {
        var language = req.query.tag;
        var results = await client.db("sources").collection('information').find({language : language }).sort({upvotes: -1}).toArray()
        // limit the number of results to 10
        results = results.slice(0, 7);
        res.json(results);
    });

module.exports = router;