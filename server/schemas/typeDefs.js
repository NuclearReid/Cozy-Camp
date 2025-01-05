const { gql } = require('apollo-server-express')

const typeDefs = gql`

    type User {
        _id: ID
        email: String!
        username: String!
        password: String!
        shelter: String
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
    }
`

module.exports = typeDefs