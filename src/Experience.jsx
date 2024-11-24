import { OrbitControls, PresentationControls, Text3D, CameraControls } from '@react-three/drei'
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
    const [ clicked, setClicked ] = useState(false)
    const [ cameraControls, setCameraControls ] = useState(true)

    const panelRef = useRef()

    const cameraControlsRef = useRef()
    const { camera } = useThree()
    const { DEG2RAD } = THREE.MathUtils


    // Tweaks
    const {cameraPositionTweek, thetaRotate, phiRotate} = useControls('Camera Position',
        {
            cameraPositionTweek:
            {
                value: {x: -7.9, y: 9.2, z: 8.9},
                min: -10,
                max: 15,
                step: 0.1,
            },
            thetaRoate:
            {
                value: 45,
                min: 0,
                max: 360,
                step: 10
            },
            phiRoate:
            {
                value: 45,
                min: 0,
                max: 360,
                step: 10
            }

        }
    )


    // Moves the camera
    const handleClick = (click) => 
    {
            setClicked(true)
            const posA = [camera.position.x, camera.position.y, camera.position.y] 
            const tgtA = [panelRef.current.position.x, panelRef.current.position.y, panelRef.current.position.z]
            const posB = [-10, 4, 7]
            const tgtB = [0, 0, 0]
            // Where I want the end position to be looking at: [-10, 4, 7],
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
            console.log(cameraControlsRef.current)
            // Sets the camera positiong and target at the same time ( position, target)
            cameraControlsRef.current.setLookAt(-3.9, 10.2, 11.9, 2, 10, 0)
            // console.log(cameraControlsRef.current)
            cameraControlsRef.current.maxAzimuthAngle = Math.PI * 0.05
            cameraControlsRef.current.minAzimuthAngle = -Math.PI * 0.25

            // these should both be at Math.PI * 0.5 to lock verticle rotation
            // cameraControlsRef.current.maxPolarAngle = Math.PI * 0.5
            // cameraControlsRef.current.minPolarAngle = Math.PI * 0.5
        }
    }, [])

    return <>
        <Perf position='top-left' />
        <Lighting />
            <group >
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

                <CameraControls 
                    ref={cameraControlsRef}
                    enabled={true}
                    makeDefault={false}                    
                    mouseButtons = {{
                        left: CameraControlsReact.ACTION.ROTATE,
                        right: CameraControlsReact.ACTION.NONE,
                        wheel: CameraControlsReact.ACTION.NONE,
                        middle: CameraControlsReact.ACTION.NONE,
                    }}
                   
                />
            </group>
            <FireScene />
    </>
}
