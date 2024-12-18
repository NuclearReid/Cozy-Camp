import { useRef } from "react"
// import { ShaderMaterial } from "three"
import { extend, useThree} from '@react-three/fiber'
import * as THREE from 'three'
import grassVertexShader from '../shaders/grassShader/vertex.glsl'
import grassFragmentShader from '../shaders/grassShader/fragment.glsl'
import { shaderMaterial, useTexture } from "@react-three/drei"

const GrassMaterial = shaderMaterial(
    {
        uTime: 0,
    },
    grassVertexShader,
    grassFragmentShader,
)

extend({GrassMaterial})



// Possiblity for the grass: make a whole bunch of triangles and use the same geometry over and over and over again? and just place them everywhere? 
// take a look here: https://jsfiddle.net/felixmariotto/hvrg721n/
// or this one https://smythdesign.com/blog/stylized-grass-webgl/     <-- I like this more but it seems to be causing issues
export default function Grass()
{
    const grassMaterialRef = useRef()
    const grassPointRef = useRef()

    // Create a buffer geometry with points

    return (
        <mesh
            ref={grassPointRef}
            position-y={ - 1 } 
            rotation-x={ - Math.PI * 0.5 } 
            scale={ 10 }
        >
            <circleGeometry />
            <grassMaterial
                ref={grassMaterialRef}
            />
        </mesh>
)
}