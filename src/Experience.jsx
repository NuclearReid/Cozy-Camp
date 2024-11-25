import { OrbitControls, PresentationControls, Text3D, CameraControls, SpotLight } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'
import { useControls } from 'leva'
import * as THREE from 'three'

// These two are needed to make the CameraControls tag work better
import CameraControlsReact from 'camera-controls'
CameraControlsReact.install({THREE:THREE})

// My fragments
import useWorld from './stores/useWorld'
import FireScene from './firescene/FireScene'
import Lighting from './environement/Lighting'

const degToRad = (degrees) => degrees * (Math.PI /180)
const finalPolarPositionRadians = 1.255

export default function Experience()
{
    const textRef = useRef()
    const [ cameraControls, setCameraControls ] = useState(true)
    const [finalPosition, setFinalPosition] = useState(false)

    const panelRef = useRef()

    const cameraControlsRef = useRef()
    const { camera } = useThree()
    const { DEG2RAD } = THREE.MathUtils

    // Moves the camera
    const handleClick = (click) => 
    {
        setFinalPosition(true)
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




    return <>
        <Perf position='top-left' />
        <Lighting />

        {/* The Text */}
            <Text3D 
                ref={textRef}
                font='./text/FingerPaint-Regular.ttf'
                rotation-y={ - Math.PI * 0.25}
                // position-y={1.4}
                position={[-2.19, 10.6, 2.2]}
            >
                Cozy 
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
            
            {/*  The wood for the panel/Sign  */}

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
                  

            <FireScene />

            <CameraControls 
                ref={cameraControlsRef}
                enabled={true}
                // makeDefault={false}                    
                mouseButtons = {{
                    left: CameraControlsReact.ACTION.ROTATE,
                    right: CameraControlsReact.ACTION.NONE,
                    wheel: CameraControlsReact.ACTION.NONE,
                    middle: CameraControlsReact.ACTION.NONE,
                }}                   
            />


    </>
}
