const express = require("express") ;
const router = express.Router() ;


const { createUser, getUser, getUsers,updateUser,deleteUser} = require("../controller/userController");
const validateUser = require("../middleware/vallidate");

router.get("/", getUsers);

router.get("/:id", getUser);
router.post("/", validateUser, createUser);

router.put("/:id", validateUser, updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
