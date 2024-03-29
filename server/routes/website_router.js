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
    try {
        if (req.body.name == undefined || req.body.description == undefined || req.body.url == undefined || req.body.tag == undefined) {
            res.json({ message: "Missing required fields" }, 400);
            return;
        }
        if (req.body.name == "" || req.body.description == "" || req.body.url == "") {
            res.json({ message: "Missing required fields" }, 400);
            return;
        }
        // check if url is valid
        if (!req.body.url.startsWith("http://") && !req.body.url.startsWith("https://")) {
            res.json({ message: "Invalid URL" }, 400);
            return;
        }
        const website = {
            name: req.body.name,
            description: req.body.description,
            url: req.body.url,
            upvotes: 0,
            published_date: new Date(),
            is_published: false,
            tag: req.body.tag,
        };
        const website_exists = await client.db("sources").collection('websites').find({ url: website.url }).toArray();
        if (website_exists.length != 0) {
            res.json({ message: "Website already exists in database" }, 400);
            return;
        }
        const result = await client.db("sources").collection('websites').insertOne(website);
        res.json(result);
    }
    catch (err) {
        res.json({ message: "Error" }, 400);
        return;
    }
});
//get all websites... sort by upvotes
router.get('/', async (req, res) => {
    try {
        const results = await client.db("sources").collection('websites').find().toArray();
        res.json(results);
    }
    catch (err) {
        res.json({ message: "Error" }, 400);
        return;
    }
});
//get all websites... sort by upvotes
router.get('/sorted', async (req, res) => {
    try {
        var results = await client.db("sources").collection('websites').find().sort({ upvotes: -1 }).toArray()
        // limit the number of results to 10 
        results = results.slice(0, 7);
        res.json(results);
    }
    catch (err) {
        res.json({ message: "Error" }, 400);
        return;
    }
});
router.get('/search', async (req, res) => {
    try {
        const tag_input = req.query.tag;
        var results = await client.db("sources").collection('websites').find({ tag: tag_input }).sort({ upvotes: -1 }).toArray()
        results = results.slice(0, 7);
        res.json(results);
    }
    catch (err) {
        res.json({ message: "Error" }, 400);
        return;
    }
});
//Search by tag name , checks if tag name is in the tags array of document
router.get('/search/new', async (req, res) => {
    try {
    const limit = parseInt(req.query.limit) || 10; // default limit to 10 if not specified
    const page = parseInt(req.query.page) || 1; // default page to 1 if not specified
    const skip = (page - 1) * limit;

    const query = { tag: req.query.tag };

    const results = await client.db("sources").collection('websites')
        .find(query)
        .sort({ published_date: -1 })
        .skip(skip)
        .limit(limit)
        .toArray();

    res.json({ results });
    }
    catch (err) {
        res.json({ message: "Error" }, 400);
        return;
    }
    
});

//insert website into database
router.post("/", jsonParser, async (req, res) => {
    try {
        // check req.body.name, req.body.description, req.body.url are not empty, or undefined
        if (req.body.name == undefined || req.body.description == undefined || req.body.url == undefined || req.body.tag == undefined) {
            res.json({ message: "Missing required fields" }, 400);
            return;
        }
        if (req.body.name == "" || req.body.description == "" || req.body.url == "") {
            res.json({ message: "Missing required fields" }, 400);
            return;
        }
        // check if url is valid
        if (!req.body.url.startsWith("http://") && !req.body.url.startsWith("https://")) {
            res.json({ message: "Invalid URL" }, 400);
            return;
        }
        const website = {
            name: req.body.name,
            description: req.body.description,
            url: req.body.url,
            upvotes: 0,
            published_date: new Date(),
            is_published: true,
            tag: req.body.tag,
        };
        const website_exists = await client.db("sources").collection('websites').find({ url: website.url }).toArray();
        if (website_exists.length != 0) {
            res.json({ message: "Website already exists in database" }, 400);
            return;
        }
        const result = await client.db("sources").collection('websites').insertOne(website);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error" }, 500);
    }
});
//get all websites... sort by upvotes
router.get('/', async (req, res) => {
    try {
        const results = await client.db("sources").collection('websites').find().toArray();
        res.json(results);
    }
    catch (err) {
        console.log(err);
        res.json({ message: "Internal server error" }, 500);
    }
});
//get all websites... sort by upvotes
router.get('/sorted', async (req, res) => {
    try {
        var results = await client.db("sources").collection('websites').find().sort({ upvotes: -1 }).toArray()
        // limit the number of results to 10 
        results = results.slice(0, 7);
        res.json(results);
    }
    catch (err) {
        console.log(err);
        res.json({ message: "Internal server error" }, 500);
    }

});
//Search by tag name , checks if tag name is in the tags array of document
router.get('/search/new', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10; // default limit to 10 if not specified
        const page = parseInt(req.query.page) || 1; // default page to 1 if not specified
        const skip = (page - 1) * limit;

        const query = { tag: req.query.tag };

        const results = await client.db("sources").collection('websites')
            .find(query)
            .sort({ published_date: -1 })
            .skip(skip)
            .limit(limit)
            .toArray();

        res.json({ results, totalPages });
    }
    catch (err) {
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
        const results = await client.db("sources").collection('websites').find({ is_published: false }).toArray();
        res.json(results);
    }
    catch (err) {
        console.log(err);
        res.json({ message: "Internal server error" }, 500);
    }
});
//allow admin to publish a website
router.post('/publish', jsonParser, async (req, res) => {
    try {
        if (req.query.password != "averysecurepassword") {
            res.json({ message: "Invalid password" }, 400);
            return;
        }
        const result = await client.db("sources").collection('websites').updateOne({ _id: new ObjectId(req.query.id) }, { $set: { is_published: true } });
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
        const result = await client.db("sources").collection('websites').deleteOne({ _id: new ObjectId(req.query.id) });
        res.json(result);
    }
    catch (err) {
        console.log(err);
        res.json({ message: "Internal server error" }, 500);
    }
});






module.exports = router;
