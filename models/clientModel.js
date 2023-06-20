const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const clientSchema = new Schema({
 
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: { type:Date,require:false, default:new Date()}

}

)

//static signup method
clientSchema.statics.signup = async function(email, password) {
   
  if (!email || !password) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }


  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const client = await this.create({email,password:hash})

  return client
}

// static login method
clientSchema.statics.login = async function(email, password) {

  if (!email || !password ) {
    throw Error('All fields must be filled')
  }

  const client = await this.findOne({ email })
  if (!client) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password,client.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return client
}

module.exports =mongoose.models.clientModel || mongoose.model('clientModel', clientSchema)