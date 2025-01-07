import { useRef, useEffect } from "react"
// import { ShaderMaterial } from "three"
import { extend, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import grassVertexShader from '../shaders/grassShader/vertex.glsl'
import grassFragmentShader from '../shaders/grassShader/fragment.glsl'
import { shaderMaterial } from "@react-three/drei"
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
        
        // Where grass will not be placed
        const fireRingPosition = new THREE.Vector3(-2.25, 0.9, 1.60)
        const exclusionRadius = 1.3

        // This is for the positioning if each blade of grass
        for(let i =0; i < instanceNumber; i ++)
        {
            const angle = Math.random() * Math.PI * 2 
            const r = Math.sqrt(Math.random()) * radius // Gets a random spot within the circle. Without this, the grass would only be along the parimeter
            const x = Math.cos(angle) * r
            const z = Math.sin(angle) * r

            // Makes a circle where the fire pit is and does not place any grass here
            const grassPosition = new THREE.Vector3(x, 0, z)

            if (grassPosition.distanceTo(fireRingPosition) < exclusionRadius) {
                continue // Skip this position if it's within the exclusion radius
            }

            grassBlade.position.set(x, 0, z)
            grassBlade.scale.setScalar(0.5 + Math.random() * 0.5) // sets a random scale to each blade of grass from 0.5 to 1
            grassBlade.rotation.y = Math.random() * Math.PI
            grassBlade.updateMatrix()
            meshRef.current.setMatrixAt(i, grassBlade.matrix)
        }
        meshRef.current.instanceMatrix.needsUpdate = true
    }, [ instanceNumber ] )      

    useFrame((state, delta) =>
    {
        if(materialRef.current)
        {
            materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime()
        }
    })  

    // To make the grass a plane
    const geometry = new THREE.PlaneGeometry(0.1, 1, 1, 4) // Needs to be a PlaneGeometry because that's what the shader will use for the shape of each blade of grass

    return(
        <>
            <instancedMesh
                ref={meshRef}
                args={[
                    geometry, 
                    materialRef.current, 
                    // new THREE.MeshBasicMaterial(), 
                    instanceNumber
                ]} 
                scale={[1.25, 0.15, 1.25]}
                position={[0, -0.90, 0]}
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


    // const { position, rotation, scale } = useControls('Positioning ', {
    //     // position={[-2.5, -0.6, 3]}
    //     position:
    //     {
    //         value: {x: -2.5, y: 1, z: 3},
    //         step: 0.1
    //     },
    //     rotation:
    //     {
    //         value: 0.25,
    //         step: 0.01
    //     },
    //     scale:
    //     {
    //         value: 0.25,
    //         step: 0.01,
    //     }
    // })