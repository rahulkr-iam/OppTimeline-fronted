import express from "express";
import DrivePost from "../DbSchema/drivePostSchema.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router=express.Router();

router.put("/createPost",authMiddleware, async (req, res) => {
  try {
    const {
      roleTitle,
      company,
      section,
      statusLabel,
      driveDate,
      expectedCTC,
      tags,
      description,
      applicationLink,
      jdGoogleDriveLink,
      eligibilityCriteria
    } = req.body;

    const post = await DrivePost.create({
      roleTitle,
      company,
      section,
      statusLabel,
      driveDate,
      expectedCTC,
      tags,
      description,
      applicationLink,
      jdGoogleDriveLink,
      eligibilityCriteria
    });

    res.status(201).json({
      success: true,
      message: "Drive post created successfully",
      post,
    });
  } catch (error) {
    console.error("Create post error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create drive post",
    });
  }
});

export default router;