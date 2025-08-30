const postModel = require("../models/post.model");
const generateCaption = require("../service/ai.service");
const uploadFile = require("../service/storage.service");
const { v4: uuidv4 } = require("uuid");

async function createPostController(req, res) {
  try {
    const file = req.file;
    console.log("file received:", file);

    const { style, language } = req.body; // 👈 get user choice

    const base64Image = Buffer.from(file.buffer).toString("base64");

    const caption = await generateCaption(base64Image, style, language);

    const result = await uploadFile(file.buffer, `${uuidv4()}`);

    const post = await postModel.create({
      caption,
      image: result.url,
      user: req.user._id,
    });

    res.status(201).json({
      message: "Post Created Successfully",
      post,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
}

module.exports = { createPostController };
