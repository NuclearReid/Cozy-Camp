import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    query Me {
        me {
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
`;

export const FIND_USER = gql`
    query FindUser($username: String!) {
        user(username: $username) {
            username
            options {
                shelter
                shelterDescription
            }
            
        }
    }
`