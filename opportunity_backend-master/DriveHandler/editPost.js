import express from "express";
import DrivePost from "../DbSchema/drivePostSchema.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router=express.Router();

router.put("/editPost/:id",authMiddleware,async (req, res) => {
  try {
    const { id } = req.params;

    const updatedPost = await DrivePost.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update post",
    });
  }
});

export default router;