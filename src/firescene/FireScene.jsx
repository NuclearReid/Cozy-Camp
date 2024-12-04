import { useControls } from "leva"
import { useGLTF } from '@react-three/drei'
import SmokeTexture from "./SmokeTexture"
import { RigidBody } from "@react-three/rapier"
import FireTexture from "./FireTexture"
import MarshmellowOne from "./MarshmellowOne"


export default function FireScene() 
{
    const fireLogs = useGLTF('./Models/fireLogs.glb')

    


    return (
        <>
            
            {/* Fire ring */}
            <RigidBody
                type="fixed"
            >
                <mesh 
                    position={[-2.5, -1.2, 1.8]}
                    rotation-x={-Math.PI * 0.5}
                    scale={[1, 1, 1]}
                >
                    <torusGeometry/>
                    <meshToonMaterial color="brown" />
                </mesh>
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
            <MarshmellowOne 
                position={[-2.5, -0.5, 3]}
                scale={0.5}
                rotation-x={ - Math.PI * 0.25}
            />
            

            {/* Tent */}
            <mesh
                position={[-1.6, -1.1, -2.2]}
                rotation={[0, 0, Math.PI * 0.25 ]}
                scale={3.0}
            >
                <boxGeometry />
                <meshToonMaterial color='tan'/>
            </mesh>
            {/* The floor */}
            <RigidBody
                type='fixed'
            >
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