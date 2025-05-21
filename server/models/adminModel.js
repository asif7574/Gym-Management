import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
    {
        
        name: {
            type: String,
            required: true,
            maxLength: 30,
            unique:true,
        },
       
        password: {
            type: String,
            required: true,
            minLength: 6,
        },
       
       
    },
);

export const Admin = mongoose.model("Admin", adminSchema);