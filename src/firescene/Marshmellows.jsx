import { RigidBody } from "@react-three/rapier";
import { useState, useRef } from "react"


export default function Marshmellows()
{
    const [physicsType, setPhysicsType ] = useState('fixed')
    const stick = useRef()

    const moveStick = () => {

        setPhysicsType('hull')        
        const mass = stick.current.mass()
        stick.current.applyImpulse({
            x: 0,
            y: mass * 3,
            z: 0 
        })
    }

    return(
        <>
            <RigidBody
                ref={stick}
                type={physicsType}
            >
                <mesh
                    onClick={moveStick}
                    position={[0,0.5,0]}
                    scale={[0.15,3,0.15]}
                    rotation-x={0.4}

                >
                    <boxGeometry/>
                    <meshToonMaterial />
                </mesh>
            </RigidBody>

        </>
    )
}