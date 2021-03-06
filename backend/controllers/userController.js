import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js'
// @desc Auth user & get token 
// @route POST / api/users/login
// @access public
const authUSer = asyncHandler(async (req,res) =>{
    const {email, password} = req.body
     const user = await User.findOne({email})
     if(user &&(await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email:user.email,
            phone:user.phone,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)   
        })
     } else{
         res.status(401)
         throw new Error('invalid email or password')
         
     }
})
// @desc GET user profile 
// @route GET / api/users/profile
// @access private
const getUSerProfile = asyncHandler(async (req,res) =>{
    const user = await User.findById(req.user._id)
    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email:user.email,
            phone:user.phone,
            isAdmin:user.isAdmin,
        })
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})
// @desc Update user profile 
// @route PUT / api/users/profile
// @access private
const updateUSerProfile = asyncHandler(async (req,res) =>{
    const user = await User.findById(req.user._id)
    if(user){  
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.phone = req.body.phone || user.phone
        if(req.body.password){
            user.password = req.body.password
        }
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email:updatedUser.email,
            phone:updatedUser.phone,
            isAdmin:updatedUser.isAdmin,
            token:generateToken(updatedUser._id)   
                })
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})
// @desc Register a new user
// @route POST / api/users/users
// @access public
const registerUSer = asyncHandler(async (req,res) =>{
    const { name ,email, password,phone} = req.body
    const userExists = await User.findOne({email})
    if( userExists ){
        res.status(400)
        throw new Error('User already exists')
    }
    const user = await User.create({
        name,
        email,
        password,
        phone
     })
     if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            phone:user.phone,
            token: generateToken(user._id),
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid user data')
    }
    
})
// @desc GET all users
// @route GET / api/users
// @access private/Admin
const getUsers = asyncHandler(async (req,res) =>{
    const users = await User.find({})
    res.json(users)
})
// @desc Delete user
// @route DELETE / api/users/:id
// @access private/Admin
const deleteUser = asyncHandler(async (req,res) =>{
    const user = await User.findById(req.params.id)
    if(user){
        await user.remove()
        res.json({message : 'user removed'})
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})
// @desc GET user by ID
// @route GET / api/users/:id
// @access private/Admin
const getUserById = asyncHandler(async (req,res) =>{
    const user = await User.findById(req.params.id).select('-password')
    if (user){
        res.json(user)
    } else{
        res.status(404)
        throw new Error('User not found')
    }
})
// @desc Update user  
// @route PUT / api/users/:id
// @access private/Admin
const updateUser = asyncHandler(async (req,res) =>{
    const user = await User.findById(req.params.id)
    if(user){  
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin 
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin,
                })
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})
export {authUSer,updateUser, getUserById,getUsers ,deleteUser,getUSerProfile ,registerUSer ,updateUSerProfile}