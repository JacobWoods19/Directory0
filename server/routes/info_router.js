var express = require('express');
const { MongoClient, ObjectId } = require("mongodb");
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
    let client = new MongoClient("mongodb+srv://doadmin:FG3hx582n9oH1b06@db-mongodb-nyc1-63759-f32d7869.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=db-mongodb-nyc1-63759", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    //insert website into database
    router.post("/", jsonParser, async (req, res) => {
        try{
        // check req.body.name, req.body.description, req.body.url are not empty, or undefined
        if (req.body.language == undefined || req.body.description == undefined || req.body.image_url == undefined)  { 
            res.json({message: "Missing required fields"}, 400);
            return;
        }
        if (req.body.language == "" || req.body.description == "" || req.body.image_url == "") {
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
    } catch (err) {
        console.log(err);
        res.json({message: "Internal server error"}, 500);
    }
    });
    router.get('/search', async (req, res) => {
        try{
        var language = req.query.tag;
        var results = await client.db("sources").collection('information').find({language : language }).sort({upvotes: -1}).toArray()
        if (results.length == 0) {
            res.json({message: "No results found"}, 400);
            return;
        }
        res.json(results);
    }
    catch (err) {
        console.log(err);
        res.json({message: "Internal server error"}, 500);
    }   
    });

module.exports = router;