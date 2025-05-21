import e from "express";
import { adminLogin, adminLogout, checkAdmin, registerAdmin, searchUsersByName } from "../controllers/adminController.js";
import { adminAuth } from "../middlewares/adminAuth.js";





const router= e.Router();

router.post('/register', registerAdmin );
router.post('/login', adminLogin );
router.post('/logout',adminAuth ,adminLogout );
router.get('/check-admin',adminAuth ,checkAdmin );
router.get('/search',searchUsersByName  );


export {router as adminRouter}