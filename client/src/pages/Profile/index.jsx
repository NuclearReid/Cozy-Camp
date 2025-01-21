import { useQuery } from "@apollo/client"
import { QUERY_ME } from "../../utils/queries"

import ShelterForm from '../../components/ShelterForm'
import SearchBar from "../../components/SearchBar"
import { useEffect, useState } from "react"


export default function Profile(){

    const { loading, data} = useQuery(QUERY_ME)
    const [shelter, setShelter ] = useState(data?.me?.options?.shelter)

    useEffect(() =>{
        if(data) {
            setShelter(data?.me?.options?.shelter)
        }
    }, [data])

    // Set the new shelter in the state and have it update on the profile
    const handleShelterUpdate = async (newShelter) => {
        setShelter(newShelter)
    }

    return(
        <>
            <SearchBar />
            <h1> Hey there! {data?.me?.username} </h1>
            <p> Your current shelter of choice is a {shelter} </p>
            {/* Get the new shelter that was chosen in the form */}
            <ShelterForm onShelterUpdate={handleShelterUpdate} currentShelter={data?.me?.options?.shelter}/>
            <a href="/scene" className="btn btn-primary mt-3">
                Your scene
            </a>
        </>
    )
}