import { useQuery } from "@apollo/client"


import { QUERY_ME } from "../../utils/queries"


export default function Profile(){

    const { loading, data} = useQuery(QUERY_ME)

    // console.log(data)

    return(
        <>
            <h1> Your email is: {data?.me?.email} </h1>
        </>
    )
}