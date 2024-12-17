import { RigidBody } from "@react-three/rapier"
import { useGLTF } from "@react-three/drei"
import { useState, useRef, useEffect } from "react"

export default function MarshmellowOne(props)
{
    const [physicsType, setPhysicsType ] = useState('fixed')
    const {nodes, materials} = useGLTF('./Models/marshmellows.glb')
    const stick = useRef()


    const moveStick = () => { // Each of these console logs are being reached but the impulse is not being applied consistantly
        if(setPhysicsType != 'hull')
        {
            setPhysicsType('hull')   
        }
        if(stick.current)
        {
            const mass = stick.current.mass()
            stick.current.applyImpulse({
                x: 0,
                y: mass * 3,
                z: 0 
            })
        }     
    }

    return(
        <>
            <group
                {...props}
                onClick={moveStick}
            >
                <RigidBody
                    ref={stick}
                    type={physicsType}
                    canSleep={false}
                    debug
                >
                    <mesh
                        geometry={nodes.Cube002.geometry}
                        material={materials.Marshmellow}
                        position={[0,1.4,0]}
                        scale={[0.2,0.2,0.2]}
                    />
                    <mesh
                        geometry={nodes.Cylinder.geometry}
                        material={materials.stickColor}
                        position={[0,0.9,0]}
                        scale={[0.09, 1.3 ,0.09]}
                    />
                </RigidBody>
            </group>
        </>
    )
}