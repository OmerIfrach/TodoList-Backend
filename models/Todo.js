const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    name: String,
    isCompleted : Boolean,
},
{
    timestamps:true
})

TodoSchema.index({ "$**": "text" });
module.exports = mongoose.model("Todo", TodoSchema);