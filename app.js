//express server setup
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv') // this will have our config , our variables
const morgan = require('morgan') //so that it shows in the console , whenever any request is made , basically , for data logging
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session') //required to work with passport sessions 
const MongoStore = require('connect-mongo')//(session) //passing the session from above line
const connectDB = require('./config/db')
//const { default: mongoose } = require('mongoose')


//Load the config file
dotenv.config({ path: './config/config.env' })

//passport config
require('./config/passport')(passport)

connectDB()

const app = express() //initialize our app

//BODY parser middleware
app.use(express.urlencoded({extended : false}))
app.use(express.json())

//Method Override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  })
)

//loggings , this is the morgan middleware , it checks if environment is in development mode , if yes , then logs accordingly
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

//HandleBars helpers
const { formatDate , stripTags , truncate ,editIcon ,select } = require('./helpers/hbs')

//HandleBars
app.engine('.hbs', 
//earlier , exphbs was used as a fucntion , now its exphbs.engine()
exphbs.engine({ 
  // add the fbs helpers from above
  helpers: {
    formatDate,
    stripTags,
    truncate,
    editIcon,
    select,
  },
  defaultLayout: 'main',
  extname: '.hbs' 
})
)
app.set('view engine', '.hbs');

//sessions middleware
app.use(session({
    secret: 'linpaws',
    resave: false, //we dont wanna save a session if nothing is modified
    saveUninitialized: false, //create a session until sthng is stored : false
    //cookie: { secure: true } //won't work qithout https
    store: MongoStore.create({
      mongoUrl: 'mongodb+srv://cengage:linpaws421@cluster0.xrk9weh.mongodb.net/?retryWrites=true&w=majority'
    })
  }))

//passport middleware
app.use(passport.initialize())
app.use(passport.session()) //to use these passport sessions , we need express sessions too

//set express global variable
app.use(function(req,res,next){
  // allows us to access our user from within our templates
  res.locals.user = req.user || null
  next()
})

//static-folder
app.use(express.static(path.join(__dirname, 'public')))

//routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth')) 
app.use('/stories', require('./routes/stories'))


const PORT = process.env.PORT || 8000
//process.env allows us to use the variables in the config,env file , like PORT

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))

