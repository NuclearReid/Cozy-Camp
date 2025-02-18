import { Text3D } from "@react-three/drei"
import useStore from "../../stores/useStore"


export default function CozyCampText({data})
{
    let displayName = null
    const username = data?.me?.username
    const searchedUser = useStore.getState().searchedUser?.username
    let currentPath = window.location.pathname
    // The "|| '/' " is there so the scene works on the home page too
    if(currentPath === '/scene' || '/') displayName = username

    if(currentPath === '/searchedScene') displayName = searchedUser
    return(
        <>
             <Text3D 
                font='./text/FingerPaint-Regular.ttf'
                rotation-y={ - Math.PI * 0.25}
                // position-y={1.4}
                position={[-2.19, 10.6, 2.2]}
            >
                {displayName}
                <meshToonMaterial color={'#E13C42'}/>
            </Text3D>

            <Text3D 
                font='./text/FingerPaint-Regular.ttf'
                rotation-y={ - Math.PI * 0.25}
                textAlign={'center'}
                position={[-2.19, 9.2, 2.2]}
            >
                Camp! 
                <meshToonMaterial color={'#E13C42'}/>
            </Text3D>
        
        </>
    )
}