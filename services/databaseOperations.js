
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
        try {
          const db = client.db(process.env.mongo_db_name)
          const result = await db.collection("users").findOne({
            email, password
          })
          client.close()
          resolve(result)
        } catch (e) {
          reject (e)
        }
      })
    })
  },

  createEvent: async (token, details) => {
    return new Promise((resolve, reject) => {
      client.connect(async err => {
        try {
          const db = client.db(process.env.mongo_db_name)
          const user = await db.collection("users").findOne({ token })
          
          // if no user is found for provided auth token
          if (!user) {
            client.close()
            resolve(1)
          }

          const { email } = user

          // insert new entry into events collection
          await db.collection("events").insertOne({
            creator: email,
            ...details
          })

          client.close()
          resolve(0)
        } catch (e) {
          reject (e)
        }
      })
    })
  },
  
  getEvents: async (token) => {
    return new Promise((resolve, reject) => {
      client.connect(async err => {
        try {
          const db = client.db(process.env.mongo_db_name)
          const user = await db.collection("users").findOne({ token })
          
          // if no user is found for provided auth token
          if (!user) {
            client.close()
            resolve(1)
          }

          const { email } = user

          // insert new entry into events collection
          const events = await db.collection("events").find({ creator: email }).toArray()

          client.close()
          resolve(events)
        } catch (e) {
          reject (e)
        }
      })
    })
  },

  showUsers: async (email, password) => {
    return new Promise((resolve, reject) => {
      client.connect(async err => {
        try {
          const db = client.db(process.env.mongo_db_name)
          const result = await db.collection("users").findOne()
          client.close()
          resolve(result)
        } catch (e) {
          reject (e)
        }
      })
    })
  }
}
