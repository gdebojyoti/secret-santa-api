
const { MongoClient } = require('mongodb')
const config = require('../config')

const uri = `mongodb+srv://${config.mongo_user}:${config.mongo_pass}@secret-santa.e6ohp.mongodb.net/${config.mongo_db_name}?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

module.exports = {
  // connect: async (prop) => {
  //   client.connect(async err => {
  //     const db = client.db(config.mongo_db_name)
  //     const result = await db.collection("users").insertOne({
  //       name: 'jhjshd'
  //     })
  //     console.log("firstDoc", prop, result.insertedId)
  //     client.close()
  //   })
  // },

  addUser: (email, password) => {
    client.connect(async err => {
      const db = client.db(config.mongo_db_name)
      const result = await db.collection("users").insertOne({
        email, password
      })
      console.log("firstDoc", result.insertedId)
      client.close()
    })
  },
}
