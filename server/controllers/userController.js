import { User } from "../models/userModel.js";


export const addUser = async (req, res) => {
  try {
    const { name, mobile, address, sex, age, startDate, endDate } = req.body;

    if (!name || !mobile) {
      return res.status(400).json({ message: "Name and mobile are required." });
    }

    const newUser = new User({
      name,
      mobile,
      address,
      sex,
      age,
      startDate,
      endDate,
    });


    const savedUser = await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: savedUser,
    });
  } catch (error) {
    // Handle duplicate mobile error
    if (error.code === 11000) {
      return res.status(409).json({ message: "Mobile number already exists." });
    }

    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error. Could not create user." });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }); // optional: sort by newest first

    res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error. Could not fetch users." });
  }
};

export const getExpiringSoon = async (req, res) => {
  try {
    const now = new Date();
    const fiveDaysFromNow = new Date();
    fiveDaysFromNow.setDate(now.getDate() + 5);

    const users = await User.find({
      endDate: {
        $lte: fiveDaysFromNow,
        $gte: now, // optional: only future dates
      },
    }).sort({ endDate: 1 }); // optional: soonest expiry first

    res.status(200).json({
      message: "Users with expiring memberships fetched successfully",
      users,
    });
  } catch (error) {
    console.error("Error fetching users with expiring memberships:", error);
    res.status(500).json({ message: "Server error. Could not fetch users." });
  }
};

// export const checkUser= async (req, res, next) => {
//     try {
        
//         res.json({ message: "user autherized" });
//     } catch (error) {
//         res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
//     }
// };

export const getUserById= async (req, res) => {
    try {
    const userId = req.params.id;

    const user = await User.findById(userId).lean(); // lean() for plain JS object

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

