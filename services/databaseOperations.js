
const { MongoClient } = require('mongodb')

const uri = `mongodb+srv://${process.env.mongo_user}:${process.env.mongo_pass}@secret-santa.e6ohp.mongodb.net/${process.env.mongo_db_name}?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

module.exports = {
  // connect: async (prop) => {
  //   client.connect(async err => {
  //     const db = client.db(process.env.mongo_db_name)
  //     const result = await db.collection("users").insertOne({
  //       name: 'jhjshd'
  //     })
  //     console.log("firstDoc", prop, result.insertedId)
  //     client.close()
  //   })
  // },

  addUser: (email, password, token) => {
    client.connect(async err => {
      const db = client.db(process.env.mongo_db_name)
      const result = await db.collection("users").insertOne({
        email, password, token
      })
      console.log("firstDoc", result.insertedId)
      client.close()
    })
  },

  loginUser: async (email, password) => {
    return new Promise((resolve, reject) => {
      client.connect(async err => {
        const db = client.db(process.env.mongo_db_name)
        const result = await db.collection("users").findOne({
          email, password
        })
        client.close()
        resolve(result)
      })
    })
  }
}
