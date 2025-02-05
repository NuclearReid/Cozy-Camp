import { useEffect, useState } from "react"
import { FormCheck, Row, Col } from "react-bootstrap"

import { SET_SHELTER, SET_SHELTER_DESCRIPTION } from "../../utils/mutations"
import { useMutation } from "@apollo/client"

// onShelterUpdate is here to update the profile with the new shelter option
 export default function ShelterForm( { 
        onShelterUpdate, 
        currentShelter, 
        currentShelterDescription, 
    }){
    const [setShelter, {error: shelterError, data: setShelterData }] = useMutation(SET_SHELTER)

    // Used to let the user know how many characters they have used/have left
    const [charCount, setCharCount] = useState(0)

    // This is it's own mutation so that the user doesn't have to write the description everytime they do a shelter update
    const [setShelterDescription, {error: descriptionError, data: setShelterDescriptionDdata}] = useMutation(SET_SHELTER_DESCRIPTION)

    const [formState, setFormState] = useState({
        shelter: currentShelter, // The default is cowboy because it's no shelter
        shelterDescription: ""
    })

    useEffect(() => {
        setFormState({
            shelter: currentShelter,
            shelterDescription: ""
        })
    },[currentShelter, currentShelterDescription])

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormState({
            ...formState,
            [name]: value
        })
        
        // updates the charCount to be the length of the description
        if(name === 'shelterDescription'){
            setCharCount(value.length)
        }

    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {

            const { data } = await setShelter({
                variables: { shelter: formState.shelter}
            })

            // Trying to make the description only change if the user entered something into the input box
            if(formState.shelterDescription.trim() != ""){
                await setShelterDescription({
                    variables: {shelterDescription: formState.shelterDescription}
                })
            }

            // update the shelter with the new data and send that to the parent (profile)
            if(data) {
                onShelterUpdate(
                    formState.shelter, 
                    formState.shelterDescription
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
            <Col className='mb-1' xs={12} md={12}>
                <label className='form-label fs-3'>
                    Type of Shelter?
                </label>
                <FormCheck
                    value={'tent'}
                    className='fs-5'
                    type="radio"
                    label="tent"
                    name="shelter"
                    id="tent"
                    onChange={handleChange}
                    checked={formState.shelter === 'tent'}
                />
                <FormCheck
                    value={'hammock'}
                    className='fs-5'
                    type="radio"
                    label="hammock"
                    name="shelter"
                    id="hammock"
                    onChange={handleChange}
                    checked={formState.shelter === 'hammock'}
                />
                <FormCheck
                    value={'cowboy'}
                    className='fs-5'
                    type="radio"
                    label="cowboy"
                    name="shelter"
                    id="cowboy"
                    onChange={handleChange}
                    checked={formState.shelter === 'cowboy'} 
                />
                {/* where i'll be setting the shelter description */}
                <h2>Your current description:</h2>
                <p>{currentShelterDescription}</p>
                <input
                    className="form-control"
                    name='shelterDescription'
                    type="text"
                    placeholder="Change the description?"
                    onChange={handleChange}
                    value={formState.shelterDescription}
                    maxLength={200}
                />
                <p>character count: {charCount}/200</p>
            </Col>
        </Row>
        <button 
            type="submit" 
            className="btn btn-primary mt-1">
                Submit
        </button>
    </form>
  )
}