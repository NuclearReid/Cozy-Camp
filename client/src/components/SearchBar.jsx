import { FIND_USER } from "../utils/queries"
import { useLazyQuery } from "@apollo/client"
import { useState } from "react"

export default function SearchBar() {
    // useLazyQuery is to make it so the query runs when i click the search button instead of when the page loads
    const [findUser, { loading, data, error}] = useLazyQuery(FIND_USER)

    const [formState, setFormState] = useState({
        usernameSearch: '',
    })

    const handleFormSubmit = async (event) => {
        event.preventDefault()

        try {
            const searchUser = await findUser({
                variables: { 
                    username: formState.usernameSearch 
                }
            })
            console.log(data)
            return searchUser           

        } catch (error) {
            console.error(error)
        }
    }

    const handleChange = ( event ) => {
        const { name, value } = event.target
        setFormState({
            ...formState,
            [name]: value
        })
    }

    return(
        <>
            <form
                onSubmit={handleFormSubmit}
            >
                <div className="input-group has-validation">
                    <span className="input-group-text">@</span>
                    <div className="form-floating">
                        <input
                        type="text"
                        className="form-control"
                        id="floatingInputGroup2"
                        placeholder="Username"
                        name='usernameSearch'
                        onChange={handleChange}
                        required
                        />
                        <label htmlFor="floatingInputGroup2">Username</label>
                    </div>
                    <div className="invalid-feedback">
                    Please choose a username.
                    </div>
                </div>
                <button type="submit" className='btn btn-primary'> Search </button>
            </form>
            {/* This is just where I can make sure the user info is showing up! */}
            {/* I'll send this data to the scene and have their scene Render */}
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {data && data.user ?(
                <div>
                    <h1>User Details</h1>
                    <p>ID: {data.user._id}</p>
                    <p>Email: {data.user.email}</p>
                    <p>Username: {data.user.username}</p>
                    <p>Shelter: {data.user.shelter}</p>
                </div>
            ): (
                <h1> Look up a user! </h1>
            )}
        </>
    )
}

