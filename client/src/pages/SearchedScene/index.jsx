import useStore from "../../stores/useStore";
import { Loader } from "@react-three/drei";
import Experience from "../../scene/Experience";
import { Canvas } from "@react-three/fiber";

export default function SearchedScene() {
  const searchedUser = useStore((state) => state.searchedUser)

  return (
    <>
      <h1>{searchedUser.username}'s Camp</h1>
      {searchedUser ? (
        <div className="removeOverflow"> 
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
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </>
  );
}

        // Just a quick reference to see the searched user's data
        // <>
        //   <h2>{searchedUser.username}'s Scene</h2>
        //   <p>ID: {searchedUser._id}</p>
        //   <p>Email: {searchedUser.email}</p>
        //   <p>Shelter: {searchedUser.shelter}</p>
        // </>