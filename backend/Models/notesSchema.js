const mongoose = require("mongoose")

const notesSchema = new mongoose.Schema({
  title:String,
  noteSummary:String,
  tags:[String],
  backgrounds:{
    type:String,
    default:"#000"
  }
},{timestamps:true})


const Notes = mongoose.model("Notes",notesSchema)

module.exports = Notes