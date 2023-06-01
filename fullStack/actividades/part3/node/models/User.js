const moongose = require('mongoose')
const { model, Schema } = moongose
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new Schema({
  username: { type: String, unique: true, minLength: 4 },
  name: String,
  passwordHash: String,
  notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }]
})
userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = model('User', userSchema)

module.exports = User
