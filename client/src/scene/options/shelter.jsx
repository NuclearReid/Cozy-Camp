import useStore from '../../stores/useStore'

import { useGLTF, Html } from '@react-three/drei'
import { useQuery } from '@apollo/client'
import { QUERY_ME } from '../../utils/queries'

export default function Shelter() {

    const { loading, data } = useQuery(QUERY_ME)
    const userShelter = data?.me?.options?.shelter
    const userShelterDescription = data?.me?.options?.shelterDescription

    // This is for when you look up a user
    // Gets the searched user Data from the store
    const searchedUserShelter = useStore.getState().searchedUser.options.shelter
    const searchedUserShelterDescription = useStore.getState().searchedUser.options.shelterDescription
    /////////////////////////////////////////////////
    

    // This has to be after i declare the models, searched user, etc. or there is an issue with the rendering
    if( loading ) {
        return <>loading...</>
    }
    
    // description is just sending either the user or searched user's shelter description
     const ShelterDescriptionHtml = ({description}) => {
        return(
            <Html
            position={ [0, 1, 0]}
            wrapperClass='label' // The name of the class in the html (in css can change it with '.label > div')
            center // makes the pivot center of the html element to be the center of the element
            distanceFactor={6} // 
            >
                {description}
            </Html>
        )
    }

    // The component that will be picking the shelter type
    const ShelterType = () =>{
        let currentPath = window.location.pathname
        // will be used to be either the user's shelter or a searched user's shelter
        let shelterType = null
        let description = null


        // used to check if on the user's scene or the searched user's scene
        // Then changes shelterType and description to be the users or searched user's shelter. 
        if (currentPath === '/scene') {
            shelterType = userShelter
            description = userShelterDescription
        } else if (currentPath === '/searchedScene') {
            shelterType = searchedUserShelter
            description = searchedUserShelterDescription
        }

        // Loads and renders the model depending on the shelterType
        // the model load is in here so that i'm not loading models that I'm not using
        if(shelterType === 'tent')
        {
            const tent = useGLTF('./Models/shelter/AIcanvasTent.glb')
            return(
                <primitive
                    object={tent.scene}
                    position={[-1.6, 0, -2.2]}
                    rotation={[0,1.5,0 ]}
                    scale={2.0}
                >
                    <ShelterDescriptionHtml description={description}/>
                </primitive>
            ) 
        } else if(shelterType === 'hammock'){
            const hammock = useGLTF('./Models/shelter/AIhammock.glb')
            return(
                <primitive
                    object={hammock.scene}
                    position={[-1.6, 1, -2.2]}
                    rotation={[0, -0.5, 0 ]}
                    scale={3.0}
                >
                    <ShelterDescriptionHtml description={description}/>
                </primitive>
            )
        } else if (shelterType === 'cowboy'){
            const cowboy = useGLTF('./Models/shelter/AIcowboyCamp.glb')  
            return(
                
                <primitive
                    object={cowboy.scene}
                    position={[-1.6, -0.5, -2.2]}
                    rotation={[ 0, -2, 0 ]}
                    scale={2.0}
                >
               <ShelterDescriptionHtml description={description}/>
                </primitive>
            )
        }
    }



    return(
        <>
            <ShelterType />
        </>
    )
}