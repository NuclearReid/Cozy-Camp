const { Schema, model} = require('mongoose')

const optionsSchema = new Schema({
    shelter:{
        type: String,
        default: 'cowboy'
    },
    shelterDescription: {
        type: String,
        default: 'Just me and the stars!',
        maxlength: 500,
    },
    transport: {
        type: String,
        default: 'backpack'
    },
    transportDescription: {
        type: String,
        default: "It's not about the destination for me!"
    }
    
})

const Options = model('Options', optionsSchema)

module.exports = Options