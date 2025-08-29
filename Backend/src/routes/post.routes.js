const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const multer = require("multer");
const {createPostController} = require("../controllers/post.controller")

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", authMiddleware, upload.single("image"),  createPostController);

module.exports = router;
