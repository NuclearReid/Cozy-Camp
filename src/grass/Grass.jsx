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
        const dummy = new THREE.Object3D()
        const radius = 0.5 * Math.PI * 5
        const segments = 2000

        for(let i =0; i < instanceNumber; i ++)
        {
            const angle = Math.random() * Math.PI * 2
            const r = Math.sqrt(Math.random()) * radius
            const x = Math.cos(angle) * r
            const z = Math.sin(angle) * r

            dummy.position.set(x, 0, z)
            dummy.scale.setScalar(0.5 + Math.random() * 0.5)
            dummy.rotation.y = Math.random() * Math.PI
            dummy.updateMatrix()
            meshRef.current.setMatrixAt(i, dummy.matrix)
        }

        meshRef.current.instanceMatrix.needsUpdate = true
    }, [ instanceNumber] )

    useFrame((state, delta) =>
    {
        materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime()
    })

    // const { radius, segments, thetaStart, thetaLength} = useControls('grass Circle',{
    //     radius:
    //     {
    //         value: 5,
    //         step: 1,
    //         min: 0
    //     },
    //     segments:
    //     {
    //         value: 32,
    //         step: 1,
    //         min: 0
    //     },
    //     thetaStart:
    //     {
    //         value: 0,
    //         step: 0.01,
    //         min: 0,
    //         max: Math.PI * 2
    //     },
    //     thetaLength:
    //     {
    //         value: Math.PI * 2,
    //         step: 0.01,
    //         min: 0,
    //         max: Math.PI * 2
    //     }
    // })

    // const { width, height, widthSegments, heightSegments} = useControls('grass square',{
    //     width:
    //     {
    //         value: 0.1,
    //         step: 1,
    //         min: 0
    //     },
    //     height:
    //     {
    //         value: 1,
    //         step: 1,
    //         min: 0
    //     },
    //     widthSegments:
    //     {
    //         value: 1,
    //         step: 1,
    //         min: 0,
    //     },
    //     heightSegments:
    //     {
    //         value: 4,
    //         step: 1,
    //         min: 0,
    //     }
    // })


    // To make the grass a circle
    // const geometry = new THREE.CircleGeometry(radius, segments, thetaStart, thetaLength)
    // geometry.translate(0, 0.15, 0) // Adjust the position of the circle

    // To make the grass a plane
    const geometry = new THREE.PlaneGeometry(0.1, 1, 1, 4)

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
