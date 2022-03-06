const mongoose = require("mongoose");

const SeabirdsSchema = new mongoose.Schema({
  encyclopedia_id:{
    type: String
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  distribution:{
    type: String,
    required: false,
  },
  habitat:{
    type: String,
    required: false,
  },
  feedinghabits:{
    type: String,
    required: false,
  }
  ,
  taxonomy:{
    type: String,
    required: false,
  }
  ,
  description: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: false,
    default: "https://furntech.org.za/wp-content/uploads/2017/05/placeholder-image.png",
  },
  created_by:{
    type: String
  }
});

module.exports = mongoose.model("Seabirds", SeabirdsSchema);
