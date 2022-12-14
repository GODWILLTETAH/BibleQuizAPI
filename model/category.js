const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type : String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    questions:{
        type: Array,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
      }
})


module.exports = mongoose.model("category", categorySchema);