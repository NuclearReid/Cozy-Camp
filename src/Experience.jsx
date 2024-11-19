import { Environment, OrbitControls, Sky, Stage } from '@react-three/drei'
import FireScene from './firescene/FireScene'
import { Perf } from 'r3f-perf'
import Lighting from './environement/Lighting'
import StartPannel from './startScreen/StartPannel'

export default function Experience()
{

    return <>
        
        <Perf position='top-left' />
        <Lighting />
        <OrbitControls makeDefault /> 
        <StartPannel />
        <FireScene />

        
    </>
}