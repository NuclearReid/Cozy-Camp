import Auth from '../utils/auth'
import SearchBar from './SearchBar'

export default function Header(){
    const logout = (event) =>{
        event.preventDefault()
        Auth.logout()
    }

    return(
        <>
            {/* This is just here because I want a bit of seperation between the top of the page and everything else on the login screen */}
            {!Auth.loggedIn() &&
                <div
                    className='mb-5'
                />
            }
            {/* if they're logged in, shows a logout button and an option to go home */}
            {Auth.loggedIn() && 
                <> 
                    <button className='btn btn-lg btn-light m-2' onClick={logout}>
                        Logout!
                    </button>
                    {/* If the user is already at the home screen, I don't want to display the 'go home' button */}
                    {(window.location.pathname != '/') &&
                    <a href="/" className="btn btn-primary">
                        Go Home
                    </a>}    
                    
                </>
            }
        </>
    )
}