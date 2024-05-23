import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    user: { type: String, required: true },
    text: { type: String, required: true },
    URL: { type: String }, // Make URL field optional
    hashtag: { type: String, required: true }
});

const Post = mongoose.model('Post', postSchema);

export default Post;
