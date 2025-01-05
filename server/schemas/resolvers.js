const { User } = require('../models')
const {signToken, AuthenticationError } = require('../utils/auth')

const resolvers = {
    Query: {
        users: async() => {
            return User.find()
        },
        me: async(parent, args, context) => {
            if(context.user){
                const foundUser = await User.findOne({
                    _id: context.user._id,
                })
                return foundUser
            }
            throw AuthenticationError
        },
        user: async(parent, {username}) => {
            const foundUser = await User.findOne({username})
            try {
                if(!foundUser){
                    throw new Error('no user found')
                }
                return foundUser
            } catch (error) {
                console.error(error)
            }
        }

    },

    Mutation: {
        addUser: async (parent, {email, username, password}) =>{
            const user = await User.create({
                email,
                username,
                password
            })
            const token = signToken(user)
            return {token, user}
        },
        login: async (parent, {email, password}) =>{
            const user = await User.findOne({ email })

            if(!user){
                throw AuthenticationError
            }

            const correctPw = await user.isCorrectPassword(password)

            if(!correctPw){
                throw AuthenticationError
            }
            const token = signToken(user)

            return{token, user} 
        },
        setShelter: async (parent, { shelter }, context) => {
            if ( context.user ){
                const updatedUser = await User.findByIdAndUpdate(
                    context.user._id,
                    {$set: {shelter: shelter}},
                    {new: true}
                )
                return updatedUser
            }
            throw AuthenticationError            
        }

    }
}

module.exports = resolvers