const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Signup function to register a new user
exports.signup = async(req,res) =>{
    const {name, email, password} = req.body;
    try {
        // let user = await User.find({email});
        // if(user){
        //     return res.status(400).json({message: 'User already exists'});
        // }
        const hashedPassword = await bcrypt.hash(password,10);
        user = new User({
            name,
            email,
            password: hashedPassword
        });
        await user.save();
        res.status(201).json({message: 'User created successfully'});
    } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});

    }
}

//Login function to authenticate a user
exports.login = async (req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
        
    }
}

// Token validation route (for protected routes / auto-login)
exports.validateToken = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Expecting: "Bearer token"

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password'); // Exclude password

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user }); // You can customize response as needed
    } catch (error) {
        res.status(401).json({ message: 'Invalid token', error: error.message });
    }
};
