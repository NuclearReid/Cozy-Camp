import { useEffect, useState } from "react"
import { FormCheck, Row, Col } from "react-bootstrap"

import { SET_TRANSPORT, SET_TRANSPORT_DESCRIPTION } from "../../utils/mutations"
import { useMutation } from "@apollo/client"

// onTransportUpdate is here to update the profile with the new transport option
export default function TransportForm( { 
        onTransportUpdate, 
        currentTransport, 
        currentTransportDescription, 
    }){

    const [setTransport, {error: transportError, data: setTransportData }] = useMutation(SET_TRANSPORT)

    // Used to let the user know how many characters they have used/have left
    const [charCount, setCharCount] = useState(0)

    // This is its own mutation so that the user doesn't have to write the description every time they do a transport update
    const [setTransportDescription, {error: descriptionError, data: setTransportDescriptionData}] = useMutation(SET_TRANSPORT_DESCRIPTION)

    const [formState, setFormState] = useState({
        transport: currentTransport, // The default is cowboy because it's no transport
        transportDescription: ""
    })

    useEffect(() => {
        setFormState({
            transport: currentTransport,
            transportDescription: ""
        })
    },[currentTransport, currentTransportDescription])

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormState({
            ...formState,
            [name]: value
        })
        
        // updates the charCount to be the length of the description
        if(name === 'transportDescription'){
            setCharCount(value.length)
        }

    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {

            const { data } = await setTransport({
                variables: { transport: formState.transport}
            })

            // Trying to make the description only change if the user entered something into the input box
            if(formState.transportDescription.trim() != ""){
                await setTransportDescription({
                    variables: {transportDescription: formState.transportDescription}
                })
            }

            // update the transport with the new data and send that to the parent (profile)
            if(data) {
                onTransportUpdate(
                    formState.transport, 
                    formState.transportDescription
                )
            }
        } catch (error) {
            console.log(error)
        }       
        // Reset the Char count back to 0 after the form has been submitted 
        setCharCount(0)
    }

  return (
    <form onSubmit={handleSubmit}>
        <Row>
            <Col className='mb-3' xs={12} md={12}>
                <label className='form-label fs-3'>
                    Type of Transport?
                </label>
                <FormCheck
                    value={'backpack'}
                    className='fs-5'
                    type="radio"
                    label="backpack"
                    name="transport"
                    id="backpack"
                    onChange={handleChange}
                    checked={formState.transport === 'backpack'}
                />
                <FormCheck
                    value={'car'}
                    className='fs-5'
                    type="radio"
                    label="car"
                    name="transport"
                    id="car"
                    onChange={handleChange}
                    checked={formState.transport === 'car'}
                />
                <FormCheck
                    value={'canoe'}
                    className='fs-5'
                    type="radio"
                    label="canoe"
                    name="transport"
                    id="canoe"
                    onChange={handleChange}
                    checked={formState.transport === 'canoe'} 
                />
                {/* where i'll be setting the transport description */}
                <h2>Your current description:</h2>
                <p>{currentTransportDescription}</p>
                <input
                    className="form-control"
                    name='transportDescription'
                    type="text"
                    placeholder="Change the description?"
                    onChange={handleChange}
                    value={formState.transportDescription}
                    maxLength={200}
                />
                <p>character count: {charCount}/200</p>
            </Col>
        </Row>
        <button 
            type="submit" 
            className="btn btn-primary mt-3">
                Submit
        </button>
    </form>
  )
}
