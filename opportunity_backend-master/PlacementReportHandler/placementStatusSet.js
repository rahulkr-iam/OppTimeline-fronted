import express from "express";
import User from "../DbSchema/userSchema.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.put("/placed",authMiddleware, async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    console.log(email);

    const data = await User.findOneAndUpdate(
      { email },
      { $set: { status: "placed" } },
      {
        new: true,
        upsert: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Placement status updated",
      data,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update placement status",
    });
  }
});

router.put("/unplaced",authMiddleware,async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const data = await User.findOneAndUpdate(
      { email },
      { $set: { status: "unplaced" } },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Placement status updated",
      data,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update placement status",
    });
  }
});

export default router;