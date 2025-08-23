const Admin = require('../models/Admin');
const Developer = require('../models/Developer');
 
exports.createAdmin = async(req , res ) => {
    try{
        const admin = await Admin.create(req.body);
        res.status(201).json(admin); 
    } catch (error) {
        res.status(500).json({message: 'Failed to create admin', error});
    } 
}

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