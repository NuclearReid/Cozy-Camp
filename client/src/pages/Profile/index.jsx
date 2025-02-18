import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { Canvas} from '@react-three/fiber'

import { useQuery } from "@apollo/client"
import { QUERY_ME_NO_WEATHER, QUERY_ME } from "../../utils/queries"
import { useEffect, useState, Suspense } from "react"
import useStore from "../../stores/useStore"

import ShelterForm from '../../components/forms/ShelterForm'
import SearchBar from "../../components/SearchBar"
import TransportForm from "../../components/forms/TransportForm"
import LocationForm from "../../components/forms/LocationForm"
import LoadingScreen from "../../components/LoadingScreen"
import Experience from "../../scene/Experience"


export default function Profile(){

    const { loading, data, refetch} = useQuery(QUERY_ME)


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
         - it's basically the same code for each form but with different variables, checks if something is in the description form and if it's not empty, allows for an update
     */
    // handle when you change the location
    const handleLocationUpdate = async( newLocation ) => {
        if(newLocation.trim() != ""){
            setLocation(newLocation)
        }
        await refetch()
    }

    // Set the new shelter in the state and have it upda'te on the profile
    const handleShelterUpdate = async (newShelter, newShelterDescription) => {
        // console.log(newShelter)
        setShelter(newShelter)
        // Makes it so the shelter description will only update if I send it a value
        if(newShelterDescription.trim() != ""){
            setShelterDescription(newShelterDescription)
        }
        await refetch()
    }

    // for the transport form || I don't know if these have to be their own function? maybe consolidate it with the one above?
    const handleTransportUpdate = async (newTransport, newTransportDescription) => {
        setTransport(newTransport)
        if(newTransportDescription.trim() != ""){
            setTransportDescription(newTransportDescription)
        }
        await refetch()
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
                                    <li>With your selections, your scene will be a 3D render of your campsite.</li>
                                    <li>Do you spend your time in the woods? How do you get there, what do you use for shelter? Want to show others?</li>
                                    <li>Set your city as your location and your camp scene will adjust to your day/night cycle (it uses OpenWeatherAPI).</li>
                                    <li>Do you sleep in a hammock, tent, or nothing?</li>
                                    <li>Fill out the form with that info and give a description for others to see your opinion on it.</li>
                                    <li>How do you get to your campsite? Let us know with the transportation form!</li>
                                <em>There is more to come, just working out some of the kinks right now.</em>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} className='equal-card-height'>
                    <Card className='w-100'>
                        {/* This is here to ensure I'm not sending undefined to <Experience /> */}
                        {!loading && <Canvas
                            camera={{
                                fov: 45,
                                near: 0.1,
                                far: 200,
                                position: [-3.9, 10.2, 11.9],
                            }}
                        >
                            {console.log('inside the canvas', data)}
                            <Suspense fallback={<LoadingScreen />}>
                                <Experience
                                    loading={loading}
                                    data={data}
                                />
                            </Suspense>
                        </Canvas>}
                    </Card>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col md={4}>
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
                <Col md={4} >
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
                <Col md={4} className='equal-card-height'>
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
                <Col>
                    <Button href="/scene" className="btn btn-primary">
                        Your scene in full screen!
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}


/*
This is just my canvas fragment, I have it here for reference while I move it around the page
///////
    <Col md={6} >
        <Card>
            // This is here to ensure I'm not sending undefined to <Experience />
            {!loading && <Canvas
                camera={{
                    fov: 45,
                    near: 0.1,
                    far: 200,
                    position: [-3.9, 10.2, 11.9],
                }}
            >
                {console.log('inside the canvas', data)}
                <Suspense fallback={<LoadingScreen />}>
                    <Experience
                        loading={loading}
                        data={data}
                    />
                </Suspense>
            </Canvas>}
        </Card>
    </Col>
*/