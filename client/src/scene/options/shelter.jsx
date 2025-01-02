import { useGLTF } from '@react-three/drei'
import { useQuery } from '@apollo/client'
import { QUERY_ME } from '../../utils/queries'




export default function Shelter() {
    const {loading, data} = useQuery(QUERY_ME)
    const userShelter = data?.me?.shelter

    const tent = useGLTF('./Models/AIcanvasTent.glb')
    const hammock = useGLTF('./Models/AIhammock.glb')
    const cowboy = useGLTF('./Models/AIcowboyCamp.glb')
    console.log(tent)

    const ShelterType = () =>{

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

    return(
        <>
            <ShelterType />
        </>
    )
}