var express = require("express");
var app = express();
const cheerio = require("cheerio");
const cors = require('cors');
const { MongoClient, ObjectId } = require("mongodb");
const { createClient } = require('@supabase/supabase-js')
var websiteRouter = require('./routes/website_router');
var projectRouter = require('./routes/project_router');
var communityRouter = require('./routes/community_router');
var videoRouter = require('./routes/video_router');
var infoRouter = require('./routes/info_router');
const port = 8000;
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
//mongodb+srv://doadmin:6SK073Fneg2E189s@db-mongodb-nyc1-63759-f32d7869.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=db-mongodb-nyc1-63759
//mongodb+srv://doadmin:FG3hx582n9oH1b06@db-mongodb-nyc1-63759-f32d7869.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=db-mongodb-nyc1-63759
let client = new MongoClient("mongodb+srv://doadmin:FG3hx582n9oH1b06@db-mongodb-nyc1-63759-f32d7869.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=db-mongodb-nyc1-63759", {
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

    app.use('/api/websites', websiteRouter);
    app.use('/api/projects', projectRouter);
    app.use('/api/communities', communityRouter);
    app.use('/api/videos', videoRouter);
    app.use('/api/info', infoRouter);

    // create a route for the homepage
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
        
    app.get('/ping', (req, res) => {
        res.send('pong');
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
