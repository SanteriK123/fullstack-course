const express = require("express");

const router = express.Router();

const mongoose = require("mongoose");
const Post = require("../model/Post");
const requireAuth = require("../config/requireAuth");

// Get, post and delete routes for the posts in the forum

router.use(requireAuth);

router.get("/", async (req, res) => {
  const posts = await Post.find({}).sort({ createdAt: -1 });
  res.status(200).json(posts);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No post found with this id" });
  }
  const post = await Post.findById(id);
  if (!post) {
    return res.status(404).json({ error: "No post found with this id" });
  }
  res.status(200).json(post);
});

router.post("/", async (req, res) => {
  const { title, description, username } = req.body;

  try {
    const post = await Post.create({ title, description, username });
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No user found with this id" });
  }
  const post = await Post.findByIdAndDelete(id);
  if (!post) {
    return res.status(400).json({ error: "No post to delete" });
  }
  return res.status(200).json({ post });
});

module.exports = router;
