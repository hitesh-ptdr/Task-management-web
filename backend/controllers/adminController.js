const Admin = require('../models/Admin');
const Developer = require('../models/Developer');
const Company = require("../models/Company");
 
exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password, companyName } = req.body;

    // check existing admin
    let existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // create company
    const company = await Company.create({
      name: companyName || `${name}'s Company`,
    });

    // create admin with companyId
    const admin = await Admin.create({
      name,
      email,
      password,
      companyId: company._id, // 🔥 IMPORTANT
    });

    // set owner
    company.owner = admin._id;
    await company.save();

    res.status(201).json(admin);

  } catch (error) {
    res.status(500).json({ message: "Failed to create admin", error });
  }
};
 exports.addDeveloper = async(req, res) => {
   const developer = await Developer.create(req.body);
   res.json(developer); 
 };

  exports.getAllDeveloper = async(req, res) => {
   const developer = await Developer.find();
   res.json(developer); 
 };   
  
 exports.deleteDeveloper = async(req,res)=>{
  const developer = await Developer.findByIdAndDelete(req.params.id);
  res.send('Developer Deleted'); 
 } 