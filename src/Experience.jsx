import { OrbitControls, PresentationControls, Text3D, CameraControls, SpotLight, useGLTF, Text } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useState, useEffect, Suspense } from 'react'
import { useControls } from 'leva'
import * as THREE from 'three'
import { Physics, RapierRigidBody, RigidBody, useRopeJoint } from '@react-three/rapier'


// These two are needed to make the CameraControls tag work better
import CameraControlsReact from 'camera-controls'
CameraControlsReact.install({THREE:THREE})

// My fragments
import useWorld from './stores/useWorld'
import FireScene from './firescene/FireScene'
import Lighting from './environement/Lighting'
import CozyCampText from './startScreen/CozyCampText'
import Grass from './grass/Grass'

const degToRad = (degrees) => degrees * (Math.PI /180)
const finalPolarPositionRadians = 1.255

export default function Experience()
{
    const [finalPosition, setFinalPosition] = useState(false)    
    const [supportCollider, setSupportCollider] = useState(true)

    const cameraControlsRef = useRef()
    const { camera } = useThree()
    const { DEG2RAD } = THREE.MathUtils

    useGLTF.preload('./FlightHelmet/glTF/FlightHelmet.gltf')
    // Loading the models: flightHelmet is a test model
    const flightHelmet = useGLTF('./FlightHelmet/glTF/FlightHelmet.gltf')

    // Moves the camera
    const handleClick = (click) => 
    {
        setFinalPosition(true)
        setSupportCollider(false)
        // seems like posA and tgtA can bee whatever coords. I'm not sure what difference they make. I think because of the .setLookAt() these are being overridden
        const posA = [0,0,0] 
        const tgtA = [0,0,0]
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
    }
    // For setting up where the camera is looking and sets the max/min horizontal rotation angles
    useEffect(() =>
    {
        if(cameraControlsRef.current)
        {   
            // Sets the camera positiong and target at the same time ( position, target)
            cameraControlsRef.current.setLookAt(-3.9, 9.2, 11.9, -0.6899, 9.2, 3.6)
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
     * Rope Joint (This has been rough :) )
    */

    const SignRopeJoint = () =>
    {
        const cozySignRef = useRef()
        const startSignRef = useRef()
        useRopeJoint(cozySignRef, startSignRef, [
            [-0.6899, 10.2, 3.6], // position of the joint in cozySign's local space
            [-0.5, 0, 0], // position of the joint in startSign's local space
            2.85 // How far they can move from eachother
        ])
        useRopeJoint(cozySignRef, startSignRef, [
            [-0.6899, 10.2, 3.6], // position of the joint in cozySign's local space
            [0.5, 0, 0], // position of the joint in startSign's local space
            2.85 // How far they can move from eachother
        ])

        return(
            <>
             {/*  The wood for the panel/Sign. It has the onClick function right now but that will be swapped to the startSign once the rope joint is working :)  */}
                    <RigidBody
                        ref={cozySignRef}
                        type='fixed'
                    >
                        <mesh 
                             
                            position={[-0.6899, 10.2, 3.6]}
                            scale={[5.8, 3.3, 0.2]}
                            rotation-y={Math.PI * 0.75}
                        >
                            <boxGeometry/>
                            <meshToonMaterial color={'#916302'} />
                        </mesh>
                    </RigidBody>

                    {/* Support Box */}
                    {/* The intention is that once the model, this block disapear allowing the 'move camera' sign behind the 'cozy camp' sign to fall and the use can click on that. This sign should be attached to the 'Cozy' sign via a rope joint*/}
                    { !flightHelmet && (<RigidBody
                        type='fixed'
                        colliders='cuboid'
                        position={[-0.2452, 9.25, 3.2]}
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
                        ref={startSignRef}
                        density={30}
                        onClick={handleClick}
                        position={[-0.2452, 10.6, 3.2]}
                        scale={[0.2, 1.5, 2.5 ]}
                        rotation={[Math.PI * 0.1, Math.PI * 0.25, Math.PI * 0.1]}
                        // rotation-x = {Math.PI * 0.1}                
                    >
                        <mesh>
                            <boxGeometry />
                            <meshToonMaterial 
                                color='#916302'
                            />
                        </mesh>
                        <Text
                            rotation-y={ - Math.PI * 0.5}
                            scale={0.3}
                            position={[-0.52,0,0]}
                            anchorX='center'
                            anchorY='middle'
                            font='./text/FingerPaint-Regular.ttf'
                            color='#E13C42'
                            
                        >
                            Start!
                        </Text>
                    </RigidBody>
            </>
        )
    }

    return (
    <>
        {/* I wrapped everything in the physics tag to make sure nothing that uses physics was left out */}
        <Physics>
            <Suspense
                fallback={null}
            >
                {/* The Flight helmet model, it's commented out, causes a stutter with the camera movement */}
                {/* <primitive 
                    object={flightHelmet.scene} 
                    scale={5}
                /> */}

                <Perf position='top-left' />
                
                <Lighting />
                {/* The Text on the sign*/}
                <CozyCampText />  

                {/* Where i'm trying to get the start sign to fall but be on a rope  */}
                <SignRopeJoint /> 

                {/* The tent, firepit, marshmellows */}
                <FireScene /> 


                {/* the grass particles */}
                <Grass />


            </Suspense>


            {/* Make sure to keep this out of the suspence or this controls won't work till the whole scene is loaded */}
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
            <OrbitControls 
                enabled={true}
                enableDamping={false}
                makeDefault={true}
            />
        </Physics>      

    </>)
}
