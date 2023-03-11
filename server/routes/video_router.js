var express = require('express');
const { MongoClient, ObjectId } = require("mongodb");
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
    let client = new MongoClient("mongodb+srv://doadmin:FG3hx582n9oH1b06@db-mongodb-nyc1-63759-f32d7869.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=db-mongodb-nyc1-63759", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });


    // add youtube video
    router.post("/", jsonParser, async (req, res) => {
        // check req.body.name, req.body.description, req.body.url are not empty, or undefined
        if (req.body.title == undefined || req.body.url == undefined || req.body.tag== undefined) {
            res.json({message: "Missing required fields"}, 400);
            return;
        }
        if (req.body.title == "" || req.body.url == "" || req.body.tags == []) {
            res.json({message: "Missing required fields"}, 400);
            return;
        }
        // check if url is valid, make sure it is a youtube video
        if (!req.body.url.startsWith("http://") && !req.body.url.startsWith("https://") && (!req.body.url.includes("youtube.com") || !req.body.url.includes("youtu.be")) ) {
            res.json({message: "Invalid URL"}, 400);
            return;
        }
        const youtube = {
            title: req.body.title,
            description: req.body.description,
            url: req.body.url,
            channel: req.body.channel,
            upvotes: 0,
            published_date: new Date(),
            is_published: true,
            tag: req.body.tag,
        };
        const youtube_exists = await client.db("sources").collection('videos').find({url: youtube.url}).toArray();
        if (youtube_exists.length != 0) {
            res.json({message: "Youtube video already exists in database"}, 400);
            return;
        }
        const result = await client.db("sources").collection('videos').insertOne(youtube);
        res.json(result);
    });
    router.get('/', async (req, res) => {
        const results = await client.db("sources").collection('videos').find().toArray();
        res.json(results);
    });
    router.get('/search', async (req, res) => {
        const tag = req.query.tag;
        console.log("Video Search " + tag)
        const results = await client.db("sources").collection('videos').find({tag: tag}).toArray()

        console.log("Video Search Results" + results)
        res.json(results);
    });
    router.get('/sorted', async (req, res) => {
        var results = await client.db("sources").collection('videos').find().sort({upvotes: -1}).toArray()
        results = results.slice(0, 10);
        res.json(results);
    });

module.exports = router;
