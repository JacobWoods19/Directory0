var express = require('express');
const { MongoClient, ObjectId } = require("mongodb");
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
let client = new MongoClient("mongodb+srv://doadmin:FG3hx582n9oH1b06@db-mongodb-nyc1-63759-f32d7869.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=db-mongodb-nyc1-63759", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
///api/communities
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
        const community = {
            name: req.body.name,
            description: req.body.description,
            url: req.body.url,
            upvotes: 0,
            published_date: new Date(),
            is_published: true,
            tag: req.body.tag,
        };
        const community_exists = await client.db("sources").collection('communities').find({ url: community.url }).toArray();
        if (community_exists.length != 0) {
            res.json({ message: "Project already exists in database" }, 400);
            return;
        }
        const result = await client.db("sources").collection('communities').insertOne(community);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error" }, 500);
    }
});
router.get('/', async (req, res) => {
    try {
        const results = await client.db("sources").collection('communities').find({ tag: "starred" }).toArray();
        res.json(results);
    }
    catch (err) {
        console.log(err);
        res.json({ message: "Internal server error" }, 500);
    }
});
router.get('/search', async (req, res) => {
    try {
        const results = await client.db("sources").collection('communities').find({ tag: req.query.tag }).toArray();
        res.json(results);
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error" }, 500);
    }
});
// get newest posted communities given a search term
router.get('/search/new', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10; // default limit to 10 if not specified
        const page = parseInt(req.query.page) || 1; // default page to 1 if not specified
        const skip = (page - 1) * limit;

        const query = { tag: req.query.tag };
        const count = await client.db("sources").collection('communities').countDocuments(query);
        const totalPages = Math.ceil(count / limit);

        const results = await client.db("sources").collection('communities')
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

module.exports = router;
