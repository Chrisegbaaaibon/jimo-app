const mongoose = require("mongoose");
// require('dotenv').config() 

exports.db = async () => {
  try {
   mongoose.connect(process.env.MONGO_URI)
    console.log('connected sucessfully')
  } catch (error) {
     
  }
};