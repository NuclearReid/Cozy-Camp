import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    query Me {
        me {
            _id
            email
            username
            shelter
        }
    }
`;

export const FIND_USER = gql`
    query FindUser($username: String!) {
        user(username: $username) {
            _id
            email
            username
            shelter
        }
    }
`