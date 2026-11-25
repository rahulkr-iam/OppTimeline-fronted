import User from "../DbSchema/userSchema.js";
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/placementReport",authMiddleware, async (req, res) => {
  try {
    const result = await User.find();

    const data = result.map((e) => ({
      email: e.email,
      name: e.name,
      status: e.status,
    }));

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate placement report",
    });
  }
});

export default router;