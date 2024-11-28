import * as THREE from 'three'
import { Center, OrbitControls, shaderMaterial, Sparkles, useGLTF, useTexture } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import portalVertexShader from '../shaders/portalShader/vertex.glsl'
import portalFragmentShader from '../shaders/portalShader/fragment.glsl'
import { extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react'

const PortalMaterial = shaderMaterial(  // the drei helper for shader materials
    {
        uTime: 0,
        uColorStart: new THREE.Color('#ffffff'),
        uColorEnd:   new THREE.Color('#0000ff')
    },
    portalVertexShader,
    portalFragmentShader
)

extend({PortalMaterial}) // turns PortalMaterial into a JSX tag. the tag that can be used is <portalMaterial />

export default function FireTexturePractice()
{
    // const perlinTexture = useTexture('./shaders/fireShader/includes/rotate2D.glsl')
    const portalMaterial = useRef()
    useFrame((state, delta) =>
    {
        portalMaterial.current.uTime += delta // don't forget the '.current'!!!!!
    })

    return <>
        {/* <Perf position='top-left'/> */}
            
            <mesh
                position={[-2.5, -0.0, 1.8]}
                rotation-y={- Math.PI * 0.5}
            >
                <circleGeometry 
                    args={[1,32]}

                />
                <portalMaterial 
                    ref={portalMaterial} 
                />
            </mesh>
    </>
}