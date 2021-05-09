const mongoose =require('mongoose')
const uploadSchema = {
  title:String,
  path:String
}
const uploadModel = mongoose.model('upload',uploadSchema)
module.exports = uploadModel