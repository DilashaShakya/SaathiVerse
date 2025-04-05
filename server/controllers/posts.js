const Post = require("../models/posts");

const addNewPost = async (req, res) => {
    try {
        if (!req.body.content || !req.body.createdBy) {
            return res.status(400).json({ msg: "Content and createdBy are required." });
        }
        console.log("req.file before check:", req.file); // Log req.file right after multer
        // --- Access the uploaded file from req.file ---
        if (!req.file) {
          console.log("⚠️ No image file uploaded (req.file is undefined)."); // Log if req.file is undefined
            return res.status(400).json({ msg: "No image file uploaded." }); // Handle case where no image is uploaded (optional)
        }else{
          console.log("✅ Image file received (req.file):", req.file); // Log the req.file object
          console.log("✅ req.file.path:", req.file.path); // Log req.file.path specifically
        }

        const imagePath = req.file.path; // 'req.file.path' contains the path to the saved image

        const newPost = new Post({
            content: req.body.content,
            createdBy: req.body.createdBy,
            image: imagePath, // Save the image path in the post document
        });

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

const getAllPosts = (req, res) => { // ... your getAllPosts function (no changes needed)
    Post.find({})
        .then(posts => res.json(posts))
        .catch(error => res.status(500).json({ error: error.message }));
};

module.exports = { addNewPost, getAllPosts };