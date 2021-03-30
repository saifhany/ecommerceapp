import express from 'express';
const router = express.Router();
import { authUSer  ,deleteUser ,updateUser ,getUsers , getUSerProfile ,registerUSer ,updateUSerProfile, getUserById } from '../controllers/userController.js';
import { protect ,admin} from '../middleware/authMiddleware.js'
router.route('/').post(registerUSer).get(protect,admin,getUsers);
router.post('/login',authUSer)
router.route('/profile')
.get( protect ,getUSerProfile)
.put(protect,updateUSerProfile)
router.route('/:id')
.delete(protect,admin,deleteUser)
.get(protect,admin,getUserById)
.put(protect,admin, updateUser)
export default router