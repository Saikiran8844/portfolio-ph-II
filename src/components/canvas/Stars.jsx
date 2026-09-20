import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { useTheme } from "../../context/ThemeContext";

const ChakraStars = (props) => {
  const ref = useRef();
  const { isKurama } = useTheme();
  // 5400 dual-sphere chakra particles
  const [sphere] = useState(() => random.inSphere(new Float32Array(5400), { radius: 1.2 }));

  useFrame((state, delta) => {
    if (ref.current) {
      if (isKurama) {
        // Kurama: rapid fiery swirling embers
        ref.current.rotation.x -= delta / 8;
        ref.current.rotation.y -= delta / 10;
      } else {
        // Naruto Sage Mode: peaceful, serene nature energy drift
        ref.current.rotation.x -= delta / 22;
        ref.current.rotation.y -= delta / 28;
      }
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color={isKurama ? "#ff2a00" : "#f59e0b"}
          size={isKurama ? 0.0032 : 0.0022}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className="w-full h-auto absolute inset-0 z-[-1] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <ChakraStars />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
