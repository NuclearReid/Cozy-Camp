import { OrbitControls, CameraControls, Text, Sparkles, Html } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'
import { useControls } from 'leva'
import * as THREE from 'three'
import { Physics, RigidBody, useRopeJoint } from '@react-three/rapier'


// These two are needed to make the CameraControls tag work better
import CameraControlsReact from 'camera-controls'
CameraControlsReact.install({THREE:THREE})

// My fragments
import FireScene from './firescene/FireScene'
import Lighting from './environement/Lighting'
import CozyCampText from './startScreen/CozyCampText'
import Grass from './grass/Grass'
import LoadingScreen from '../components/LoadingScreen'

export default function Experience({
    loading,
    data
    })

{
    console.log('in experience, ', data)    
    const [finalPosition, setFinalPosition] = useState(false)
    // if(isLoading){
    //     return <Html>Loading...</Html>
    // }  

    const cameraControlsRef = useRef()
    // Loading the models: flightHelmet is a test model
    // const flightHelmet = useGLTF('./FlightHelmet/glTF/FlightHelmet.gltf')

    // Moves the camera
    const handleClick = (click) => 
    {
        setFinalPosition(true)
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

    // It's a bit wonky but rerenders the grass each time the screen resizes. 
    // The reason for this is because without it, when the screen resized all the grass blades would lose their instantiation and I'd just have one blade of grass in the center of the screen.
    // Without this, the grass would work after a vite HMR and I don't know why
    const { invalidate } = useThree()
    useEffect(() => {
        const handleResize = () => {
            invalidate()
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [invalidate]);

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
                        position={[-0.52,0.15,0]}
                        anchorX='center'
                        anchorY='middle'
                        font='./text/FingerPaint-Regular.ttf'
                        color='#E13C42'
                        
                    >
                        Click
                    </Text>
                    <Text
                        rotation-y={ - Math.PI * 0.5}
                        scale={0.3}
                        position={[-0.52,-0.10,0]}
                        anchorX='center'
                        anchorY='middle'
                        font='./text/FingerPaint-Regular.ttf'
                        color='#E13C42'
                        
                    >
                        Me!
                    </Text>
                </RigidBody>
                {/* Grass is here to give it some time to render. If it's in the return() below, only one blade of grass is rendered */}
                <Grass/>
            </>
        )
    }

    return (
        <>
            {/* I wrapped everything in the physics tag to make sure nothing that uses physics was left out */}
            <Physics>


                {/* <Perf position='top-left' /> */}
                <Lighting 
                    loading = {loading}
                    data = {data}
                />
                
                {/* The Text on the sign*/}
                <CozyCampText
                    data={data}
                />  
                {/* Where i'm trying to get the start sign to fall but be on a rope  */}
                <SignRopeJoint /> 



                {/* User Options: <Shelter/>, <Transport/>, firepit, marshmellows are in here */}
                <FireScene 
                    loading = {loading}
                    data = {data}
                /> 



                {/* Fireflies */}
                <Sparkles // to create the fireflies
                    scale={[15, 5, 15]}
                    position={[0,0.5,0]} // or position-y={1.2}
                    size={10}
                    count={50}
                    noise={300}
                    speed={0.9}
                />
                {/* Make sure to keep this out of the suspence or this controls won't work till the whole scene is loaded */}
                <CameraControls 
                    ref={cameraControlsRef}
                    enabled={true}
                    mouseButtons = {{
                        left: CameraControlsReact.ACTION.ROTATE,
                        right: CameraControlsReact.ACTION.NONE,
                        wheel: CameraControlsReact.ACTION.NONE,
                        middle: CameraControlsReact.ACTION.NONE,
                    }}                   
                />
                <OrbitControls 
                    enabled={false}
                    enableDamping={false}
                    makeDefault={true}
                />
            </Physics>      
        </>
    )
}
