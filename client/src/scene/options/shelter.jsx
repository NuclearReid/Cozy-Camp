import useStore from '../../stores/useStore'
import { useGLTF } from '@react-three/drei'
import { useQuery } from '@apollo/client'
import { QUERY_ME } from '../../utils/queries'

export default function Shelter() {

    const {loading, data} = useQuery(QUERY_ME)
    const userShelter = data?.me?.shelter

    // Gets the searched user Data from the store
    const searchedUser = useStore((state) => state.searchedUser)
    const searchedUserShelter = searchedUser.shelter

    // I'll need to optimize this by finding a way to not need to load each model everytime the scene opens. Will create a lot of issues down the line when I have bunch of user options
    const tent = useGLTF('./Models/AIcanvasTent.glb')
    const hammock = useGLTF('./Models/AIhammock.glb')
    const cowboy = useGLTF('./Models/AIcowboyCamp.glb')    
    
    const ShelterType = () =>{
        let currentPath = window.location.pathname
        // This is to check if the scene will be looking at the user's scene or a searched scene depending on the path ('/scene' or '/searchedScene')
        if(currentPath === '/scene'){
            if(userShelter === 'tent')
            {
                return(
                    <primitive
                        object={tent.scene}
                        position={[-1.6, 0, -2.2]}
                        rotation={[0,1.5,0 ]}
                        scale={2.0}
                    />
                ) 
            } else if(userShelter === 'hammock'){
                return(
                    <primitive
                        object={hammock.scene}
                        position={[-1.6, 1, -2.2]}
                        rotation={[0, -0.5, 0 ]}
                        scale={3.0}
                    />
                )
            } else if (userShelter === 'cowboy'){
                return(
                    <primitive
                        object={cowboy.scene}
                        position={[-1.6, -0.5, -2.2]}
                        rotation={[ 0, -2, 0 ]}
                        scale={2.0}
                    />
                )
            }
        }
        // If I'm looking at the scene of the Searched user, go here
        if(currentPath === '/searchedScene'){
            if(searchedUserShelter === 'tent')
            {
                return(
                    <primitive
                        object={tent.scene}
                        position={[-1.6, 0, -2.2]}
                        rotation={[0,1.5,0 ]}
                        scale={2.0}
                    />
                ) 
            } else if(searchedUserShelter === 'hammock'){
                return(
                    <primitive
                        object={hammock.scene}
                        position={[-1.6, 1, -2.2]}
                        rotation={[0, -0.5, 0 ]}
                        scale={3.0}
                    />
                )
            } else if (searchedUserShelter === 'cowboy'){
                return(
                    <primitive
                        object={cowboy.scene}
                        position={[-1.6, -0.5, -2.2]}
                        rotation={[ 0, -2, 0 ]}
                        scale={2.0}
                    />
                )
            }
        }
    }

    return(
        <>
            <ShelterType />
        </>
    )
}