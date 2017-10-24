var express = require('express')
  , app = express(app)
  , server = require('http').createServer(app);

//var player1Json = require("./assets/player1.json");
//var player2Json = require("./assets/player2.json");
//var boot = require("./server/objects/boot.js");

// serve static files from the current directory
app.use(express.static(__dirname));


//get EurecaServer class
var Eureca = require("eureca.io");
 
//create an instance of EurecaServer
var eurecaServer = new Eureca.Server({allow:[]});
 
//attach eureca.io to our http server
eurecaServer.attach(server);

server.listen(8000);

clients = [];

//detect client connection
eurecaServer.onConnect(function (conn) {    

//    var remote = eurecaServer.getClient(conn.id); 
//    remote.setId(conn.id);

    console.log('New Client id=%s ', conn.id, conn.remoteAddress);
});

//detect client disconnection
eurecaServer.onDisconnect(function (conn) {    
    console.log('Client disconnected ', conn.id);
});





var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
 
// Connection URL 
/*var url = "mongodb://localhost:27017/db";
// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
 
  db.close();
});*/


/*
MongoClient.connect("mongodb://localhost:8000/db", function(error, db) {
    if (error) return funcCallback(error);

    console.log("Connecté à la base de données 'tutoriel'");
});*/