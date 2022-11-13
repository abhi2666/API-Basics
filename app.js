/*
Here we will learn about API (Application Programming Interface).
APIs are used when you want your server to interact with some other Server
for some data (like weather report). This can be done easily using API

We will make a basic get request to another server for weather details using
API in this project.
*/
const express = require('express');
const https = require('https'); // native modules used to send the client data
// body parser is used when you want to extract some specific information
// from the data that you are getting from client side..
// example --> like you want only their emails then you can do that by using
// body parser.. It is different that JSON.parse().
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended : true}));

//to provide something to client when they enter our website
app.get('/', function(req, res){
  res.sendFile(__dirname + "/index.html");
  // you can have only one send() method inside get
  // but you can get multiple write() method
})


app.post("/", function(req, res){
  var cat = req.body.Category;
  var url = "https://v2.jokeapi.dev/joke/"+cat;
  //to send the respone to the user
  https.get(url, function(response){
    //to send the response we got from another server to our client
    // after refining it.
    response.on("data", function(data){
      //parse it using JSON to convert the data from
      // hexadecimal form to JavaScript Object Notation(JSON)
      var Joke = JSON.parse(data);
      res.send(Joke.joke);
    })
  })
});

app.listen(3000, function(req, res){
  console.log("Server Started at port 3000");
});
