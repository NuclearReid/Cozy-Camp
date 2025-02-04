import { useQuery } from "@apollo/client"
import { QUERY_ME_NO_WEATHER } from "../../utils/queries"

import ShelterForm from '../../components/forms/ShelterForm'
import SearchBar from "../../components/SearchBar"
import { useEffect, useState } from "react"
import TransportForm from "../../components/forms/TransportForm"
import LocationForm from "../../components/forms/LocationForm"


export default function Profile(){

    const { loading, data} = useQuery(QUERY_ME_NO_WEATHER)

    // User Location
    const [location, setLocation] = useState(data?.me?.location)

    // Shelter
    const [shelter, setShelter ] = useState(data?.me?.options?.shelter)
    const [shelterDescription, setShelterDescription] = useState(data?.me?.options?.shelterDescription)
    // Transport
    const [transport, setTransport] = useState(data?.me?.options?.transport)
    const [transportDescription, setTransportDescription] = useState(data?.me?.options?.transportDescription)

    useEffect(() =>{
        if(data) {
            // will update the option if they're changed
            setLocation(data?.me?.location)
            setShelter(data?.me?.options?.shelter)
            setShelterDescription(data?.me?.options?.shelterDescription)
            setTransport(data?.me?.options?.transport)
            setTransportDescription(data?.me?.options?.transportDescription)
        }
    }, [data])

    /* 
     * This feels clunky. I think I can do this better? Maybe actions and reducers?
     */

    // handle when you change the location
    const handleLocationUpdate = async( newLocation ) => {
        if(newLocation.trim() != ""){
            setLocation(newLocation)
        }
    }

    // Set the new shelter in the state and have it upda'te on the profile
    const handleShelterUpdate = async (newShelter, newShelterDescription) => {
        // console.log(newShelter)
        setShelter(newShelter)
        // Makes it so the shelter description will only update if I send it a value
        if(newShelterDescription.trim() != ""){
            setShelterDescription(newShelterDescription)
        }
    }

    // for the transport form || I don't know if these have to be their own function? maybe consolidate it with the one above?
    const handleTransportUpdate = async (newTransport, newTransportDescription) => {
        setTransport(newTransport)
        if(newTransportDescription.trim() != ""){
            setTransportDescription(newTransportDescription)
        }
    }


    return(
        <>
            <SearchBar />
            <h1> Hey there! {data?.me?.username} </h1>
            <p>Your current location is set to: {location}</p>
            <LocationForm
                onLocationUpdate={handleLocationUpdate}
                currentLocation={location}
            />

            <p> Your current shelter of choice is a {shelter} </p>

            {/* Get the new shelter that was chosen in the form */}
            <ShelterForm 
                onShelterUpdate={handleShelterUpdate}
                currentShelter={shelter} 
                currentShelterDescription={shelterDescription}
            />
            <TransportForm
                onTransportUpdate={handleTransportUpdate}
                currentTransport={transport}
                currentTransportDescription={transportDescription}
            />

            <a href="/scene" className="btn btn-primary mt-3">
                Your scene
            </a>
        </>
    )
}