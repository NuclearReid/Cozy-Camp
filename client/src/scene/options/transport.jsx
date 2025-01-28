import useStore from '../../stores/useStore'

import { useGLTF, Html } from '@react-three/drei'
import { useQuery } from '@apollo/client'
import { QUERY_ME } from '../../utils/queries'

export default function Transport() {

    const { loading, data } = useQuery(QUERY_ME)
    const userTransport = data?.me?.options?.transport
    const userTransportDescription = data?.me?.options?.transportDescription

    // This is for when you look up a user
    // Gets the searched user Data from the store
    const searchedUserTransport = useStore.getState().searchedUser.options.transport
    const searchedUserTransportDescription = useStore.getState().searchedUser.options.transportDescription
    /////////////////////////////////////////////////
    

    // This has to be after i declare the models, searched user, etc. or there is an issue with the rendering
    if( loading ) {
        return <>loading...</>
    }
    
    // description is just sending either the user or searched user's shelter description
     const TransportDescriptionHtml = ({description}) => {
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
    const TransportType = () =>{
        let currentPath = window.location.pathname
        // will be used to be either the user's shelter or a searched user's shelter
        let transportType = null
        let description = null


        // used to check if on the user's scene or the searched user's scene
        // Then changes shelterType and description to be the users or searched user's shelter. 
        if (currentPath === '/scene') {
            transportType = userTransport
            description = userTransportDescription
        } else if (currentPath === '/searchedScene') {
            transportType = searchedUserTransport
            description = searchedUserTransportDescription
        }


        // Work on putting the models for transport in the correct location




        // Loads and renders the model depending on the shelterType
        // the model load is in here so that i'm not loading models that I'm not using
        if(transportType === 'car')
        {
            const car = useGLTF('./Models/transport/aiCar.glb')
            return(
                <primitive
                    object={car.scene}
                    position={[0, 0.5, 6]}
                    rotation={[0,5,0 ]}
                    scale={2.5}
                >
                    <TransportDescriptionHtml description={description}/>
                </primitive>
            ) 
        } else if(transportType === 'backpack'){
            const backpack = useGLTF('./Models/transport/aiBackpack.glb')
            return(
                <primitive
                    object={backpack.scene}
                    position={[0, -0.5, 6]}
                    rotation={[0, 5, 0 ]}
                    scale={0.5}
                >
                    <TransportDescriptionHtml description={description}/>
                </primitive>
            )
        } else if (transportType === 'canoe'){
            const canoe = useGLTF('./Models/transport/aiCanoe.glb')  
            return(
                
                <primitive
                    object={canoe.scene}
                    position={[0, -0.4, 6]}
                    rotation={[0, 6.5, 0 ]}
                    scale={3}
                >
               <TransportDescriptionHtml description={description}/>
                </primitive>
            )
        }
    }



    return(
        <>
            <TransportType />
        </>
    )
}