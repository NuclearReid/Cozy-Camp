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
            weatherData {
                cod
                message
                cnt
                list {
                    dt
                    main {
                        temp
                        feels_like
                        temp_max
                        pressure
                        humidity
                    }
                    weather {
                        id
                        main
                        description
                        icon
                    }
                    clouds {
                        all
                    }
                    wind {
                        speed
                        deg
                    }
                    visibility
                    pop
                    sys {
                        pod
                    }
                    dt_txt
                }
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

