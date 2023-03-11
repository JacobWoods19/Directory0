var express = require('express');
const { MongoClient, ObjectId } = require("mongodb");
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
    let client = new MongoClient("mongodb+srv://doadmin:FG3hx582n9oH1b06@db-mongodb-nyc1-63759-f32d7869.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=db-mongodb-nyc1-63759", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    //Validate account 
    router.post("/", jsonParser, async (req, res) => {
        // check req.body.name, req.body.description, req.body.url are not empty, or undefined
        if (req.body.name == undefined || req.body.description == undefined || req.body.url == undefined || req.body.tag == undefined) {
            res.json({message: "Missing required fields"}, 400);
            return;
        }
        if (req.body.name == "" || req.body.description == "" || req.body.url == "" || req.body.tag == "") {
            res.json({message: "Missing required fields"}, 400);
            return;
        }
        // check if url is valid
        if (!req.body.url.startsWith("http://") && !req.body.url.startsWith("https://")) {
            res.json({message: "Invalid URL"}, 400);
            return;
        }
        const project = {
            name: req.body.name,
            description: req.body.description,
            url: req.body.url,
            upvotes: 0,
            published_date: new Date(),
            is_published: true,
            tag: req.body.tag,
        };
        const project_exists = await client.db("sources").collection('projects').find({url: project.url}).toArray();
        if (project_exists.length != 0) {
            res.json({message: "Project already exists in database"}, 400);
            return;
        }
        const result = await client.db("sources").collection('projects').insertOne(project);
        res.json(result);
    });
    router.get('/', async (req, res) => {
        const results = await client.db("sources").collection('projects').find().toArray();

        res.json(results);
    });
    //project search
    router.get('/search', async (req, res) => {
        const tag_input = req.query.tag;
        var results = await client.db("sources").collection('projects').find({tag: tag_input}).sort({upvotes: -1}).toArray()
        results = results.slice(0, 7);
        res.json(results);
    });
    router.get('/sorted', async (req, res) => {
        var results = await client.db("sources").collection('projects').find().sort({upvotes: -1}).toArray()
        results = results.slice(0, 7);
        res.json(results);
    });
    router.get('/search/new', async (req, res) => {
        const results = await client.db("sources").collection('projects').find({tag: req.query.tag}).sort({published_date: -1}).toArray();
        res.json(results);
    });

module.exports = router;
