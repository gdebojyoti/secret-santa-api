
const { MongoClient } = require('mongodb')
const config = require('../config')

const uri = `mongodb+srv://${config.mongo_user}:${config.mongo_pass}@secret-santa.e6ohp.mongodb.net/${config.mongo_db_name}?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
client.connect(err => {
  const collection = client.db("test").collection("devices")
  // perform actions on the collection object
  client.close()
})
