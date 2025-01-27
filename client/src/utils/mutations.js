import { gql } from '@apollo/client';

/* 
 * Basic user stuff
 */
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

/* 
 * Options
 */

// Shelter
export const SET_SHELTER = gql`
    mutation SetShelter($shelter: String) {
        setShelter(shelter: $shelter) {
            options {
                shelter
            }
        }
    }
`
export const SET_SHELTER_DESCRIPTION = gql`
    mutation SetShelterDescription($shelterDescription: String) {
        setShelterDescription(shelterDescription: $shelterDescription) {
            options {
                shelter
                shelterDescription
            }
        }
    }
`

// Transport
export const SET_TRANSPORT = gql`
    mutation setTransport($transport: String) {
        setTransport(transport: $transport) {
            options {
                transport
            }
        }
    }
`
export const SET_TRANSPORT_DESCRIPTION = gql`
   mutation SetTransportDescription($transportDescription: String) {
        setTransportDescription(transportDescription: $transportDescription) {
            options {
                transportDescription
            }
        }
    }
`

