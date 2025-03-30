const mongoose = require('mongoose');

// ✅ Post Schema
const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },

    postType: {
      type: String,
      enum: ['text', 'image', 'video', 'audio', 'link'],
      default: 'text',
    },

    createdBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true,
    },

    tags: [{ type: String }], // Array of tags

    likes: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" 
    }],

    shares: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" 
    }],

    comments: [
      { 
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      }
    ],

    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// ✅ Export Post Model
module.exports = mongoose.model("Post", postSchema);
