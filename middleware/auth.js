module.exports = {
    ensureAuth: function(req,res,next){
        if(req.isAuthenticated())
        {
            return next()
        }
        else{
            res.redirect('/')
        }
    },
    ensureGuest: function(req,res,next){
        if(req.isAuthenticated())
        {
            res.redirect('/dashboard')
        }else{
            return next()
        }
    }//we can't allow guests to go to dashboard directly without logging in
}
//basically , Protected routes