import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },

    email: {
        type: String
    },

    password: {
        type: String
    },

    role:{
        type:String,
        enum: ["student", "admin","superadmin"],
        default: "student"
    },
    status:{
    type: String,
    enum: ["placed", "unplaced"],
    default: "unplaced"
    }
});

const User=mongoose.model("User",userSchema);

export default User;
