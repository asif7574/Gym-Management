import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxLength: 30,
        },
        mobile: {
            type: Number,
            required: true,
            unique:true,
            maxLength: 10,
            minLength: 10,
            trim:true,
        },
        address: {
            type: String,
        },
        sex: {
            type: String,
            enum: ["Male", "Female"],
        },
        age: {
            type: Number,
        },
        status: {
            type: Boolean,
            default:true
        },
        startDate:{
            type: Date,
        },
        endDate:{
            type: Date,
        },

    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);