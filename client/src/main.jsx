import './style.css'
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Auth from '../src/utils/auth.js'

import App from './App.jsx'
import NoMatch from './pages/NoMatch'
import Landing from './pages/Landing'
import Scene from './pages/Experience/index.jsx'
import Profile from './pages/Profile/index.jsx';



const ProtectedRoute = ({ children }) => {
    const isLoggedIn = Auth.loggedIn()
    if(!isLoggedIn){
        return <Landing />
    }
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
                <ProtectedRoute>                            
                    <Profile />
                </ProtectedRoute>,
            },
            {
                path: '/scene',
                element: 
                    <ProtectedRoute>                            
                        <Scene />
                    </ProtectedRoute>,
            },
        ]
    }
])

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
)
