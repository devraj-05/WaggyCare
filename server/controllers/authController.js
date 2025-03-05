const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const User = require("../models/userModel");

const register = async (req, res) => {
    try{
   const {username,password,role} = req.body;
   console.log(req.body);
   
   const hashedPassword = await bcrypt.hash(password, 10);

   console.log(hashedPassword);
   

   const newUser = new User({
       username,
       password: hashedPassword,
       role
   });
  const user =  await newUser.save();
   console.log(user);
   
    res.status(201).json({message: `User registered with username ${username}`});
    } catch (error) {
        console.error("Error during user registration:", error);
        res.status(500).json({ message: error.message });
    }
};
const login = async (req, res) => {
    try{
    const {username,password} = req.body;
    const user = await User.findOne({username});
    if(!user){
        return res.status(404).json({message: `User with username ${username} not found`});
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({message: "Invalid credentials"});
    }
    const token = jwt.sign(
        {id:user._id, role: user.role},
        process.env.JWT_SECRET,
        {expiresIn: "1h"}
    );
    res.status(200).json({message: `User logged in with username ${username}`, token
    });
    } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: error.message });
}
};

module.exports = {
    register,
    login
};