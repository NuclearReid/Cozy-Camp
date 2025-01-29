require('dotenv').config()
const axios = require('axios')

const { User, Options } = require('../models')    
const {signToken, AuthenticationError } = require('../utils/auth')

const resolvers = {
    Query: {
        users: async() => {
            return User.find().populate('options')
        },
        
        me: async(parent, args, context) => {
            if(context.user){
                const foundUser = await User.findOne({
                    _id: context.user._id,
                }).populate('options')

                if(!foundUser){
                    throw AuthenticationError
                }
                
                // Fetch weather from OpenWeather API
                const apiKey = process.env.OPENWEATHER_API_KEY
                const location = foundUser.location
                let weatherData = null

                if(location) {
                    try {
                        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}`)
                        weatherData = response.data
                        console.log(weatherData)

                    } catch (error) {
                        console.error('Unable to get the weather data ', error)
                    }
                }

                return{
                    ...foundUser.toObject(),
                    weatherData
                }
            }

            throw AuthenticationError
        },

        user: async(parent, {username}) => {
            const foundUser = await User.findOne({username}).populate('options')
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
            // Create the option document for that user
            const options = await Options.create({})

            // Create the new user
            const user = await User.create({
                email,
                username,
                password,
                options: options._id
            })


            const populatedUser = await User.findById(user._id).populate('options')
            
            // Add the options to that user
            const token = signToken(populatedUser)

            // return the user with the options document attatched
            return {token, user: populatedUser}
        },

        login: async (parent, {email, password}) =>{
            const user = await User.findOne({ email }).populate('options')

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
        /*         
         * Location
        */
       setLocation: async(parent, {location}, context ) =>{
            if(context.user){
                const user = await User.findByIdAndUpdate(
                    context.user._id,
                    {location: location},
                    {new: true}
                )
                return user
            }
            throw AuthenticationError
       },


        /* 
         * Options
        */
        // Shelter
        setShelter: async (parent, { shelter }, context) => {
            if ( context.user ){
                const user = await User.findById(context.user._id).populate('options')
                const options = await Options.findByIdAndUpdate(
                    // gets the id of the user's 'Options' document
                    user.options._id,
                    // in that document updates the shelter with the shelter variable sent to it
                    { shelter: shelter },
                    { new: true }
                )
                // Updates the user with their new/updated Options document
                const updatedUser = await User.findById(context.user._id).populate('options')
                return updatedUser
            }
            throw AuthenticationError            
        },
        setShelterDescription: async (parent, {shelterDescription }, context ) => {
            if(context.user) {
                const user = await User.findById(context.user._id).populate('options')
                const options = await Options.findByIdAndUpdate(
                    user.options._id,
                    { shelterDescription: shelterDescription },
                    { new: true }
                )
                const updatedUser = await User.findById(context.user._id).populate('options')
                return updatedUser
            }
            throw AuthenticationError
        },

        // Transport
        setTransport: async ( parent, { transport }, context) => {
            if(context.user){
                const user = await User.findById(context.user._id).populate('options')
                const options = await Options.findByIdAndUpdate(
                    user.options._id,
                    { transport: transport },
                    {new: true}
                )
            
                const updatedUser = await User.findById(context.user._id).populate('options')
                return updatedUser
            }
            throw AuthenticationError
        },
        setTransportDescription: async (parent, {transportDescription}, context ) =>{
            if(context.user){
                const user = await User.findById(context.user._id).populate('options')
                const options = await Options.findByIdAndUpdate(
                    user.options._id,
                    { transportDescription: transportDescription },
                    { new: true }
                )
                const updatedUser = await User.findById(context.user._id).populate('options')
                return updatedUser
            }
            throw AuthenticationError
        },

    }
}

module.exports = resolvers