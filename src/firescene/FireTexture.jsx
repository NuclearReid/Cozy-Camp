import * as THREE from 'three'
import { useTexture, shaderMaterial } from "@react-three/drei"
import { extend, useFrame } from "@react-three/fiber"
import { useRef } from 'react'
import fireSmokeFragmentShader from '../shaders/smokeShader/fragment.glsl'
import fireSmokeVertexShader from '../shaders/smokeShader/vertex.glsl'


const FireMaterial = shaderMaterial(
    { 
        uTime: 0.0,
        uPerlinTexture: null
    },
    fireSmokeVertexShader,
    fireSmokeFragmentShader
)

extend({FireMaterial}) // Makes FireMaterial into a .jsx tag


export default function FireTexture()
{

    const perlinTexture = useTexture('./fire/perlin.png')

    console.log(perlinTexture)

    const fireMaterial = useRef()
    if(fireMaterial.current)
    {
        console.log(fireMaterial)
        useFrame((state, delta) =>
        {
            fireMaterial.current.uTime += delta
        })
    }

    return(
        <>
        
        </>
    )
}