import useStore from '../../stores/useStore'

import { useGLTF, Html } from '@react-three/drei'
import { useEffect, useState } from 'react'


export default function Shelter({
    loading,
    data
}) {

    // const { loading, data } = useQuery(QUERY_ME)
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
                position={ [0, 3, -3]} // This will have to be a default value that is changed depending on the model
                wrapperClass='label' // The name of the class in the html (in css can change it with '.label > div')
                center // makes the pivot center of the html element to be the center of the element
                distanceFactor={6} // 
                >
                    {description}
            </Html>
        )
    }

    // The component that will be picking the shelter type
    const [shelterType, setShelterType] = useState(null)
    const [description, setDescription] = useState(null)
    
    const [tent, setTent] = useState(null)
    const [hammock, setHammock] = useState(null)
    const [cowboy, setCowboy] = useState(null)

   
    const ShelterTypeFragment = () =>{
        let currentPath = window.location.pathname
        // will be used to be either the user's shelter or a searched user's shelter

        // used to check if on the user's scene or the searched user's scene
        // Then changes shelterType and description to be the users or searched user's shelter. 
        if (currentPath === '/scene' || '/') {
            setShelterType(userShelter)
            setDescription(userShelterDescription)
        } else if (currentPath === '/searchedScene') {
            setShelterType(searchedUserShelter)
            setDescription(searchedUserShelterDescription)
        }
        console.log('shelter type: ', shelterType)
        // Loads and renders the model depending on the shelterType
        // the model load is in here so that i'm not loading models that I'm not using
        if(shelterType === 'tent')
        {
            setTent(useGLTF('./Models/shelter/AIcanvasTent.glb'))
            console.log('tent ',tent)
            setHammock(null)
            setCowboy(null)
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
            setHammock(useGLTF('./Models/shelter/hammock.glb'))
            setTent(null)
            setCowboy(null)
            console.log('hammock ', hammock.scene)
            return(
                <primitive
                    object={hammock.scene} // .scene seems to be creating an issue
                    position={[-1, -1, -4.2]}
                    rotation={[0, 1, 0 ]}
                    scale={0.35}
                >
                    <ShelterDescriptionHtml description={description} />
                </primitive>
            )
        } else if (shelterType === 'cowboy'){
            setCowboy(useGLTF('./Models/shelter/AIcowboyCamp.glb'))
            setTent(null)
            setHammock(null)
            console.log('cowboy ', cowboy)
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
            <ShelterTypeFragment />
        </>
    )
}

// This is just some code to dispose of models, I'm not sure if it's working. It'll be used for optimization later on
//   // To try and dispose the models after they have been used. Will maybe clear up the memory
//   useEffect(() => {
//     console.log('in the useEffect dispose')
//         if (tent) {
//             console.log('in tent dispose, ', tent)
//             tent.scene.traverse((child) => {
//                 if (child.isMesh) {
//                     child.geometry.dispose()
//                     if (Array.isArray(child.material)) {
//                         child.material.forEach((material) => material.dispose())
//                     } else {
//                         child.material.dispose()
//                     }
//                 }
//             })
//         }
//         if (hammock) {
//             console.log('in hammock dispose', hammock)
//             hammock.scene.traverse((child) => {
//                 if (child.isMesh) {
//                     child.geometry.dispose()
//                     if (Array.isArray(child.material)) {
//                         child.material.forEach((material) => material.dispose())
//                     } else {
//                         child.material.dispose()
//                     }
//                 }
//             })
//         }
//         if (cowboy) {
//             console.log('in cowboy dispose ', cowboy)
//             cowboy.scene.traverse((child) => {
//                 if (child.isMesh) {
//                     child.geometry.dispose()
//                     if (Array.isArray(child.material)) {
//                         child.material.forEach((material) => material.dispose())
//                     } else {
//                         child.material.dispose()
//                     }
//                 }
//             })
//         }
    
// }, [shelterType])

