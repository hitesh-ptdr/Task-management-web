const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin'); 
const Developer = require('../models/Developer');
   

exports.loginAdmin = async (req , res) => {
    const {username, password} = req.body;
    try {
        const admin = await Admin.findOne({ username, password });          
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, role: 'admin' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }         
} 

exports.loginDeveloper = async (req, res) => {
    const { username, password } = req.body;
    try {
        const developer = await Developer.findOne({ username, password });
        if (!developer) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: developer._id, role: 'developer' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, role: 'developer' });  
    } catch (error) {   
        console.error('Login error:', error);      
        res.status(500).json({ message: 'Internal server error' });
    }
}
