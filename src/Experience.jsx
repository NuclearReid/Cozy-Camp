import { CameraControls, OrbitControls, PresentationControls, Text3D } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { useControls } from 'leva'
import * as THREE from 'three'

import useWorld from './stores/useWorld'
import FireScene from './firescene/FireScene'
import Lighting from './environement/Lighting'


export default function Experience()
{
    const textRef = useRef()
    const [ clicked, setClicked ] = useState(false)
    const panelRef = useRef()
    const cameraControlsRef = useRef()

    const vec = new THREE.Vector3()

    const [smoothCameraTarget] = useState(() => new THREE.Vector3())
    const [smoothCameraPosition] = useState(() => new THREE.Vector3(-10, 3, 6))

    // Tweaks

    const {cameraPosition} = useControls('Camera Position',
        {
        cameraPosition:
        {
            value: {x: -7.9, y: 9.2, z: 8.9},
            min: -10,
            max: 15,
            step: 0.1,
        },
        }
    )
    useFrame((state, delta) => 
    {
        if(!clicked)
        {
            state.camera.lookAt(panelRef.current.position)
            state.camera.position.lerp(vec.set(cameraPosition.x, cameraPosition.y, cameraPosition.z), 0.01)
            state.camera.updateProjectionMatrix()            
        }
        else if(clicked)
        {
            const cameraPosition = new THREE.Vector3()
            // cameraPosition.copy(state.camera.position)

            const cameraTarget = new THREE.Vector3(0, 0, 0)

            smoothCameraPosition.lerp(cameraPosition, 5 * delta)
            smoothCameraTarget.lerp(cameraTarget, 5 * delta)

            state.camera.position.lerp(vec.set(-10, 3, 6), 0.01)
            state.camera.lookAt(smoothCameraTarget)
            state.camera.updateProjectionMatrix()
            
        }

        return null
    })

  


    return <>
        <Perf position='top-left' />
        <Lighting />
        <OrbitControls makeDefault /> 

        {/* <PresentationControls
            global={true}
            snap={true}
            cursor={false}
            polar={[0, 0]} // Can't rotate up and down
            azimuth={[-0.75, 0.75]} // Horizontal limits
            config={{ mass: 1, tension: 170, friction: 26 }} // Spring config
        > */}


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
                onClick={() => setClicked(!clicked)}
                position={[-0.6899, 10.2, 3.6]}
                scale={[5.8, 3.3, 0.2]}
                rotation-y={Math.PI * 0.75}
            >
                <boxGeometry/>
                <meshToonMaterial color={'#916302'} />
            </mesh>


            <FireScene />

        {/* </PresentationControls> */}
    
    </>
}




        // If clicked attempt 1
// const cameraPosition = new THREE.Vector3()
// // cameraPosition.copy(state.camera.position)

// const cameraTarget = new THREE.Vector3(0, 0, 0)

// smoothCameraPosition.lerp(cameraPosition, 5 * delta)
// smoothCameraTarget.lerp(cameraTarget, 5 * delta)

// state.camera.position.lerp(vec.set(-10, 3, 6), 0.01)
// state.camera.lookAt(smoothCameraTarget)
// state.camera.updateProjectionMatrix()