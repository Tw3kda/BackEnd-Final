import { query } from 'express';
import Post from '../models/Posts'

export const createPost = async (req, res) => {
    const { user, text, URL, hashtag } = req.body;
    try {
        const newPost = new Post({ user, text, URL, hashtag });  // Create a new instance of the Post model
        const savedPost = await newPost.save();  // Save the post to the database
        res.status(201).json(savedPost);  // Respond with the saved post
    } catch (error) {
        
        res.status(500).json({ message: 'Error saving post', error });
    }
};

export const deletePost = async (req, res) => {
    const { postId } = req.params;  // Get the postId from the path parameters
    try {
        const deletedPost = await Post.findByIdAndDelete(postId);  // Delete the post by its ID
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully', post: deletedPost });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Error deleting post', error: error.message });
    }
};

export const editPost = async (req, res) => {
    const { postId } = req.params;
    const { user, text, URL, hashtag } = req.body;
    try {
        const updatedPost = await Post.findByIdAndUpdate(postId, { user, text, URL, hashtag }, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(updatedPost);
    } catch (error) {
        console.error('Error editing post:', error);
        res.status(500).json({ message: 'Error editing post', error: error.message });
    }
};

export const searchPost = async (req, res) => {
    const { text, hashtag } = req.query;

    if (!text && !hashtag) {
        return res.status(400).json({ message: 'You must provide either text or hashtag as a query parameter' });
    }

    try {
        const query = {};
        if (text) query.text = { $regex: text, $options: 'i' }; // Case-insensitive regex search
        if (hashtag) query.hashtag = { $regex: hashtag, $options: 'i' }; // Case-insensitive regex search
        
        const posts = await Post.find(query);
        if (posts.length === 0) {
            return res.status(404).json({ message: 'No posts found' });
        }
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error searching posts:', error);
        res.status(500).json({ message: 'Error searching posts', error: error.message });
    }
};

export const fetchPostsByDate = async (req, res) => {
    try {
        // Query all posts and sort them by their creation date in descending order
        const posts = await Post.find().sort({ createdAt: -1 });

        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Error fetching posts', error: error.message });
    }
};