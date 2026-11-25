import mongoose from "mongoose";

const drivePostSchema = new mongoose.Schema(
  {
    roleTitle: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    section: {
      type: String,
      enum: ["live", "upcoming", "completed"],
      default: "Live",
      required: true,
    },

    statusLabel: {
      type: String,
      required: true,
      trim: true,
    },

    driveDate: {
      type: Date,
      required: true,
    },

    expectedCTC: {
      type: String,
      required: true,
      trim: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },
    applicationLink:{
      type:String
    },
    jdGoogleDriveLink:{
      type:String
    },
    eligibilityCriteria:{
      type:String
    },
    batch:{
       type:Number,
       default:0
    },
    placedStudent:{
      type:Number,
      default:0
    }
  },
  {
    timestamps: true,
  }
);

const DrivePost = mongoose.model("DrivePost", drivePostSchema);

export default DrivePost;