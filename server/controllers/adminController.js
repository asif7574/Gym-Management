import bcrypt from 'bcrypt';
import { Admin } from '../models/adminModel.js';
import { generateTokenAdmin } from '../utils/token.js';
import { User } from '../models/userModel.js';

export const registerAdmin = async (req, res) => {
  try {
    const { name, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ name });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new admin
    const newAdmin = new Admin({ name, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const adminLogin= async (req,res,next)=>{
    try {
        const {name,password}=req.body;
        if(!name || !password){
            return res.status(400).json({message:"all fields are required"})
        }


        const adminExist= await Admin.findOne({name});
        if(!adminExist){
            return res.status(400).json({message:"admin not exist"})
        }

        const issPasswordMatch= bcrypt.compareSync(password,adminExist.password)

        if(!issPasswordMatch){
            return res.status(400).json({message:"You have Entered the Wrong password"})
        }

        
        const token = generateTokenAdmin(adminExist,'admin')
        
        
        

        res.cookie('token',token, {
            sameSite: "None",
            secure: true,
            httpOnly: true,
        });
        
        res.json({message:"admin logined succesfully"})

    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
}


export const adminLogout = async (req, res, next) => {
    try {
        
        res.clearCookie('token', {
            sameSite: "None",
            secure: true,
            httpOnly: true,
        });

        res.json({ message: "user logout success" });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};


export const checkAdmin= async (req, res, next) => {
    try {
        
        res.json({ message: "Admin autherized" });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};


export const searchUsersByName = async (req, res) => {
     try {
    const { name } = req.query;
    if (!name) return res.status(400).json([]);

    const users = await User.find({
      name: { $regex: name, $options: "i" }, // Case-insensitive partial match
    }).select("name _id");

    res.json(users);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Server error" });
  }
};