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

export default function Experience()
{
    const textRef = useRef()
    const [ cameraControls, setCameraControls ] = useState(true)

    const panelRef = useRef()

    const cameraControlsRef = useRef()
    const { camera } = useThree()
    const { DEG2RAD } = THREE.MathUtils

    // Moves the camera
    const handleClick = (click) => 
    {

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
    }


    // How to rotate the camera to have it start by looking at the panel
    useEffect(() =>
    {
        if(cameraControlsRef.current)
        {   
            // Sets the camera positiong and target at the same time ( position, target)
            cameraControlsRef.current.setLookAt(-3.9, 10.2, 11.9, -0.6899, 10.2, 3.6)
            // console.log(cameraControlsRef.current)

            // The '+ Math.PI * 2' is needed because the base camera position was not in range yet and would cause the whole scene to spin till it was in range
            cameraControlsRef.current.maxAzimuthAngle = Math.PI * 0.05 + Math.PI * 2
            cameraControlsRef.current.minAzimuthAngle = -Math.PI * 0.25 + Math.PI * 2

            // I think this is something similar to the Azimuth angle where the PolarMax is not in range either.
            cameraControlsRef.current.maxPolarAngle = Math.PI * 0.5
            cameraControlsRef.current.minPolarAngle = Math.PI * 0.5
        }
    }, [])


    // Firepit debugging
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
