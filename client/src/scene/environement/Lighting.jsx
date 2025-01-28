import { Environment, OrbitControls, Sky, Stage } from '@react-three/drei'

export default function Lighting()
{
    






    return(
        <>
            <directionalLight position={ [ 1, 0.25, 3 ] } intensity={ 1.5 } />

            <ambientLight intensity={ 0.75 } />

            <Sky 
                sunPosition={[100, -20, 100]}
            />
        </>
    )
}