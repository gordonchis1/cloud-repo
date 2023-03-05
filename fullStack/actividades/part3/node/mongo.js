const mongoose = require('mongoose')
const { Schema, model } = mongoose
const password = 'Elcantis'

const connectionString = `mongodb+srv://eduardovaldse:${password}@cluster0.vyoiqs3.mongodb.net/gordonchisdb?retryWrites=true&w=majority`

// conexion a monogo
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('data base conected')).catch(err => console.error(err))

const noteSchema = new Schema({ content: String, date: Date, important: Boolean })

const Note = model('Note', noteSchema)

// Note.find({}).then(data => { console.log(data); mongoose.connection.close() })

const note = new Note({
  content: 'mongodb es imprecionante',
  date: new Date(),
  important: true
})

note.save().then((result) => {
  console.log(result)
  mongoose.connection.close()
}).catch((err) => console.error(err))
