import e from "express";
import { addUser, getAllUsers, getExpiringSoon, getUserById } from "../controllers/userController.js";






const router= e.Router();


router.post('/add-user',addUser)
router.get('/get-users',getAllUsers)
router.get('/expiry-users',getExpiringSoon)
router.get('/user-id/:id',getUserById)
// router.put('/logout',userLogout)
// router.get('/profile',userAuth,userProfile)




export {router as userRouter}