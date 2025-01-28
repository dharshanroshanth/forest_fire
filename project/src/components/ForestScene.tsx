import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Forest } from './Forest';

export const ForestScene = ({ riskLevel }: { riskLevel: number }) => {
  return (
    <div className="w-full h-[400px]">
      <Canvas camera={{ position: [0, 5, 10] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Forest riskLevel={riskLevel} />
        <Environment preset="sunset" />
        <OrbitControls />
      </Canvas>
    </div>
  );
};