const mongoose = require('mongoose')
const schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp')

const user = new schema({
   name :{
      type: String,
   },
   email :{
      type: String,
      unique: true
   },
   phoneNumber:{
      type: Number,
   },
   requestBrochure:{
      type:Boolean,
   },
   application:{
      type: Boolean
   }

},{
   timestamps: true
});

module.exports = mongoose.model("user", user)