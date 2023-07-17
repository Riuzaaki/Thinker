const mongoose = require('mongoose')

const StorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true //trim is basically white space
    },
    body: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'public',
        enum: ['public', 'private']
    },
    //each story will be connected to a user using object Id
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' //reference to the user model

    },
    
    createdAt: {
        type: Date,
        default: Date.now //automatically puts current date and time
    }
})

module.exports = mongoose.model('Story' , StorySchema)