// I have this as a page to make it less cluttered to work with for checking if logged in, sending props etc
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";

import Experience from "../../scene/Experience";
import { Canvas} from '@react-three/fiber'
import { Suspense } from "react";
import LoadingScreen from '../../components/LoadingScreen'




export default function Scene() {
    
    // I'm sending this data down the line to each component that uses the user info in the 3D scene 
    // I'd rather make the one query here and pass that data rather than a new query in each component
    const {loading, data } = useQuery(QUERY_ME)

    return(
        <div className="removeOverflow">
            <Canvas
                camera={{
                    fov: 45,
                    near: 0.1,
                    far: 200,
                    position: [-3.9, 10.2, 11.9],
                }}
            >
                <Suspense fallback={<LoadingScreen/>}>
                    <Experience 
                        loading={loading}
                        data = {data}
                    />
                </Suspense>
                
            </Canvas>
            {/* <Loader /> */}
        </div>
    )
}