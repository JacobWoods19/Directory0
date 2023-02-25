const cheerio = require("cheerio");


 async function getKeyWords(url){
    fetch(url)
    .then(result => result.text())
    .then(html => {
        var found_keywords = [];
        
        const $ = cheerio.load(html);
        const title = $('meta[property="og:title"]').attr('content') || $('title').text() || $('meta[name="title"]').attr('content')
        console.log(title)
        const description = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content')
        var keywords = $('meta[property="og:keywords"]').attr('content') || $('meta[name="keywords"]').attr('content')
        if(keywords == undefined){
            keywords = []; 
        }
        else{
            console.log(keywords);
            keywords = keywords.split(",");
            if (description != undefined){
                console.log(description)
                var desc_keywords = getKeyWordsFromDesc(description);
                keywords = keywords.concat(desc_keywords);
                return keywords;
            }
            else{
                return keywords;
            }

        }

    }).catch(error => {
        console.log(error);
    })
}
// creates a function that looks for keywords related to programming from description
// and returns an array of keywords
function getKeyWordsFromDesc(description){
    const words_to_look_for = [
        "c++",
        "c#",
        "java",
        "javascript",
        "python",
        "swift",
        "html",
        "css",
        "sql",
        "php",
        "ruby",
        "go",
        "rust",
        "machine learning",
        "artificial intelligence",
        "ai",
        "ml",
        "data science",
        "object oriented",
        "oop",
        "functional",
        "jquery",
        "react",
        "angular",
        "vue",
        "node",
        "node.js",
        "nodejs",
        "typescript",
        "flutter",
        "dart",
        "raspberry pi",
        "arduino",
        "android",
        "ios",
        "ios development",
        "android development",
        "mobile development",
        "mobile",
        "web development",
        "web",
        "web design",
        "api",
        "amazon web services",
        "aws",
        "google cloud",
        "google cloud platform",
        "gcp",
        "azure",
        "microsoft azure",
        "docker",
        "kubernetes"
    ]
    var found_keywords = [];
    for (var i = 0; i < words_to_look_for.length; i++){
        if (description.toLowerCase().includes(words_to_look_for[i])){
            found_keywords.push(words_to_look_for[i]);
        }
    }
    return found_keywords;
}
