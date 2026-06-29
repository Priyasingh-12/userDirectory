
const User = require("../models/User");

// ========== get user ================
const getUsers = async(req,res,next) => {
  try {
    const users = await User.find() ;
    res.status(200).json(users)

  } catch (error) {
     next(error);
 }
};

// =========== get single user ===========
const getUser = async(req,res,next) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({
               message: "User not found",
            })
        }
        res.status(200).json(user)
    } catch (error) {
        next(error);
    }
};
// ========== create user ===============

const createUser = async(req, res,next) => {
    try {
        const user = await User.create(req.body) ;
         res.status(201).json(user)
    } catch (error) {
         next(error);
    }
} ;
// ====================== update user ============
const updateUser = async(req,res,next) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body ,
            {new: true}
        ) ;
        if (!user) {
    return res.status(404).json({
        message: "User not found"
    });
}
        res.status(200).json(user)
    } catch (error) {
         next(error);
    }
};

// ================= delete user =================
const deleteUser = async(req, res,next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id) ;
        res.status(200).json({
             message: "User deleted successfully",
        })
        if (!user) {
    return res.status(404).json({
        message: "User not found"
    });
}
    } catch (error) {
          next(error);
    }
}
module.exports = {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
};