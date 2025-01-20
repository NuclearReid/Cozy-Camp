import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation addUser($email: String!, $username: String!, $password: String!) {
        addUser(email: $email, username: $username, password: $password) {
            token
            user {
                _id
                email
                username
                options {
                    _id
                    shelter
                    shelterDescription
                }
            }
        }
    }
`

export const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                email
            }
        }
    }
`

export const SET_SHELTER = gql`
    mutation SetShelter($shelter: String) {
        setShelter(shelter: $shelter) {
            options {
                shelter
            }
        }
    }
`