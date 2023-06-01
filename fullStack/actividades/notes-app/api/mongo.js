require('dotenv').config()

const mongoose = require('mongoose')

const { MONGO_DB_CONECTIONSTRING, MONGO_DB_CONECTIONSTRING_TEST, NODE_ENV } = process.env

const connectionString = NODE_ENV === 'test' ? MONGO_DB_CONECTIONSTRING_TEST : MONGO_DB_CONECTIONSTRING
// conexion a monogo
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('data base conected')).catch(err => console.error(err))

// Note.find({}).then(data => { console.log(data); mongoose.connection.close() })
