import "dotenv/config";

import express from "express";
import mongoose from "mongoose";

import send_Otp from "./otpSystem/sendOtp.js";
import verify_Otp from "./otpSystem/verifyOtp.js";
import userSignIn from "./AuthHandelar/signin.js";
import userSignUp from "./AuthHandelar/signup.js";
import refreshToken from "./AuthHandelar/refresh.js";
import adminCreatePost from "./DriveHandler/createPost.js";
import adminDeletePost from "./DriveHandler/deletePost.js";
import adminEditPost from "./DriveHandler/editPost.js";
import fetchPost from "./DriveHandler/reterivePost.js";
import application from "./Application/matchResume.js";
import report from "./PlacementReportHandler/placementReport.js";
import setStatus from "./PlacementReportHandler/placementStatusSet.js";
import forget from "./AuthHandelar/forgetPassword.js"


const app = express();

app.use(express.json());

await mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("database connected");
    })
    .catch((err) => {
        console.log(err);
    });

app.use('/api/send_Otp', send_Otp);
app.use('/api/verify_Otp', verify_Otp);
app.use('/api/userSignIn', userSignIn);
app.use('/api/userSignUp', userSignUp);
app.use('/api/refreshToken', refreshToken);
app.use("/api/adminCreatePost",adminCreatePost);
app.use("/api/adminDeletePost",adminDeletePost);
app.use("/api/adminEditPost",adminEditPost);
app.use("/api/fetchPost",fetchPost);
app.use("/api/application",application);
app.use("/api/report",report);
app.use("/api/setStatus",setStatus);
app.use("/api/admin",application);
app.use("/api/forget",forget);


app.get('/', (req, res) => {
    res.json("hello world???");
});

app.listen(3000, () => {
    console.log("hii welcome to the server.....");
});