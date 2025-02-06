import { useProgress, Html } from "@react-three/drei";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
    const { active, progress, errors, item, loaded, total } = useProgress();
    
    const [loadingProgress, setLoadingProgress] = useState(0);

    useEffect(() => {
        setLoadingProgress(progress);
    }, [progress]);

    return (
        <Html center>{loadingProgress} % loaded</Html>
    );
}