const dashBoardLoader = (req,res,next)=>{
    if(req.session.userInfo.type=="Admin")//check the admin
    {
       res.render("User/adminDashboard")
    }
    else if (req.session.userInfo.type=="Clerk")//check the clerk 
    {
        res.render("User/clerkDashboard")
    }
    else
    {
        res.render("User/loginsub")
    }
}

module.exports=dashBoardLoader;
//I cannot have two functions after loggin authentation,so I combined the admin and clerk into one authentation//