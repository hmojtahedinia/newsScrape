const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const AarticleSchema = new Schema({
    title: {
        type: string,
        required: true
    },
    link: {
        type: string,
        required: true
    },
    comment: [{
        type: Schema.Types.ObjectId,
        ref: "commment"
    }]
});
const Article = mongoose.model("Article", ArticleSchema);
module.export = Article;
