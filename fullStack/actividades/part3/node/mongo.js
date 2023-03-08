require('dotenv').config()

const mongoose = require('mongoose')

const connectionString = process.env.MONGO_DB_CONECTIONSTRING

// conexion a monogo
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('data base conected')).catch(err => console.error(err))

// Note.find({}).then(data => { console.log(data); mongoose.connection.close() })
