var express = require("express");
var app = express();
const cheerio = require("cheerio");
const cors = require('cors');
const { MongoClient } = require("mongodb");
const port = 8000;
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
let client = new MongoClient("mongodb+srv://doadmin:6SK073Fneg2E189s@db-mongodb-nyc1-63759-f32d7869.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=db-mongodb-nyc1-63759", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// app.use(cors({
//     origin: 'http://example.com'
//   }));
async function run() {

    await client.connect();

    console.log("Connected correctly to server");
    app.use(cors());
    app.use(cors({
        origin: '*'
    }));
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
        });
    //insert website into database
    app.post("/api/website", jsonParser, async (req, res) => {
        // check req.body.name, req.body.description, req.body.url are not empty, or undefined
        if (req.body.name == undefined || req.body.description == undefined || req.body.url == undefined || req.body.tag == undefined) {
            
            res.json({message: "Missing required fields"}, 400);
            return;
        }
        if (req.body.name == "" || req.body.description == "" || req.body.url == "") {
            res.json({message: "Missing required fields"}, 400);
            return;
        }
        // check if url is valid
        if (!req.body.url.startsWith("http://") && !req.body.url.startsWith("https://")) {
            res.json({message: "Invalid URL"}, 400);
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
        const website_exists = await client.db("sources").collection('websites').find({url: website.url}).toArray();
        if (website_exists.length != 0) {
            res.json({message: "Website already exists in database"}, 400);
            return;
        }
        const result = await client.db("sources").collection('websites').insertOne(website);
        res.json(result);
    });
    //get all websites... sort by upvotes
    app.get('/api/websites', async (req, res) => {
        const results = await client.db("sources").collection('websites').find().toArray();
        res.json(results);
    });
    //get all websites... sort by upvotes
    app.get('/api/websites/sorted', async (req, res) => {
        var results = await client.db("sources").collection('websites').find().sort({upvotes: -1}).toArray()
        // limit the number of results to 10 
        results = results.slice(0, 7);
        res.json(results);
    });
    //Search by tag name , checks if tag name is in the tags array of document
    app.get('/api/websites/search', async (req, res) => {
        var tag_input = req.query.tag;
        console.log("Search " + tag_input)
        var results = await client.db("sources").collection('websites').find({tag: tag_input }).sort({upvotes: -1}).toArray()
        // limit the number of results to 10
        results = results.slice(0, 7);

        res.json(results);
    });
    // add youtube video
    app.post("/api/youtube", jsonParser, async (req, res) => {
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
    app.get('/api/videos', async (req, res) => {
        const results = await client.db("sources").collection('videos').find().toArray();
        res.json(results);
    });
    app.get('/api/videos/search', async (req, res) => {
        const tag = req.query.tag;
        console.log("Video Search " + tag)
        const results = await client.db("sources").collection('videos').find({tag: tag}).toArray()

        console.log("Video Search Results" + results)
        res.json(results);
    });
    app.get('/api/videos/sorted', async (req, res) => {
        var results = await client.db("sources").collection('videos').find().sort({upvotes: -1}).toArray()
        results = results.slice(0, 10);
        res.json(results);
    });
    app.post("/api/course", jsonParser, async (req, res) => {
        // check req.body.name, req.body.description, req.body.url are not empty, or undefined
        if (req.body.name == undefined || req.body.description == undefined || req.body.url == undefined || req.body.price == undefined || req.body.tag == undefined) {
            
            res.json({message: "Missing required fields"}, 400);
            return;
        }
        if (req.body.name == "" || req.body.description == "" || req.body.url == "" || req.body.url == "") {
            res.json({message: "Missing required fields"}, 400);
            return;
        }
        // check if url is valid
        if (!req.body.url.startsWith("http://") && !req.body.url.startsWith("https://")) {
            res.json({message: "Invalid URL"}, 400);
            return;
        }
        const course = {
            name: req.body.name,
            description: req.body.description,
            url: req.body.url,
            upvotes: 0,
            published_date: new Date(),
            is_published: true,
            tag: req.body.tag,
        };
        const course_exists = await client.db("sources").collection('courses').find({url: course.url}).toArray();
        if (course_exists.length != 0) {
            res.json({message: "Course already exists in database"}, 400);
            return;
        }
        const result = await client.db("sources").collection('courses').insertOne(course);
        res.json(result);
    });
    app.get('/api/courses', async (req, res) => {
        const results = await client.db("sources").collection('courses').find().toArray();
        res.json(results);
    });
    //course search
    app.get('/api/courses/search', async (req, res) => {
        const tag_input = req.query.tag;
        var results = await client.db("sources").collection('courses').find({tag: tag_input}).toArray()
        results = results.slice(0, 7);
        res.json(results);
    });
    app.get('/api/courses/sorted', async (req, res) => {
        const results = await client.db("sources").collection('courses').find().sort({upvotes: -1}).toArray()
        res.json(results);
    });
    app.post("/api/projects", jsonParser, async (req, res) => {
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
    app.get('/api/projects', async (req, res) => {
        const results = await client.db("sources").collection('projects').find().toArray();

        res.json(results);
    });
    //project search
    app.get('/api/projects/search', async (req, res) => {
        const tag_input = req.query.tag;
        var results = await client.db("sources").collection('projects').find({tag: tag_input}).sort({upvotes: -1}).toArray()
        results = results.slice(0, 7);
        res.json(results);
    });
    app.get('/api/projects/sorted', async (req, res) => {
        var results = await client.db("sources").collection('projects').find().sort({upvotes: -1}).toArray()
        results = results.slice(0, 7);
        res.json(results);
    });

    app.get('/api/general', async (req, res) => {
        const results = await client.db("sources").collection('general').find().toArray();
        res.json(results);
    });
    app.post("/api/general", jsonParser, async (req, res) => {
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
        const general = {
            name: req.body.name,
            description: req.body.description,
            url: req.body.url,
            upvotes: 0,
            published_date: new Date(),
            is_published: true,
            tag: req.body.tag,
        };
        const general_exists = await client.db("sources").collection('general').find({url: general.url}).toArray();
        if (general_exists.length != 0) {
            res.json({message: "Resource already exists in database"}, 400);
            return;
        }
        const result = await client.db("sources").collection('general').insertOne(general);
        res.json(result);
    });
    //general search

      
  
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

run()
