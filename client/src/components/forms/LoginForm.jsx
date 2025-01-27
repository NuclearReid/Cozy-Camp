import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { LOGIN } from '../../utils/mutations'
import Auth from '../../utils/auth'


export default function Login() {

    // Used to let the user know if they entered in wrong email or password
    const [errorMessage, setErrorMessage] = useState('')

    const [ formState, setFormState] = useState({
        email: '',
        password: ''
    })
    const [login, {error, data}] = useMutation(LOGIN)

    const handleChange = ( event ) => {
        const {name, value} = event.target

        setFormState({
            ...formState,
            [name]: value
        })
    }

    const handleFormSubmit = async (event) =>{
        event.preventDefault()
        try{
            const { data } = await login({
                variables: { ...formState }
            })
            Auth.login(data.login.token)
        } catch( error ) {
            console.error(error)
            setErrorMessage('Wrong Email or Password!')
        }
        // clear the form
        setFormState({
            email: '',
            password: ''
        }) 
        
    }

    return(
        <>
            <form onSubmit={handleFormSubmit}>
            Login
                <div className="mb-3">
                    <label htmlFor="exampleLoginInputEmail" className="form-label">Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="loginEmailField" 
                        aria-describedby="loginEmailHelp" 
                        name='email'
                        value={formState.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label 
                        htmlFor="inputPassword1" 
                        className="form-label">
                            Password
                    </label>
                    <input 
                        type="password" 
                        className="form-control"
                        name='password'
                        id="exampleLoginInputPassword1"
                        value={formState.password}
                        onChange={handleChange} 
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary">
                        Submit
                </button>
            </form>
            
            {/* This lets the user know if the entered credentials were wrong */}
            {errorMessage && (
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>{errorMessage}</strong>
                    <button 
                        type="button" 
                        className="btn-close" 
                        data-bs-dismiss="alert" 
                        aria-label="Close"
                        onClick={() => setErrorMessage('')}
                    />
                </div>
            )}
        </>
    )
}