import { useControls } from "leva"
import { Center, Text, Text3D } from "@react-three/drei"
import * as THREE from 'three'


export default function StartPannel()
{
    /* 
     * Tweeks
     */
    const { position, scale, textPosition } = useControls('StartPanel', {
        position:
        {
            value: {x: -2.19, y: 9.2, z: 1.8},
            min: -10,
            max: 15,
            step: 0.1,
        },
        scale:
        {
            value: {x: 5.8, y: 3.3, z: 0.2},
            min: 0.1,
            max: 10,
            step: 0.1,
        },
        textPosition:
        {
            value: {x: -2.19, y: 9.2, z: 2.2},
            min: -5,
            max: 15,
            step: 0.1,
        },

    })

    
    return(
        <>
            <Center
                position={[-2.19, 9.2, 2.2]}
                rotation-y={ - Math.PI * 0.25}
            >
                <Text3D 
                    
                    font='./text/FingerPaint-Regular.ttf'
                    // rotation-y={- Math.PI * 0.25}
                    position-y={1.4}
                >
                    Cozy 
                    <meshToonMaterial color={'#E13C42'}/>
                </Text3D>
                <Text3D 
                    
                    font='./text/FingerPaint-Regular.ttf'
                    // rotation-y={- Math.PI * 0.25}
                    textAlign={'center'}
                >
                    Camp! 
                    <meshToonMaterial color={'#E13C42'}/>
                </Text3D>
            </Center>
            <mesh 
                position={[-2.19, 9.2, 1.8]}
                scale={[5.8, 3.3, 0.2]}
                rotation-y={Math.PI * 0.75}
            >
                <boxGeometry/>
                <meshToonMaterial color={'#916302'} />
            </mesh>
        </>
    )
}