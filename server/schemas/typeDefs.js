const { gql } = require('apollo-server-express')

const typeDefs = gql`
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