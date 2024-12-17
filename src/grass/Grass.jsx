import { Points, PointMaterial } from "@react-three/drei";
import { useRef } from "react";



export default function Grass()
{
    const points = useRef()


    return(
        <>
           <Points
            ref={points}
           >
            <planeGeometry args={[10, 10]} />
            <pointsMaterial color="green" size={0.5} sizeAttenuation />

           </Points>
        </>
    )
}
