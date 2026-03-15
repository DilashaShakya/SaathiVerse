const Post = require("../models/posts");

const addNewPost = async (req, res) => {
  try {
    // Basic input validation (you can enhance this)
    if (!req.body.content || !req.body.createdBy) {
      return res.status(400).json({ msg: "Content and createdBy are required." });
    }

    const newPost = new Post({
      ...req.body,
      image: req.file ? req.file.path.replace(/\\/g, '/') : '',
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
const getAllPosts = (req, res) => {
  Post.find({})
    .populate('createdBy', 'fullName avatar')
    .sort({ createdAt: -1 })
    .then((posts) => res.json(posts))
    .catch((error) => res.status(500).json({ error: error.message }))
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json({ msg: 'Post not found' })
    if (post.createdBy.toString() !== req.params.userId) {
      return res.status(403).json({ msg: 'Not allowed to delete this post' })
    }
    await Post.findByIdAndDelete(req.params.id)
    res.json({ msg: 'Post deleted' })
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message })
  }
};

const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    const { userId } = req.body
    const idx = post.likes.findIndex(id => id.toString() === userId)
    if (idx === -1) {
      post.likes.push(userId)
    } else {
      post.likes.splice(idx, 1)
    }
    await post.save()
    res.json({ likes: post.likes })
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message })
  }
}

const addReaction = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    const { userId, type } = req.body
    const existingIdx = post.reactions.findIndex(r => r.user.toString() === userId)
    if (existingIdx !== -1) {
      if (post.reactions[existingIdx].type === type) {
        post.reactions.splice(existingIdx, 1)
      } else {
        post.reactions[existingIdx].type = type
      }
    } else {
      post.reactions.push({ user: userId, type })
    }
    await post.save()
    res.json({ reactions: post.reactions })
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message })
  }
}

const addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    const { userId, comment } = req.body
    if (!comment?.trim()) return res.status(400).json({ msg: 'Comment cannot be empty' })
    post.comments.push({ user: userId, comment })
    await post.save()
    res.json({ comments: post.comments })
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message })
  }
}

module.exports = { addNewPost, getAllPosts, deletePost, toggleLike, addReaction, addComment };


