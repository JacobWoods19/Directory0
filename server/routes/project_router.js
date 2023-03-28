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
    try {
        // check req.body.name, req.body.description, req.body.url are not empty, or undefined
        if (req.body.name == undefined || req.body.description == undefined || req.body.url == undefined || req.body.tag == undefined) {
            res.json({ message: "Missing required fields" }, 400);
            return;
        }
        if (req.body.name == "" || req.body.description == "" || req.body.url == "" || req.body.tag == "") {
            res.json({ message: "Missing required fields" }, 400);
            return;
        }
        // check if url is valid
        if (!req.body.url.startsWith("http://") && !req.body.url.startsWith("https://")) {
            res.json({ message: "Invalid URL" }, 400);
            return;
        }
        const project = {
            name: req.body.name,
            description: req.body.description,
            url: req.body.url,
            upvotes: 0,
            published_date: new Date(),
            is_published: false,
            tag: req.body.tag,
        };
        const project_exists = await client.db("sources").collection('projects').find({ url: project.url }).find({is_published : true}).toArray();
        if (project_exists.length != 0) {
            res.json({ message: "Project already exists in database" }, 400);
            return;
        }
        const result = await client.db("sources").collection('projects').insertOne(project);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error" }, 500);
    }
});
router.get('/', async (req, res) => {
    try {
        const results = await client.db("sources").collection('projects').find({is_published: true }).toArray();
        res.json(results);
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error" }, 500);
    }
});
//project search
router.get('/search', async (req, res) => {
    try {
        const tag_input = req.query.tag;
        var results = await client.db("sources").collection('projects').find({ tag: tag_input, is_published: true  }).sort({ upvotes: -1 }).toArray()
        results = results.slice(0, 7);
        res.json(results);
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error" }, 500);
    }
});
router.get('/sorted', async (req, res) => {
    try {
        var results = await client.db("sources").collection('projects').find({is_published: true }).sort({ upvotes: -1 }).toArray()
        results = results.slice(0, 7);
        res.json(results);
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error" }, 500);
    }
});
router.get('/search/new', async (req, res) => {
    try{
    const limit = parseInt(req.query.limit) || 10; // default limit to 10 if not specified
    const page = parseInt(req.query.page) || 1; // default page to 1 if not specified
    const skip = (page - 1) * limit;
    const query = { tag: req.query.tag, is_published: true  };
    const results = await client.db("sources").collection('projects')
        .find(query)
        .sort({ published_date: -1 })
        .skip(skip)
        .limit(limit) // limit to 10 results
        .toArray();

    res.json({ results });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error" }, 500);
    }
});
router.get('/unpublished', async (req, res) => {
    try {
        if (req.query.password != "averysecurepassword") {
            res.json({ message: "Invalid password" }, 400);
            return;
        }
        const results = await client.db("sources").collection('projects').find({ is_published: false }).toArray();
        res.json(results);
    }
    catch (err) {
        console.log(err);
        res.json({ message: "Internal server error" }, 500);
    }
});
router.post('/publish', jsonParser, async (req, res) => {
    try {
        if (req.query.password != "averysecurepassword") {
            res.json({ message: "Invalid password" }, 400);
            return;
        }
        const result = await client.db("sources").collection('projects').updateOne({ _id: new ObjectId(req.query.id) }, { $set: { is_published: true } });
        if (result.modifiedCount == 0) {
            res.json({ message: "Project not found" }, 404);
            return;
        }
        res.json(result);
    }
    catch (err) {
        console.log(err);
        res.json({ message: "Internal server error" }, 500);
    }
});
router.post('/delete', jsonParser, async (req, res) => {
    try {
        if (req.query.password != "averysecurepassword") {
            res.json({ message: "Invalid password" }, 400);
            return;
        }
        const result = await client.db("sources").collection('projects').deleteOne({ _id: new ObjectId(req.query.id) });
        res.json(result);
    }
    catch (err) {
        console.log(err);
        res.json({ message: "Internal server error" }, 500);
    }
});
module.exports = router;
