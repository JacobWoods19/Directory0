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
        if (req.body.name == undefined || req.body.description == undefined || req.body.url == undefined || req.body.price == undefined || req.body.tags == undefined) {
            
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
            is_published: false,
            price: req.body.price,
            tags: req.body.tags,
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
        const results = await client.db("sources").collection('websites').find().sort({upvotes: -1}).toArray()
        res.json(results);
    });
    //Search by tag name , checks if tag name is in the tags array of document
    app.get('/api/websites/search', async (req, res) => {
        const tag = req.query.tag;
        console.log(tag)
        const results = await client.db("sources").collection('websites').find({tags: tag}).toArray();
        res.json(results);
    });

      
  

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

run()
