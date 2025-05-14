import { useControls } from "leva"
import { useGLTF } from '@react-three/drei'
import SmokeTexture from "./SmokeTexture"
import { RigidBody } from "@react-three/rapier"
import FireTexture from "./FireTexture"
import MarshmellowOne from "./MarshmellowOne"
import MarshmellowTwo from "./MarshmellowTwo"
import Grass from "../grass/Grass"
import Shelter from '../options/shelter'
import Transport from "../options/transport"

export default function FireScene({
    loading,
    data
}) 
{
    
    const fireLogs = useGLTF('./Models/fireLogs.glb')
    const fireRing = useGLTF('./Models/fireRing.glb')



    return (
        <>
            
            {/* Fire ring */}
            <RigidBody
                type="fixed"
            >
                <mesh 
                    castShadow
                    receiveShadow
                    geometry={fireRing.nodes.fireRocks.geometry}
                    material={fireRing.materials.Material}
                    position={[-3.4, 0.9, 3.2]}
                    scale={0.23}
                />
            </RigidBody>

            {/* FireLogs */}
            <mesh
                castShadow
                receiveShadow
                geometry={fireLogs.nodes.Logs.geometry}
                material={fireLogs.materials.FireLog}
                scale={[0.1, 0.45, 0.1]}
                rotation={[-0.61, 2.36, 2.055]}
                position={[-2.5, -0.9, 1.8]}
            />

            {/* The Fire */}        
            <FireTexture />

            {/* The smoke */}
            <SmokeTexture />

            {/* Marshmellows */} 
            <>
                <MarshmellowOne 
                    position={[-3.53, -0.8, 2.35]}
                    scale={0.5}
                    rotation={ [-0.66, 0, -0.77] }
                />
                <MarshmellowTwo 
                    position={[-2.5, -0.8, 3]}
                    scale={0.5}
                    rotation-x={ - Math.PI * 0.25}
                />
                <MarshmellowTwo 
                    position={[-1.26, -0.8, 1.67]}
                    scale={0.5}
                    rotation={ [-0.8, 0.61, 1.27]}
                />
            </>
            
            {/* Shelter */}
            <Shelter 
                loading = {loading}
                data = {data}
            />

            {/* Transport */}
            <Transport 
                loading = {loading}
                data = {data}
            />

            {/* The floor */}
            <RigidBody
                type='fixed'
            >
                <Grass />
                <mesh 
                    position-y={ - 1 } 
                    rotation-x={ - Math.PI * 0.5 } 
                    scale={ 10 }
                >
                    <circleGeometry />
                    <meshStandardMaterial color="greenyellow" />
                </mesh>
            </RigidBody>
            
        </>
    )
}



    // These are just used to position everything when needed
    // const { position, rotation, scale } = useControls('Positioning', {
    //     // position={[-2.5, -0.6, 3]}
    //     position:
    //     {
    //         value: {x: -2.5, y: 1, z: 3},
    //         step: 0.1
    //     },
    //     rotation:
    //     {
    //         value: 0.25,
    //         step: 0.01
    //     },
    //     scale:
    //     {
    //         value: 0.25,
    //         step: 0.01,
    //     }
    // })

    