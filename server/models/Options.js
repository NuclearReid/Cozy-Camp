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
    }
    
})

const Options = model('Options', optionsSchema)

module.exports = Options