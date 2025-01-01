import Auth from '../utils/auth'

export default function Header(){
    const logout = (event) =>{
        event.preventDefault()
        Auth.logout()
    }


    return(
        <>
            <h1> this is the header! </h1>
            {Auth.loggedIn() && 
            <button className='btn btn-lg btn-light m-2' onClick={logout}>
                Logout!
            </button>}
        </>
    )
}