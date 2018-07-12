const fs = require('fs')
const ipfs = require('ipfs-api')({host: "localhost", port: 5001, protocol: "http"});

var express = require("express"),
    bodyParser = require("body-parser"),
    app = express();

var vfile = require('to-vfile');
var retext = require('retext');
var keywords = require('retext-keywords');
var nlcstToString = require('nlcst-to-string');


app.use(bodyParser.urlencoded({extended : true}));

app.set("view engine", "ejs");

app.get("/", function(req,res){
    res.render("form", {result:"", hits:"", filecontent:"",keyword:""});
});


var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({ // Setting up a client object to interact with elasticsearch server at 9200.
  host: 'localhost:9200',
  log: 'trace'
});

app.post("/datascript", async function(req,res){ // a function to post IPFS Hash along with keywords to elastic search
    
    let count = {};

    try
    {
        count = await client.count({
        index: 'myData'
        });
    }
    
    catch(err)
    {
        console.log(err);
        count.count = 0;
    }

    var obj = {
        index: 'myData',
        type: 'myDataDetails',
        id: count.count + 1
      };
    
    obj.body = req.body;
    console.log("Here")
    console.log(req.body);
    client.create(obj, function (error) {
        if(error) {
            console.log('Error boi');
        } else {
            console.log('All is well boi');
        }
    });
    res.redirect("/");
})

app.post("/IPFSscript", function(req,response){ // A function to add file at specified address to your IPFS and display hash along with suggested keywords
        
    let cont = fs.readFileSync(req.body.FileAddress);
        
    cont = new Buffer(cont);
    var keywordList=""
    retext()
  .use(keywords)
  .process(vfile.readSync(req.body.FileAddress), function (err, file) {
    if (err) throw err;

    
    console.log('Keywords:');
    file.data.keywords.forEach(function (keyword) {
      keywordList += " " + nlcstToString(keyword.matches[0].node);
    });

  }
);

    ipfs.add(cont, function (err, res) {
        if(err) throw err;
        console.log(res[0].path);
        response.render("form.ejs",{result: res[0].path,hits:"",filecontent:"",keyword:keywordList});
        });
       
})

app.post("/searchscript", function(req, response){ // A function to display search results for a keyword
client.search({
    index: 'myData',
    q: 'Keywords:' + req.body.Keyword
  }, function (err, resp) {
      if(err) throw err;
      response.render("form.ejs",{result: "", hits: resp.hits.hits, filecontent:"",keyword:""})
  });
})

app.post("/decodescript", function(req,response){ // A function to display the file using IPFS.
        
    ipfsPath = req.body.decodehash

    ipfs.files.cat(ipfsPath, function (err, file) {
        if (err) {
        throw err
        }
    
        console.log(file.toString('utf8'))

        response.render("form.ejs",{result:"", hits:"", filecontent : file.toString('utf8'),keyword:""})
    })

})

app.listen(3300, function(){
    console.log("Server started, listening on port 3300");
});