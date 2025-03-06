const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");   
const authorizeRoles = require("../middlewares/roleMiddleware");
const router = express.Router();


//Only admin can access this router 

router.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
    res.json({message: "Welcome Admin"});
});

// admin and dogwalker can access this router
router.get("/dogwalker", verifyToken, authorizeRoles("admin","dogwalker"), (req, res) => {
    res.json({message: "Welcome Dogwalker"});
});

// admin and dogowner can access this router
router.get("/dogowner", verifyToken, authorizeRoles("admin","dogowner"), (req, res) => {
    res.json({message: "Welcome Dogowner"});
});



module.exports = router;
