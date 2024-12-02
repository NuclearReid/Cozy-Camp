import { shaderMaterial, useTexture } from "@react-three/drei"
import { extend, useFrame, useThree } from "@react-three/fiber"
import fireVertexShader from '../shaders/fireShader/vertex.glsl'
import fireFragmentShader from '../shaders/fireShader/fragment.glsl'
import { useRef } from "react"
import * as THREE from 'three'



const FireMaterial = shaderMaterial(
    {
        uTime: 0,
        uFirePng: null,
        
    },
    fireVertexShader,
    fireFragmentShader
)
extend({FireMaterial})


export default function FireTexture()
{
    const fireMaterialRef = useRef()
    const fireMeshRef = useRef()

    const fireTexture = useTexture('./fire/fireTexture.png')
    const { camera } = useThree()

    fireTexture.wrapS = THREE.RepeatWrapping
    fireTexture.wrapT = THREE.RepeatWrapping

    useFrame((state, delta) =>
    {
        if(fireMaterialRef.current)
        {
            fireMeshRef.current.rotation.copy(camera.rotation) // Makes it so the fire will always face the camera
            fireMaterialRef.current.uTime += delta
        }
    })

    return(
        <>
                <mesh
                    ref={fireMeshRef}
                    position={[-2.4, -0.5, 1.9]}
                    scale={[0.8, 0.3, 0.5]}
                >
                    <planeGeometry
                        args={[1.5,6, 16, 64]}   
                    />
                    <fireMaterial
                        ref={fireMaterialRef}
                        uFirePng={fireTexture}
                        transparent={true}
                        depthWrite={true}
                        side={THREE.DoubleSide}
                    />
                </mesh>
        </>
    )
}