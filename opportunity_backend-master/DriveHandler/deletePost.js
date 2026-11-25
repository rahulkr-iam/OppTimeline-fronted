import express from "express";
import DrivePost from "../DbSchema/drivePostSchema.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router=express.Router();

router.delete("/deletePost/:id",authMiddleware,async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPost = await DrivePost.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete post",
    });
  }
});

export default router;