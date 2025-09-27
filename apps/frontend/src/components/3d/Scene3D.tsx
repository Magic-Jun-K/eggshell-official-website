import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

import Badge3DNoFont from './Badge3DNoFont';

interface Scene3DProps {
  onBadgeHover?: (hovered: boolean) => void;
}

export const Scene3D = ({ onBadgeHover }: Scene3DProps) => {
  return (
    <div className="w-full h-screen fixed top-0 left-0 -z-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8a2be2" />

        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        <Badge3DNoFont onHover={onBadgeHover} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI - Math.PI / 4}
        />
      </Canvas>
    </div>
  );
};
