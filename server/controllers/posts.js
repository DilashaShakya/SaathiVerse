const Post = require("../models/posts");
const mongoose = require("mongoose");

console.log("🚀 Debug: Post Model Import ->", Post); // Add this line


const addNewPost = async (req, res) => {
  try {
    // Basic input validation (you can enhance this)
    if (!req.body.content || !req.body.createdBy) {
      return res.status(400).json({ msg: "Content and createdBy are required." });
    }

    const newPost = new Post(req.body);
    await newPost.save();

    console.log("✅ Post Created:", newPost);
    res.status(201).json({ msg: "Post created successfully!", post: newPost });
  } catch (error) {
    console.error("❌ Error adding post:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({ msg: "Validation error", error: error.message });
    }

    res.status(500).json({ msg: "Server error", error: error.message });
  }
};
const getAllPosts = (req, res) => {
  Post .find({}) // Fetch all posts
    .then((posts) => {
      res.json(posts); // Send the posts as JSON
    })
    .catch((error) => {
      res.status(500).json({ error: error.message }); // Handle errors
    });
};

module.exports = { addNewPost, getAllPosts };


