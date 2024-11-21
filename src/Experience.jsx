import { OrbitControls, PresentationControls, Text3D, CameraControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'
import { useControls } from 'leva'
import * as THREE from 'three'

import useWorld from './stores/useWorld'
import FireScene from './firescene/FireScene'
import Lighting from './environement/Lighting'


export default function Experience()
{
    const textRef = useRef()
    const [ clicked, setClicked ] = useState(false)
    const [smoothCameraTarget] = useState(() => new THREE.Vector3())
    const [smoothCameraPosition] = useState(() => new THREE.Vector3(-10, 3, 6))
    const panelRef = useRef()
    const vec = new THREE.Vector3() 

    const cameraControlsRef = useRef()
    const { camera } = useThree()

    // Where to have the camera looking originally
    useEffect(() =>
    {
            const originalCameraLook = new THREE.Vector3(-0.6899, 10.2, 3.6)
            camera.lookAt(originalCameraLook)
            camera.updateProjectionMatrix() 
    }, [camera]);

    // Tweaks
    const {cameraPositionTweek} = useControls('Camera Position',
        {
        cameraPositionTweek:
        {
            value: {x: -7.9, y: 9.2, z: 8.9},
            min: -10,
            max: 15,
            step: 0.1,
        },
        }
    )

    const handleClick = (click) => 
    {
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
            );
    }


    return <>
        <Perf position='top-left' />
        <Lighting />
        <OrbitControls makeDefault /> 
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

                <CameraControls ref={cameraControlsRef} />
            </group>


            <FireScene />

    
    </>
}

{/* <PresentationControls
            global={true}
            snap={true}
            cursor={false}
            polar={[0, 0]} // Can't rotate up and down
            azimuth={[-0.75, 0.75]} // Horizontal limits
            config={{ mass: 1, tension: 170, friction: 26 }} // Spring config
        >    */}

                {/* </PresentationControls> */}





        // If clicked attempt 1
// const cameraPosition = new THREE.Vector3()
// // cameraPosition.copy(state.camera.position)

// const cameraTarget = new THREE.Vector3(0, 0, 0)

// smoothCameraPosition.lerp(cameraPosition, 5 * delta)
// smoothCameraTarget.lerp(cameraTarget, 5 * delta)

// state.camera.position.lerp(vec.set(-10, 3, 6), 0.01)
// state.camera.lookAt(smoothCameraTarget)
// state.camera.updateProjectionMatrix()

// My useFrame
    // useFrame((state, delta) => {
    //     if (clicked) {
    //         const posA = [-7.9, 9.2, 8.9]; 
    //         const tgtA = [panelRef.current.position.x, panelRef.current.position.y, panelRef.current.position.z]; 
    //         const posB = [0, 0, 0]; 
    //         const tgtB = [0, 0, 0];

    //         // Where I want the end position to be looking at: [-10, 10, 7],
    
    //         cameraControlsRef.current?.lerpLookAt(
    //             ...posA,
    //             ...tgtA,
    //             ...posB,
    //             ...tgtB,
    //             delta,
    //             true
    //         );
    //     } 
    //     else {
    //         state.camera.lookAt(panelRef.current.position);
    //         state.camera.position.lerp(vec.set(-7.9, 9.2, 8.9), 0.1 * delta);
    //         state.camera.updateProjectionMatrix();
    //     }
    //     console.log(clicked)
    // });






/*  Sample useFrame
 useFrame((state, delta) => 
    {
        if(!clicked)
        {
            state.camera.lookAt(panelRef.current.position)

            state.camera.position.lerp(vec.set(cameraPositionTweek.x, cameraPositionTweek.y, cameraPositionTweek.z), 0.01)
            state.camera.updateProjectionMatrix()            
        }
        else if(clicked)
        {
            
            //     //I want to pan the camera down to look at the scene
            //     // then I want to move the camera to be in place with the scene

            //     lerpLookAt
            //     {
            //     vec6: { value: [-2, 0, 0], label: 'posA' },
            //     vec7: { value: [1, 1, 0], label: 'tgtA' },
            //     vec8: { value: [0, 2, 5], label: 'posB' },
            //     vec9: { value: [-1, 0, 0], label: 'tgtB' },
            //     t: { value: Math.random(), label: 't', min: 0, max: 1 },
            //     'f(…posA,…tgtA,…posB,…tgtB,t)': button((get) => {
            //     return cameraControlsRef.current?.lerpLookAt(
            //         ...get('lerpLookAt.vec6'),
            //         ...get('lerpLookAt.vec7'),
            //         ...get('lerpLookAt.vec8'),
            //         ...get('lerpLookAt.vec9'),
            //         get('lerpLookAt.t'),
            //         true
            //     )
            //     })
            // },


            // <group position-y={-0.5}>
            //     <Center top>
            //     <Suzi ref={meshRef} rotation={[-0.63, 0, 0]} />
            //     </Center>
            //     <Ground />
            //     <Shadows />
            //     <CameraControls
            //     ref={cameraControlsRef}
            //     minDistance={minDistance}
            //     enabled={enabled}
            //     verticalDragToForward={verticalDragToForward}
            //     dollyToCursor={dollyToCursor}
            //     infinityDolly={infinityDolly}
            //     />
            //     <Environment files={suspend(city).default} />
            // </group>


            
            const cameraPosition = new THREE.Vector3()
            cameraPosition.copy(state.camera.position)

            const cameraTarget = new THREE.Vector3()

            smoothCameraPosition.lerp(cameraPosition, 5 * delta)

            smoothCameraTarget.lerp(cameraTarget, 5 * delta)

            state.camera.position.lerp(vec.set(-10, 3, 6), 0.01)
            state.camera.lookAt(smoothCameraTarget)
            state.camera.updateProjectionMatrix()
        }

        return null
    })

 */