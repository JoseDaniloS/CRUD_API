const mongoose = require("mongoose");

const news = mongoose.model("News", {
  title : String,
  description : String,
  content : String,
  timeOfCreate : {
    type : Date,
    default : Date.now,
  },
});

module.exports = news