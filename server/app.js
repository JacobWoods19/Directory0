var express = require("express");
var app = express();
const cheerio = require("cheerio");
const cors = require('cors');
const { MongoClient, ObjectId } = require("mongodb");
const { createClient } = require('@supabase/supabase-js')

const port = 8000;
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
let client = new MongoClient("mongodb+srv://doadmin:6SK073Fneg2E189s@db-mongodb-nyc1-63759-f32d7869.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=db-mongodb-nyc1-63759", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const supabase = createClient('https://qqfktkpxbhnruikwfzbp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxZmt0a3B4YmhucnVpa3dmemJwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3NzE4MTc3NywiZXhwIjoxOTkyNzU3Nzc3fQ.g5y_kJZFNcKP9-VeBcSKADMX4G86vFlOMedCUuoi-gY')
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
        //general search
        app.get('/api/search/id', async (req, res) => {
            console.log("searching for id: " + req.query.id);
            var id = req.query.id;
            let result = null;
            let database = client.db("sources")
            try {
              // Search through all collections for the document with the specified ID
              const collections = ['websites', 'projects', 'general'];
              for (const collectionName of collections) {
                const collection = database.collection(collectionName);
                const document = await collection.findOne({ _id: new ObjectId(id) });
                if (document) {
                  result = document;
                  break;
                }
              }
          
              if (!result) {
                return res.status(404).send('Document not found');
              }
          
              res.send(result);
            } catch (err) {
              console.error(err);
              res.status(500).send('Internal server error');
            }
          });
    app.post("/api/upvote", jsonParser, async (req, res) => {
        // check if user exists in supabase
        // if user exists, update upvote count in database searching through all collections
        // if user does not exist, return error
        console.log("Upvote request received")
        const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', req.body.user_id)

        if (error) {
            res.json({message: "Error finding user"}, 401);
            console.log(error)
            return;
        }
        if (data.length == 0) {
            res.json({message: "User does not exist"}, 402);
            console.log(data)
            return;
        }
        console.log("User exists")
        // check if user has already upvoted this source
        const upvote_history_result = await client.db("sources").collection("upvote_history").findOne({
            user_id: req.body.user_id,
            source_id: req.body.id
        });
        console.log("Upvote history result" + JSON.stringify(upvote_history_result))
        if (upvote_history_result == null) {
            // increment upvote count in database
            console.log("Incrementing upvote count in collection " + req.body.type)
            console.log("Incrementing upvote count with id" + req.body.id)
            var id = new ObjectId(req.body.id);
            const result = await client.db("sources").collection(req.body.type).updateOne({_id: id}, {$inc: {upvotes: 1}});
            console.log("RESULT" + JSON.stringify(result))
            if (result.modifiedCount == 0) {
                //check if source exists
                const result3 = await client.db("sources").collection("websites").findOne({_id : id});
                if (result3 == null) {
                    res.json({message: "Source does not exist"}, 409);
                    console.log(result3)
                    return;
                }
                else {
                    console.log("Source exists")
                    console.log(result3)
                }
                res.json({message: "Error updating upvote count"}, 403);
                console.log(result)
                return;
            }
            else{
                const upvote_added = await client.db("sources").collection("upvote_history").insertOne({user_id: req.body.user_id, source_id: req.body.id});
                if (upvote_added.insertedCount == 0) {
                    res.json({message: "Error updating upvote history"}, 404)
                    console.log(upvote_added)
                    return;
                }
                else {
                    res.json({message: "Upvote successful"}, 200);
                }
            }
        }
        else {
            res.json({message: "User has already upvoted this source"}, 400);
        return;
    } 
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
    app.post("/api/communities", jsonParser, async (req, res) => {
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
        const community = {
            name: req.body.name,
            description: req.body.description,
            url: req.body.url,
            upvotes: 0,
            published_date: new Date(),
            is_published: true,
            tag: req.body.tag,
        };
        const community_exists = await client.db("sources").collection('communities').find({url: community.url}).toArray();
        if (community_exists.length != 0) {
            res.json({message: "Project already exists in database"}, 400);
            return;
        }
        const result = await client.db("sources").collection('communities').insertOne(community);
        res.json(result);
    } );
    app.get('/api/communities', async (req, res) => {
        const results = await client.db("sources").collection('communities').find({tag: "starred"}).toArray();
        res.json(results);
    });
    app.get('/api/communities/search', async (req, res) => {
        const results = await client.db("sources").collection('communities').find({tag: req.query.tag}).toArray();
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
      
  
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

run()
