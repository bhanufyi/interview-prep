const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResumeSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },

    file:{
        type:Map,
        of:String,
        required: true, 
    },

    externalUrl: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = Resume = mongoose.model("resume", ResumeSchema);
