import express from "express";
import DrivePost from "../DbSchema/drivePostSchema.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/retrivePost",authMiddleware,async (req, res) => {
  try {
    const posts = await DrivePost.find();

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error("Retrieve post error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve posts",
    });
  }
});

export default router;