import { useRef, useEffect } from "react"
// import { ShaderMaterial } from "three"
import { extend, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import grassVertexShader from '../shaders/grassShader/vertex.glsl'
import grassFragmentShader from '../shaders/grassShader/fragment.glsl'
import { shaderMaterial, useTexture } from "@react-three/drei"
import { useControls } from "leva"

const GrassMaterial = shaderMaterial(
    {
        uTime: 0,
    },
    grassVertexShader,
    grassFragmentShader,
)

extend({GrassMaterial})

export default function Grass()
{
    const materialRef = useRef()
    const meshRef = useRef()
    const instanceNumber = 7000 // Change this if i want more or less grass

    useEffect(() =>
    {
        const grassBlade = new THREE.Object3D() // This is used to create an object for each blade of grass 
        const radius = 0.5 * Math.PI * 5

        // This is for the positioning if each blade of grass
        for(let i =0; i < instanceNumber; i ++)
        {
            const angle = Math.random() * Math.PI * 2 
            const r = Math.sqrt(Math.random()) * radius // Gets a random spot within the circle. Without this, the grass would only be along the parimeter
            const x = Math.cos(angle) * r
            const z = Math.sin(angle) * r

            grassBlade.position.set(x, 0, z)
            grassBlade.scale.setScalar(0.5 + Math.random() * 0.5) // sets a random scale to each blade of grass from 0.5 to 1
            grassBlade.rotation.y = Math.random() * Math.PI
            grassBlade.updateMatrix()
            meshRef.current.setMatrixAt(i, grassBlade.matrix)
        }

        meshRef.current.instanceMatrix.needsUpdate = true
    }, [ instanceNumber] )

    useFrame((state, delta) =>
    {
        materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime()
    })


    // To make the grass a plane
    const geometry = new THREE.PlaneGeometry(0.1, 1, 1, 4) // Needs to be a PlaneGeometry because that's what the shader will use for the shape of each blade of grass

    return(
        <>
            <instancedMesh
                ref={meshRef}
                args={[geometry, materialRef.current, instanceNumber]}
                scale={[1.25, 0.15, 1.25]}
                position={[0, -1.0, 0]}
            >
                <grassMaterial
                    ref={materialRef}
                    attach="material"
                    side={THREE.DoubleSide}
                />
            </instancedMesh>
        </>
    )
}





// Possiblity for the grass: make a whole bunch of triangles and use the same geometry over and over and over again? and just place them everywhere? 
// take a look here: https://jsfiddle.net/felixmariotto/hvrg721n/
// or this one https://smythdesign.com/blog/stylized-grass-webgl/     <-- I like this more but it seems to be causing issues
