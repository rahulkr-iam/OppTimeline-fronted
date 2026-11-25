import express from "express";
import Otp from "../DbSchema/otpSchema.js";

const router = express.Router();

router.post("/verifyOtp", async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                message: "Email and OTP are required"
            });
        }

        const otpData = await Otp.findOne({ email });

        if (!otpData) {
            return res.status(400).json({
                message: "OTP expired or not found"
            });
        }

        if (otpData.expiresAt < new Date()) {
            await Otp.deleteOne({ email });
            return res.status(400).json({
                message: "OTP expired"
            });
        }

        if (otpData.otp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        await Otp.deleteOne({ email });

        return res.status(200).json({
            message: "OTP verified successfully"
        });

    } catch (error) {
        console.error("Verify OTP error:", error);

        return res.status(500).json({
            message: "Something went wrong"
        });
    }
});

export default router;