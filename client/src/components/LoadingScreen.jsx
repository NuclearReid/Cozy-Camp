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




// Make it so the OpenWeather API call is only performed with loading a scene. 
// essentially, make another query one for the scene and one for the profile
// make it so there is loading text when the open weather api is being called