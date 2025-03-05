const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");   
const authorizeRoles = require("../middlewares/roleMiddleware");
const router = express.Router();


//Only admin can access this router 

router.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
    res.json({message: "Welcome Admin"});
});

// All can access this router 

router.get("/user", verifyToken,authorizeRoles("admin","dogwalker","dogowner"),(req, res) => {
    res.json({message: "Welcome User"});
});

module.exports = router;
