import { MapControls, PerspectiveCamera, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Moon from "./Moon";
import Ocean from "./Ocean";
import Island from "./Island";

/**
 * Scene Component
 * 
 * This component sets up the 3D scene using React Three Fiber.
 * It includes a perspective camera, ambient and directional lights, map controls, stars, and the Moon, Island, and Ocean components.
 * 
 * @returns {JSX.Element} The rendered scene.
 */
const Scene = () => {
  return (
    <>
      <Canvas>
        {/* Set up the perspective camera with a default position */}
        <PerspectiveCamera makeDefault position={[0, 2, 125]} />
        
        {/* Add ambient light to the scene */}
        <ambientLight intensity={0.5} />
        
        {/* Add directional light to the scene */}
        <directionalLight position={[10, 10, 10]} intensity={1} />
        
        {/* Enable map controls for user interaction */}
        <MapControls />
        
        {/* Add stars to the scene */}
        <Stars count={1000} />
        
        {/* Add the Moon, Island, and Ocean components to the scene */}
        <Moon />
        <Island />
        <Ocean />
      </Canvas>
    </>
  );
};

export default Scene;
