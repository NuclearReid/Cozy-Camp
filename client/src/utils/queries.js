import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    query Me {
        me {
            _id
            email
            username
            location
            options {
                _id
                shelter
                shelterDescription
                transport
                transportDescription
            }
        }
    }
`;

export const FIND_USER = gql`
    query findUser($username: String!) {
        user(username: $username) {
            _id
            username
            email
            location
            options {
                shelter
                shelterDescription
                transport
                transportDescription
            }
        }
    }
`

