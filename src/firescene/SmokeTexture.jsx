import * as THREE from 'three'
import { useTexture, shaderMaterial } from "@react-three/drei"
import { extend, useFrame, useThree } from "@react-three/fiber"
import { useRef } from 'react'
import fireSmokeVertexShader from '../shaders/smokeShader/vertex.glsl'
import fireSmokeFragmentShader from '../shaders/smokeShader/fragment.glsl'


const SmokeMaterial = shaderMaterial(
    { 
        uTime: 0,
        uPerlinTexture: null
    },
    fireSmokeVertexShader,
    fireSmokeFragmentShader
)
extend({SmokeMaterial}) // this can now be used as <fireMaterial/>

export default function FireTexture()
{
    const materialRef = useRef()
    const meshRef = useRef()
    const { camera } = useThree()

    const perlinTexture = useTexture('./fire/perlin.png')
    perlinTexture.wrapS = THREE.RepeatWrapping
    perlinTexture.wrapT = THREE.RepeatWrapping
    
    useFrame((state, delta) =>
    {
        if(materialRef.current)
        {
            materialRef.current.uTime += delta
            meshRef.current.rotation.copy(camera.rotation)
        }
    })

    return(
        <>
            <mesh
                ref={meshRef}
                rotation-y={-Math.PI * 0.5}
                position={[-2.4, 2.8, 1.9]}
                scale={[1, 1.2, 1]}

            >
                <planeGeometry
                    args={[1.5, 6, 16, 64]} 
                />
                <smokeMaterial
                    ref={materialRef} 
                    uPerlinTexture={perlinTexture}
                    transparent
                    side={THREE.DoubleSide}
                    depthWrite={true}
                />
            </mesh>
        
        </>
    )
}