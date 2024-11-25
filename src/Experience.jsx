import { OrbitControls, PresentationControls, Text3D, CameraControls, SpotLight, useGLTF } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useState, useEffect, Suspense } from 'react'
import { useControls } from 'leva'
import * as THREE from 'three'
import { Physics, RigidBody } from '@react-three/rapier'


// These two are needed to make the CameraControls tag work better
import CameraControlsReact from 'camera-controls'
CameraControlsReact.install({THREE:THREE})

// My fragments
import useWorld from './stores/useWorld'
import FireScene from './firescene/FireScene'
import Lighting from './environement/Lighting'
import CozyCampText from './startScreen/CozyCampText'

const degToRad = (degrees) => degrees * (Math.PI /180)
const finalPolarPositionRadians = 1.255

export default function Experience()
{
    const [ cameraControls, setCameraControls ] = useState(true)
    const [finalPosition, setFinalPosition] = useState(false)
    const [supportCollider, setSupportCollider] = useState(true)

    let panelRef = useRef()

    const cameraControlsRef = useRef()
    const { camera } = useThree()
    const { DEG2RAD } = THREE.MathUtils

    // Loading the models: flightHelmet is a test model
    const flightHelmet = useGLTF('./FlightHelmet/glTF/FlightHelmet.gltf')

    // Moves the camera
    const handleClick = (click) => 
    {
        setFinalPosition(true)
        setSupportCollider(false)
        const posA = [camera.position.x, camera.position.y, camera.position.y] 
        const tgtA = [panelRef.current.position.x, panelRef.current.position.y, panelRef.current.position.z]
        const posB = [-10, 4, 7]
        const tgtB = [0, 0, 0]
        return cameraControlsRef.current?.lerpLookAt(
            ...posA,
            ...tgtA,
            ...posB,
            ...tgtB,
            1,
            true
        )
        // This is the polar position when the camera moved
        
    }

    // For setting up where the camera is looking and sets the max/min horizontal rotation angles
    useEffect(() =>
    {
        if(cameraControlsRef.current)
        {   
            // Sets the camera positiong and target at the same time ( position, target)
            cameraControlsRef.current.setLookAt(-3.9, 10.2, 11.9, -0.6899, 10.2, 3.6)
            // console.log(cameraControlsRef.current)

            // The '+ Math.PI * 2' is needed because the base camera position was not in range yet and would cause the whole scene to spin till it was in range

            // play with the *0.25 a bit more to get the angle i want
            cameraControlsRef.current.maxAzimuthAngle = Math.PI * 0.05 + Math.PI * 2
            cameraControlsRef.current.minAzimuthAngle = -Math.PI * 0.55 + Math.PI * 2
        }
    }, [])

    // I'm using useFrame for the PolarAngle becasue I want it to be dynamic depending if the camera is in the final position or not
    // locks off verticle rotation. either at 1.255 if looking at the camp scene or 90degrees if looking at the sign
    useFrame(() =>
    {

        // When this is 90, that's why the camera is going to y:0. Because that is where the PolarAngle would be 90. I need to find what the polar angle is to looking at 0 after the camera moves and then lock it in place there
        cameraControlsRef.current.maxPolarAngle = finalPosition? 1.255: Math.PI * 0.5
        cameraControlsRef.current.minPolarAngle = finalPosition? 1.255: Math.PI * 0.5
    })


    /* 
     * Rope Joint (i'll get there)
    */
    
    const {supportPosition} = useControls('SupportBox',
        {
            supportPosition:
            {
                value: {x: -0.2452, z: 3.2},
                step: 0.1,
            }
        }
    )

    return <>
        <Perf position='top-left' />
        <OrbitControls 
            makeDefault
            enabled={true}
            enableDamping={false}
        />
        <CameraControls 
                ref={cameraControlsRef}
                enabled={false}
                mouseButtons = {{
                    left: CameraControlsReact.ACTION.ROTATE,
                    right: CameraControlsReact.ACTION.NONE,
                    wheel: CameraControlsReact.ACTION.NONE,
                    middle: CameraControlsReact.ACTION.NONE,
                }}                   
            />
        <Lighting />

        <Suspense
            fallback={
                <mesh>
                    <boxGeometry/>
                    <meshBasicMaterial />
                </mesh>
            }
        >
            <primitive 
                object={flightHelmet.scene}
                scale={5}
            />
        </Suspense>

        {/* The Text on the sign*/}
        <CozyCampText />
            
            
        {/*  The wood for the panel/Sign  */}
        <Physics>
            <group>
                <RigidBody
                    type='fixed'
                >
                    <mesh 
                        ref={panelRef}
                        onClick={handleClick}
                        position={[-0.6899, 10.2, 3.6]}
                        scale={[5.8, 3.3, 0.2]}
                        rotation-y={Math.PI * 0.75}
                    >
                        <boxGeometry/>
                        <meshToonMaterial color={'#916302'} />
                    </mesh>
                </RigidBody>

                {/* Support Box */}
                {/* Once the scene loads, this will disapear allowing the 'move camera' sign behind the 'cozy camp' sign to fall and the use can click on that */}
                { !flightHelmet && (<RigidBody
                    type='fixed'
                    colliders='cuboid'
                    position={[supportPosition.x, 9.25, supportPosition.z]}
                    scale={[1.3, 0.5, 3 ]}
                    rotation-y={Math.PI * 0.25}
                >
                    <mesh>
                        <boxGeometry />
                        <meshBasicMaterial />
                    </mesh>
                </RigidBody> 
                )}
                {/* The 'click to start' sign that will fall */}
                <RigidBody
                    position={[supportPosition.x, 10.6, supportPosition.z]}
                    scale={[0.5, 1.5, 2.5 ]}
                    rotation-y={Math.PI * 0.25}                
                >
                    <mesh>
                        <boxGeometry />
                        <meshToonMaterial />
                    </mesh>
                </RigidBody>
            </group>
        </Physics>
        
        
        <FireScene />
    </>
}
