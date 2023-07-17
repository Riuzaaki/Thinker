const mongoose = require('mongoose')

//whne u work with mongo db , u need promises , herer we use async await instead of .then()
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, { //then we put in some options to avoid any warnings in the console
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useFindAndModify: false
            //all the above options are now default in mongoose 6 , no need to mention them
        })

        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (err) {
            console.error(err)
            process.exit(1)
    }
}

module.exports = connectDB //now we can use this in the app.js file