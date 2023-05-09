const express = require('express');
const router = express.Router();
const bcrypt= require('bcryptjs');
const config = require('config');
const jwt=require('jsonwebtoken');

//Admin Model
const Admin = require('../../models/Admin');


// @route POST api/adminlogin
//@description Authenticate admin
//@access private

router.post('/', (req,res)=>{
    const {email,password}= req.body;

    // Validation
    if(!email || ! password){
        return res.status(400).json({msg:'Please enter all fields'});
    }
// Check for existing admin
Admin.findOne({email})
.then(admin=>{
    if(!admin) return res.status(400).json({msg:'Admin does not exist'});

    // Validate password
    bcrypt.compare(password,admin.password)
    .then(isMatch=>{
        if(!isMatch) return res.status(400).json({msg:'Invalid credentials'});

        jwt.sign(
            {id:admin.id},
            config.get('jwtsecret'),
            {expiresIn : 3600 }, 
            (err,token)=>{
                if(err) throw err;

                res.json({
                    token,
                    admin:{
                        id:admin.id,
                        name:admin.name,
                        email:admin.email
                    }
                });
            }
        )

    })
})
});

// @route GET api/adminlogin/admin
//@description GET admin data
//@access Private
 router.get('/adminlogin',auth,(req,res)=>{
   User.findById(req.admin.id)
   .select('-password')
   .then(admin=>res.json(admin));
   });
    
module.exports = router;