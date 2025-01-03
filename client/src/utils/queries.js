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
    query findUser($username: String!){
        findUser(username: $username){
            _id
            username
            shelter
        }
    }
`