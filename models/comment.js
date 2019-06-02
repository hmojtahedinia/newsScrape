const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const CommentSchema = new Schema({
    name: {
        type: string,
    },
    body: {
        type: string,
        required: true
    },
    
});
const Comment = mongoose.model("Comment", CommentSchema);
module.export = Comment;
