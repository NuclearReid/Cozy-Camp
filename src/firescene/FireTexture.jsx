export default function FireTexture()
{

    return(
        <mesh
            position={[-2.5, -0.9, 1.8]}
            scale={0.35}
        >
            <sphereGeometry/>
            <meshStandardMaterial color='yelloworange' />
        </mesh>
    )
}