import './style.css'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Auth from '../src/utils/auth.js'

import { Canvas} from '@react-three/fiber'
import Experience from './scene/Experience.jsx'
import App from './App.jsx'
import NoMatch from './pages/NoMatch'
import Landing from './pages/Landing'
import Scene from './scene/Experience.jsx'


const ProtectedRoute = ({ children }) => {
    const isLoggedIn = Auth.loggedIn()

    // if(!isLoggedIn){
    //     return <Landing />
    // }
    return children;
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        error: <NoMatch />,
        children: [
            {
                index: true,
                element:
                    <Landing />
            },
        ]
    }
])

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
)


// const root = ReactDOM.createRoot(document.querySelector('#root'))

// root.render(
//     <>
//         <Canvas
//             camera={{
//                 fov: 45,
//                 near: 0.1,
//                 far: 200,
//                 position: [-3.9, 10.2, 11.9],
//             }}
//         >
//             <Experience />
//         </Canvas>
//     </>
// )
