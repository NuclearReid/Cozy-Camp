const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        // Set up other requirements later
    },
    location: {
        type: String
    },
    options: {
        type: Schema.Types.ObjectId,
        ref: 'Options'
    }
})

userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10) // the 10 is salt rounds
    }
    next()
})

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

const User = model('User', userSchema)

module.exports = User