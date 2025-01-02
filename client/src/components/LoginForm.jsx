import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { LOGIN } from '../utils/mutations'
import Auth from '../utils/auth'


export default function Login() {

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
        console.log(formState)
        try{
            const { data } = await login({
                variables: { ...formState }
            })
            Auth.login(data.login.token)
            console.log(data.login.token)

        } catch( error ) {
            console.error(error)
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
        </>
    )

}