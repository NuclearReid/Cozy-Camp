const { gql } = require('apollo-server-express')

const typeDefs = gql`

    type WeatherData {
        cod: String
        message: Int
        cnt: Int
        list: [WeatherList]
    }
    
    type WeatherList {
        dt: Int
        main: WeatherMain
        weather: [WeatherCondition]
        clouds: WeatherClouds
        wind: WeatherWind
        visibility: Int
        pop: Float
        sys: WeatherSys
        dt_txt: String
    }
    type WeatherMain {
        temp: Float
        feels_like: Float
        temp_min: Float
        temp_max: Float
        pressure: Int
        humidity: Int
    }

    type WeatherCondition {
        id: Int
        main: String
        description: String
        icon: String
    }

    type WeatherClouds {
        all: Int
    }

    type WeatherWind {
        speed: Float
        deg: Int
    }

    type WeatherSys {
        pod: String
    }


    type Options {
        _id: ID
        shelter: String
        shelterDescription: String
        transport: String
        transportDescription: String
    }

    type User {
        _id: ID
        email: String!
        username: String!
        password: String!
        location: String
        options: Options
        weatherData: WeatherData
    }

    type Auth {
        token: String
        user: User
    }
    
    type Query{
        users: [User]
        me: User
        user(username: String!): User
    }

    type Mutation{
        addUser(
            email: String!
            username: String!
            password: String!
        ): Auth

        login(
            email: String!
            password: String!
        ): Auth

        setLocation(
            location: String
        ): User

        setShelter(
            shelter: String
        ): User

        setShelterDescription(
            shelterDescription: String
        ): User

        setTransport(
            transport: String
        ): User

        setTransportDescription(
            transportDescription: String
        ): User
    }


`

module.exports = typeDefs