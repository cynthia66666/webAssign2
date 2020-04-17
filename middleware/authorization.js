const dashBoardLoader = (req,res,next)=>{
    if(req.session.userInfo.type=="Admin")
    {
       res.render("User/adminDashboard")
    }
    else
    {
        res.render("User/loginsub")
    }
}
module.exports=dashBoardLoader;