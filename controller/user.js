const User = require("../models/user")

module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs")
};

module.exports.signup =async(req,res)=>{
    try{
        let {username,email,password}= req.body;
        const newUser = new User({email,username});
        const registeredUSer = await User.register(newUser,password)
        console.log(registeredUSer);
        req.login(registeredUSer,(err)=>{
            if(err){
                return next(err)
            }
            req.flash("success","Welcome to WanderLust!");
            res.redirect("/listings");
        });
    } catch(e){
        req.flash("error",e.message);
        res.redirect("/signup")
    }
};

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
};
module.exports.logIn = async (req,res)=>{
    req.flash("success","Welcome back to Wanderlust!");
    let redirectUrl= res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logOut = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","You are logged out!");
        res.redirect("/listings")
    });
};