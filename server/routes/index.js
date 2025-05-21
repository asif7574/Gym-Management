import e from 'express';
import { adminRouter } from './adminRoutes.js';

import { userRouter } from './userRoutes.js';



const router=e.Router()

router.use('/admin',adminRouter)
router.use('/user',userRouter)





export {router as apiRouter}