import jwt from "jsonwebtoken";

export const adminAuth = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        // Verify the token using a strong secret key
        const tokenDecoded = jwt.verify(token, process.env.JWT_KEY);

        if(!tokenDecoded){
            return res.status(401).json({ message: "admin not autherized" });
        }

        req.admin = tokenDecoded;
        console.log(req.admin);
        
        
        
// console.log(req.employee);

        next();

    } catch (error) {
        // Handle other errors
        return res.status(500).json({ message: "Internal Server Error in auth" });
    }
};
