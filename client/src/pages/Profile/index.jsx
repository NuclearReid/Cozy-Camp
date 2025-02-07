import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { useQuery } from "@apollo/client"
import { QUERY_ME_NO_WEATHER } from "../../utils/queries"
import { useEffect, useState } from "react"
import useStore from "../../stores/useStore"

import ShelterForm from '../../components/forms/ShelterForm'
import SearchBar from "../../components/SearchBar"
import TransportForm from "../../components/forms/TransportForm"
import LocationForm from "../../components/forms/LocationForm"


export default function Profile(){

    const { loading, data} = useQuery(QUERY_ME_NO_WEATHER)

    // This is here to put something into the global state. If it's left empty, the code will break because other sections are reliant on there being something in the global state. It's easier to fill it here than to set checks for it in a different sections of the code
    const setSearchedUser = useStore((state) => state.setSearchedUser)
    const setTheGlobalState = (event => {
        if(data?.me) {
            setSearchedUser(data.me)
        }
    })
    setTheGlobalState()


    
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
        <Container>
            
            <Row>
                <Col md={6} className='equal-card-height'>
                    <Card className='w-100'>
                        <Card.Body>
                            <Card.Title>Welcome Back, {data?.me?.username}!</Card.Title>
                            <Card.Text>
                                <strong>How to use this site! (it's still under development)</strong>
                                <ul>
                                    <li>With your selections, your scene will be a 3D render of your campsite.</li>
                                    <li>Do you spend your time in the woods? How do you get there, what do you use for shelter? Want to show others?</li>
                                    <li>Set your city as your location and your camp scene will adjust to your day/night cycle (it uses OpenWeatherAPI).</li>
                                    <li>Do you sleep in a hammock, tent, or nothing?</li>
                                    <li>Fill out the form with that info and give a description for others to see your opinion on it.</li>
                                    <li>How do you get to your campsite? Let us know with the transportation form!</li>
                                </ul>
                                <p><em>There is more to come, just working out some of the kinks right now.</em></p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} className='equal-card-height'>
                    <Card className='w-100'>
                        <Card.Body>
                            <Card.Text>
                                Your current location is set to: {location}
                            </Card.Text>
                            <LocationForm 
                                onLocationUpdate={handleLocationUpdate} 
                                currentLocation={location} 
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col md={6}>
                    <Card className='mb-3'>
                        <Card.Body>
                            <ShelterForm
                                onShelterUpdate={handleShelterUpdate}
                                currentShelter={shelter}
                                currentShelterDescription={shelterDescription}
                            />
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} >
                    <Card>
                        <Card.Body>
                            <TransportForm
                                onTransportUpdate={handleTransportUpdate}
                                currentTransport={transport}
                                currentTransportDescription={transportDescription}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Button href="/scene" className="btn btn-primary">
                        Your scene
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}