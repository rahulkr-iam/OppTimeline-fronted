import User from "../DbSchema/userSchema.js";
import validityDb from "../DbSchema/validitySchema.js";

const validityMiddleware = async (req, res, next) => {
  try {
    const id = req.user.userId;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const email = user.email;
    console.log(email);

    const data = await validityDb.findOne({
      email: email,
    });

    if (data) {
      return res.status(429).json({
        success: false,
        message: "You can only upload a resume once in 24 hours",
      });
    }
    req.email=email;
    next();

  } catch (error) {
    console.error("Validity middleware error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default validityMiddleware;