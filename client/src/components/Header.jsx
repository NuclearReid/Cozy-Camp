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

            {Auth.loggedIn() && 
                <> 
                    <button className='btn btn-lg btn-light m-2' onClick={logout}>
                        Logout!
                    </button>
                    <a href="/" className="btn btn-primary">
                        Go Home
                    </a>
                </>
            }
        </>
    )
}