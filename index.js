var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var methodOverride = require('method-override');
var cors = require('cors');
var app = express();
/*
//mongo 
const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb:localhos:27017/mydatabase';

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://gransabio777:<password>@cluster0.qwt0yyp.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
 

    //insertar un elemento
    collection.insertOne({ mane: 'Mario',age: 30 }, function (err, res) {
    if (err) throw err;
    console.log('successful install');
    client.close();
});
});
*/




app.get('/', (req, res) => { res.send('Hola Mundo'); });
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());
app.post('/posts', function (req, res) {
    res.json({ success: true });
});


app.listen(process.env.PORT || 8080);