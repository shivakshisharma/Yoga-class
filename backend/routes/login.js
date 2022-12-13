const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const valid = require("../utils");
const jwt = require("jsonwebtoken");
const JwtTokens = require("../models/JwtToken");

module.exports = (app) =>{
   /**
   * @swagger
   * /api/login:
   *   post:
   *     description: login verified user
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: email
   *         description: User's email.
   *         required: true
   *         type: string
   *         in : body
   *       - name: password
   *         description: User's password.
   *         required: true
   *         type: string  
   *         in : body
   *     responses:
   *       200:
   *         description: jwt token
   */
    app.post('/api/login', async (req,res)=>{
        const{email, password,age} = req.body;
        if(!valid.emailValid(email)){
            return res.status(400).json({status:'fail',message:'Invalid email address'})
        }
        if(!valid.passValid(password)){
            return res.status(400).json({status:'fail',message:'Password must be eight characters long and contain at least one lowercase letter, one uppercase letter, one number and one special character.'})
        }
        const user = await User.findOne({email}).lean();
        if(!user){
            return res.status(400).json({status:'fail',message:'Email does not have account!'})
        }
        if(!user.verified){
            return res.status(400).json({status:'fail',message:'Email is not verified, please verify your email!'})
        }
        if(!await bcryptjs.compare(password, user.password)){
            return res.status(400).json({status:'fail',message:'Invalid email and password !'})
        }
        const _id = user._id
        try{
            const jwtToken = jwt.sign({id:_id},process.env.JWT_SECRET);
            res.status(200).json({status:'ok',token:jwtToken});
            const response = await JwtTokens.create({
                jwtToken: jwtToken
            })           
        }catch(err){
            console.log(err)
            return res.status(400).json({statu:'fail',message:'Something went wrong!'})
        }
    })
}