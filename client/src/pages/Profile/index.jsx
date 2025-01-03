import { useQuery } from "@apollo/client"
import { QUERY_ME } from "../../utils/queries"

import ShelterForm from '../../components/ShelterForm'
import { useEffect, useState } from "react"


export default function Profile(){

    const { loading, data} = useQuery(QUERY_ME)
    const [shelter, setShelter ] = useState('cowboy')

    useEffect(() =>{
        if(data) {
            setShelter(data?.me?.shelter)
        }
    }, [data])

    const handleShelterUpdate = (newShelter) => {
        setShelter(newShelter)
    }

    return(
        <>
            <h1> Hey there! {data?.me?.username} </h1>
            <p> Your current shelter of choice is a {shelter} </p>
            <ShelterForm onShelterUpdate={handleShelterUpdate}/>
            <a href="/scene" className="btn btn-primary mt-3">
                Your scene
            </a>
        </>
    )
}