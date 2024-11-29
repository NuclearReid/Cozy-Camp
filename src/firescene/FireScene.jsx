import { useControls } from "leva"
import FireTexture from "./FireTexture"
import PortalTexturePractice from './PortalTexturePractice'


export default function FireScene() 
{
    const { positionFire } = useControls('firePit',{
        positionFire:
        {
            value: {x:-2.5, y:-0.9, z: 1.8},
            min: -10,
            max: 10,
            step: 0.1,
            joystick: 'invertY',
        }
    })

    const { positionTent, rotationTent } = useControls('tent', {
        positionTent:
        {
            value: {x:-1.6, y:-1.1, z: -2.2},
            min: -10,
            max: 10,
            step: 0.1,
            joystick: 'invertY',
        },
        rotationTent:
        {
            value: {x:0, y:0, z: Math.PI * 0.25},
            min: - Math.PI * 2,
            max: Math.PI * 2,
            step: 0.01,
        }
        
    })

    return (
        <>
            
            {/* Fire ring */}
            <mesh 
                position={[positionFire.x, positionFire.y, positionFire.z]}
                rotation-x={-Math.PI * 0.5}
                scale={0.75}
            >
                <torusGeometry/>
                <meshToonMaterial color="brown" />
            </mesh>

            {/* The Fire */}
            <FireTexture />
            {/* <PortalTexturePractice /> */}

            {/* Tent */}
            <mesh
                position={[positionTent.x, positionTent.y, positionTent.z]}
                rotation={[rotationTent.x, rotationTent.y, rotationTent.z ]}
                scale={3.0}
            >

                <boxGeometry />
                <meshToonMaterial color='tan'/>
            </mesh>
            {/* The floor */}
            <mesh 
                position-y={ - 1 } 
                rotation-x={ - Math.PI * 0.5 } 
                scale={ 10 }
            >
                <circleGeometry />
                <meshStandardMaterial color="greenyellow" />
            </mesh>
            
        </>
    )
}