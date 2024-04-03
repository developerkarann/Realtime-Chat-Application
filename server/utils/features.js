const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");


const connectDataBase = (uri) => {
   mongoose.connect(uri).then(() => {
      console.log('Database configured successfully')
   }).catch((error) => {
      console.log(`Getting some error while connectiong databse: ${error.message}`)
   })
}

const cookieOptions = {
   maxAge: 15 * 24 * 60 * 60 * 1000,
   sameSite: 'none',
   httpOnly: true,
   secured: true
}
const sendToken = (res, user, code, message) => {
   const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET)
  

   return res.status(code).cookie('token', token, cookieOptions).json({
      success: true,
      message,
      user
   })
}

const emitEvent = (req, event, users, data) => {
   console.log('Emiting Event', event)
}

const deleteFilesFromCloudinary = async (public_ids) => {

}


module.exports = { connectDataBase, sendToken, emitEvent, deleteFilesFromCloudinary , cookieOptions}

