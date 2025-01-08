import CreateAccountForm from '../../components/CreateAccountForm'
import LoginForm from '../../components/LoginForm'
import Experience from '../../scene/Experience'
import { Canvas } from '@react-three/fiber'
import { Loader } from '@react-three/drei'
import { useState } from 'react'


export default function NoMatch() {

    const [showSignup, setShowSignup] = useState(false)

    const handleCreateAccountClick = () => {
        setShowSignup(!showSignup)
    }

    return (
        <div className='container'>
            <div 
                className='row'
            >
                <div className='col-8'>
                    <h1>Cozy Camp!</h1>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus asperiores sint, similique cumque possimus amet obcaecati necessitatibus rem fugiat harum voluptatem enim illum iusto ut molestiae, illo atque beatae error.</p>
                    <img 
                        src='./images/AiLandingImage.png' alt='Cozy Campfire'
                        className='img-fluid'
                    />
                </div>

                <div className='col-4 border-start'>
                    {!showSignup? (
                    <>
                        <LoginForm />
                        <button 
                            onClick={handleCreateAccountClick}
                            className='btn btn-primary mt-2'
                            >
                            Create Account!
                        </button>
                    </>
                    ): (
                    <>
                        <CreateAccountForm />
                        <button 
                            onClick={handleCreateAccountClick}
                            className='btn btn-primary mt-2'
                            >
                            Back to Login!
                        </button>
                    </>

                )}
                </div>
            </div>
        </div>
    )
}


