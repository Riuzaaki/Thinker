const express = require('express')
const router = express.Router()
const {ensureAuth , ensureGuest} = require('../middleware/auth') //only signed in users can go to dashboard , guests can't

const Story = require('../models/Story') //bring in our story model file Story.js

//desc      Log-in/landing page
//route     GET/

router.get('/' ,ensureGuest , (req , res) => {
    res.render('login' , {
        layout: 'login',
        // tells the route to use the login layout from the login file from layouts folder
    })
})

//desc      Log-in/landing page
//route     GET/dashboard

router.get('/dashboard' , ensureAuth , async (req , res) => {
    
    try {
        //limit finding stories to the current user only through user.id
        const stories = await Story.find({ user: req.user.id }).lean() //.lean() is used to pass the data in a template in handlebars , 
                                                                       //basically passes data as javascript objects and not mongoose documents
        res.render('DashBoard' ,{
            name: req.user.firstName,stories
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }

})

module.exports = router

