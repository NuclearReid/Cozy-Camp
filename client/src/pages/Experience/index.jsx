// I have this as a page to make it less cluttered to work with for checking if logged in, sending props etc
import { Loader } from "@react-three/drei";
import Experience from "../../scene/Experience";
import { Canvas} from '@react-three/fiber'


export default function Scene() {

    return(
        <>
            <Canvas
                camera={{
                    fov: 45,
                    near: 0.1,
                    far: 200,
                    position: [-3.9, 10.2, 11.9],
                }}
            >
                <Experience />
            </Canvas>
            <Loader />
        </>
    )
}