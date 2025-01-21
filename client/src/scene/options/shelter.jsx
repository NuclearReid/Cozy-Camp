import useStore from '../../stores/useStore'
import { useGLTF } from '@react-three/drei'
import { useQuery } from '@apollo/client'
import { QUERY_ME } from '../../utils/queries'

export default function Shelter() {

    const { loading, data } = useQuery(QUERY_ME)
    const userShelter = data?.me?.options?.shelter

    

    // console.log(userShelter)

    // This is for when you look up a user
    // Gets the searched user Data from the store
    const searchedUserShelter = useStore.getState().searchedUser.options.shelter
    /////////////////////////////////////////////////
    

    // I'll need to optimize this by finding a way to not need to load each model everytime the scene opens. Will create a lot of issues down the line when I have bunch of user options
    const tent = useGLTF('./Models/AIcanvasTent.glb')
    const hammock = useGLTF('./Models/AIhammock.glb')
    const cowboy = useGLTF('./Models/AIcowboyCamp.glb')    


    // This has to be after i declare the models, searched user, etc. or there is an issue with the rendering
    if( loading ) {
        return <>loading...</>
    }
    
    // The component that will be picking the shelter type
    const ShelterType = () =>{
        let currentPath = window.location.pathname
        // will be used to be either the user's shelter or a searched user's shelter
        let shelterType = null

        // used to check if on the user's scene or the searched user's scene
        // Then changes shelterType to be the users or searched user's shelter. 
        if (currentPath === '/scene') {
            shelterType = userShelter
        } else if (currentPath === '/searchedScene') {
            shelterType = searchedUserShelter
        }

        // Renders the model depending on the shelterType
        if(shelterType === 'tent')
        {
            return(
                <primitive
                    object={tent.scene}
                    position={[-1.6, 0, -2.2]}
                    rotation={[0,1.5,0 ]}
                    scale={2.0}
                />
            ) 
        } else if(shelterType === 'hammock'){
            return(
                <primitive
                    object={hammock.scene}
                    position={[-1.6, 1, -2.2]}
                    rotation={[0, -0.5, 0 ]}
                    scale={3.0}
                />
            )
        } else if (shelterType === 'cowboy'){
            return(
                <primitive
                    object={cowboy.scene}
                    position={[-1.6, -0.5, -2.2]}
                    rotation={[ 0, -2, 0 ]}
                    scale={2.0}
                />
            )
        }
        
        
        return null

    }


    return(
        <>
            <ShelterType />
        </>
    )
}