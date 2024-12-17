import { useRef } from "react";

export default function Grass()
{
    const points = useRef()

    return(
        <points
            ref={points}
            rotation-x={Math.PI * 0.5}
            position-y={-0.9}
        >
            <planeGeometry args={[15, 15, 32, 32]} />
            <pointsMaterial color="red" size={0.3} sizeAttenuation />
        </points>
    )
}
