import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_USER } from '../utils/mutations'

import Auth from '../utils/auth'

export default function CreateAccountForm() {
    const [formState, setFormState ] = useState({
        signupEmail: '',
        signupUsername: '',
        signupPassword: '',
        confirmPassword: '',
    })

    const [addUser, {error}] = useMutation(ADD_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        
        try {
            if(formState.confirmPassword === formState.signupPassword){
                const mutationResponse = await addUser({
                    variables: {
                        email: formState.signupEmail,
                        username: formState.signupUsername,
                        password: formState.signupPassword
                    }
                })
                const token = mutationResponse.data.addUser.token;
                Auth.login(token)
            } else{
                alert('passwords did not match')
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormState({
            ...formState,
            [name]: value,
        })
    }

    return (
        <form onSubmit={handleFormSubmit}>
            SignUp
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail" className="form-label">
                        Email
                    </label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="emailField" 
                        aria-describedby="emailHelp" 
                        name='signupEmail'
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail" className="form-label">
                        Username
                    </label>
                    <input 
                        type="username" 
                        className="form-control" 
                        id="usernameField" 
                        aria-describedby="usernameHelp" 
                        name='signupUsername'
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label 
                        htmlFor="exampleInputPassword1" 
                        className="form-label">
                            Password
                    </label>
                    <input 
                        type="password" 
                        className="form-control"
                        name='signupPassword'
                        id="exampleInputPassword"
                        onChange={handleChange} 
                    />
                     <label 
                        htmlFor="exampleInputPassword" 
                        className="form-label">
                            Confirm Password
                    </label>
                    <input 
                        type="password" 
                        className="form-control"
                        name='confirmPassword'
                        id="exampleInputconfirmPassword"
                        onChange={handleChange} 
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary">
                        Submit
                </button>
        </form>
    )
}