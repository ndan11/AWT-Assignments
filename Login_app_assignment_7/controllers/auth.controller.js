const User = require("../models/User")

module.exports = {

    signUp : async(req,res) => {
        try{
            const user = new User({
                name : req.body.name,
                email : req.body.email,
                password : req.body.password
            })
            await user.save()
            res.status(200).json({
                err: false,
                msg: "Successfully signed up."
            })
        }catch(error){
            console.log(error)
            res.status(400).json({
                err: true,
                msg: "Could not sign up."
            })
        }
    },

    login : async(req,res) => {
        try{
            let user = await User.findOne({email : req.body.email})
            if(!user){
                res.status(400).json({
                    err: true,
                    msg: "Email does not exist."
                })
            }
            if(user.authenticate(req.body.password)){
                res.status(200).json({
                    err: false,
                    data: user._doc,
                    msg: "Successfully logged in."
                })
            }else{
                res.status(400).json({
                    err: true,
                    msg: "Email and password do not match."
                })
            }
        }catch(error){
            console.log(error)
            res.status(400).json({
                err: true,
                msg: "Could not login."
            })
        }
    }

}