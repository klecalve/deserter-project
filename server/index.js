/*
* Require
*/
const http = require('http');
const { MongoClient } = require('mongodb');

/*
* Path
*/
const url = 'mongodb://localhost:27017/deserter';

/*
* BDD
*/
// Connexion à la BDD
MongoClient.connect(url, (err, db) => {
  if (err) throw err;

  const dbo = db.db('deserter');
  dbo.collection('Users').findOne({}, (errorFind, result) => {
    if (errorFind) throw errorFind;
    console.log(result);
    db.close();
  });
});

// le server est lancé sur le port localhost:3000
const server = http.createServer();
server.listen(3000);