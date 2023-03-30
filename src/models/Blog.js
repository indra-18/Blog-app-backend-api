const mongooose = require('mongoose');

const blogSchema = new mongooose.Schema({
    topic: {
        type: String,
        required: true
    },
    description: String,
    posted_by: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

blogSchema.method('toJSON', function() {
    const {__V, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})

const Blog = mongooose.model('blogs', blogSchema);

module.exports = Blog;