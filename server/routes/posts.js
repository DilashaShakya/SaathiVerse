const express = require('express');
const { getAllPosts, addNewPost } = require("../controllers/posts");
const router = express.Router();

module.exports = (upload) => { // Export a function that takes 'upload'
    // Apply multer middleware *only* to the POST route that needs it
    router.post('/', upload.single('image'), addNewPost);
    router.get('/', getAllPosts); // GET route for all posts (no file upload)

    return router; // Return the configured router
};