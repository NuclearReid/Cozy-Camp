import { useFrame } from '@react-three/fiber'
import { Environment, OrbitControls, Stage } from '@react-three/drei'
import FireScene from './firescene/FireScene'
import { Leva } from 'leva'
import { Perf } from 'r3f-perf'

export default function Experience()
{

    return <>
        
        {/* <color args={['#bdedfc']} attach='background' />     */}
        <Perf position='top-left' />

        {/* <OrbitControls makeDefault /> */}
        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1.5 } />

        {/* <Environment
            background
            // path='./background/rogland_clear_night_2k.hdr'
            preset='night'
        > */}
            <color args={['#bdedfc']} attach='background' />
            <FireScene />
        {/* </Environment> */}

        
    </>
}