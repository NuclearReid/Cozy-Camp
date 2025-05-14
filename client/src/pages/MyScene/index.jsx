import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { Loader, useProgress } from "@react-three/drei";
import Experience from "../../scene/Experience";
import { Canvas } from '@react-three/fiber'
import { Suspense, useState, useEffect } from "react";

export default function Scene() {
    // Get GraphQL loading state
    const { loading: queryLoading, data } = useQuery(QUERY_ME);
    
    // Get 3D assets loading progress
    const { active: modelLoading } = useProgress();
    
    // Combine both loading states
    const isLoading = queryLoading || modelLoading;
    
    // Optional: Create a custom message based on what's loading
    const [loadingMessage, setLoadingMessage] = useState("Loading...");
    
    useEffect(() => {
        if (queryLoading) {
            setLoadingMessage("Fetching your campsite data...");
        } else if (modelLoading) {
            setLoadingMessage("Building your 3D environment...");
        } else {
            setLoadingMessage("Loading complete!");
        }
    }, [queryLoading, modelLoading]);

    return(
        <div className="removeOverflow">
            {/* Only show the Canvas when we have data */}
            {(!queryLoading || data) && (
                <Canvas
                    camera={{
                        fov: 45,
                        near: 0.1,
                        far: 200,
                        position: [-3.9, 10.2, 11.9],
                    }}
                >
                    <Suspense fallback={null}>
                        <Experience 
                            loading={queryLoading}
                            data={data}
                        />
                    </Suspense>
                </Canvas>
            )}
            
            {/* Show custom loading screen */}
            <Loader 
                containerStyles={{ 
                    background: 'rgba(37, 44, 31, 0.9)',
                    // Keep loader visible when query is loading
                    display: isLoading ? 'flex' : 'none' 
                }}
                innerStyles={{ background: '#3c533e' }}
                barStyles={{ background: '#96c283' }}
                dataStyles={{ color: '#ffffff', fontSize: '16px' }}
                dataInterpolation={(p) => 
                    queryLoading ? loadingMessage : `${loadingMessage} (${p.toFixed(0)}%)`
                }
                // Force active state based on combined loading
                initialState={(active) => isLoading}
            />
        </div>
    )
}