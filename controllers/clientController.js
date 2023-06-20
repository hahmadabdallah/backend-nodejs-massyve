

const Client = require('../models/clientModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.JWT_SECRET, { expiresIn: '3d' })
}

// login a client
const loginClient = async (req, res) => {
  const {email,password} = req.body

  try {
    const client = await Client.login(email,password)

    // create a token
    const token = createToken(client._id)
    const id=client._id;
    console.log("id",id)

    res.status(200).json({email,token,id})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a client
const signupClient = async (req, res) => {
  const {email,password} = req.body

  try {
    const client = await Client.signup(email,password)

    // create a token
    const token = createToken(client._id)
    const id=client._id;
    res.status(200).json({email,token,id})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}


  

module.exports = { signupClient, loginClient}