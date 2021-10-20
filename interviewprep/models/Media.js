const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MediaSchema = new Schema(
  {
    
    user : {
        type: mongoose.Types.ObjectId,
        ref : 'users'
    },

    url : {
        type: String,
        required : true,
        trim : true,
        unique: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = Media = mongoose.model("media", MediaSchema);
