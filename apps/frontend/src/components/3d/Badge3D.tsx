import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface Badge3DProps {
  position?: [number, number, number];
  onHover?: (hovered: boolean) => void;
  useSimpleMode?: boolean; // 添加简单模式选项，避免字体问题
}

const techIcons = [
  { name: 'HTML', color: '#e34c26', position: [3, 1, 0] as [number, number, number] },
  { name: 'CSS', color: '#1572b6', position: [-3, 1, 0] as [number, number, number] },
  {
    name: 'JS',
    color: '#f7df1e',
    position: [0, 3, 0] as [number, number, number],
    textColor: '#333'
  },
  { name: 'TS', color: '#3178c6', position: [0, -3, 0] as [number, number, number] },
  {
    name: 'React',
    color: '#61dafb',
    position: [2.5, -2, 1] as [number, number, number],
    textColor: '#333'
  },
  { name: 'Node', color: '#339933', position: [-2.5, -2, 1] as [number, number, number] }
];

export const Badge3D = ({ position = [0, 0, 0], onHover, useSimpleMode = false }: Badge3DProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<THREE.Group>(null);
  const techIconsRef = useRef<THREE.Group[]>([]);
  const [hovered, setHovered] = useState(false);
  const [fontError, setFontError] = useState(false);

  // 简单模式：使用几何形状代替文本，避免字体问题
  if (useSimpleMode) {
    return (
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
        <group position={position}>
          {/* Main badge */}
          <mesh
            ref={meshRef}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
          >
            <torusGeometry args={[2, 0.3, 32, 100]} />
            <meshStandardMaterial
              color={hovered ? '#8a2be2' : '#4a00e0'}
              emissive={hovered ? '#6a2be2' : '#2a0080'}
              emissiveIntensity={hovered ? 0.5 : 0.3}
              metalness={0.9}
              roughness={0.1}
              transparent
              opacity={0.95}
            />
          </mesh>

          {/* Inner glow ring */}
          <mesh>
            <torusGeometry args={[1.8, 0.1, 16, 64]} />
            <meshStandardMaterial
              color="#00f2fe"
              emissive="#00f2fe"
              emissiveIntensity={0.8}
              transparent
              opacity={hovered ? 0.8 : 0.4}
            />
          </mesh>

          {/* Simple shapes instead of text */}
          <group ref={textRef}>
            <mesh position={[0, 0.2, 0.5]}>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshStandardMaterial color="white" />
            </mesh>
            <mesh position={[0, -0.6, 0.5]}>
              <boxGeometry args={[0.6, 0.1, 0.05]} />
              <meshStandardMaterial color="#00f2fe" />
            </mesh>
          </group>

          {/* Tech icons - simple shapes */}
          {techIcons.map((tech, index) => (
            <group
              key={tech.name}
              ref={el => {
                if (el) techIconsRef.current[index] = el;
              }}
              scale={hovered ? [1, 1, 1] : [0, 0, 0]}
            >
              <Float speed={2 + index * 0.3} rotationIntensity={0.8} floatIntensity={0.6}>
                <Sphere args={[0.25, 16, 16]} position={tech.position}>
                  <meshStandardMaterial
                    color={tech.color}
                    emissive={tech.color}
                    emissiveIntensity={0.3}
                    metalness={0.7}
                    roughness={0.3}
                    transparent
                    opacity={0.9}
                  />
                </Sphere>
                <mesh position={[tech.position[0], tech.position[1], tech.position[2] + 0.4]}>
                  <cylinderGeometry args={[0.03, 0.03, 0.1, 6]} />
                  <meshStandardMaterial color={tech.textColor || 'white'} />
                </mesh>
                <mesh position={tech.position}>
                  <torusGeometry args={[0.35, 0.02, 8, 32]} />
                  <meshStandardMaterial
                    color={tech.color}
                    emissive={tech.color}
                    emissiveIntensity={0.5}
                    transparent
                    opacity={0.6}
                  />
                </mesh>
              </Float>
            </group>
          ))}
        </group>
      </Float>
    );
  }

  // Use Google Fonts as fallback if local fonts fail
  const getFontUrl = () => {
    if (fontError) {
      // Use a simple system font fallback instead of external URL
      return undefined; // This will use the default system font
    }
    return '/fonts/inter-bold.woff2';
  };

  const getMediumFontUrl = () => {
    if (fontError) {
      // Use a simple system font fallback instead of external URL
      return undefined; // This will use the default system font
    }
    return '/fonts/inter-medium.woff2';
  };

  useEffect(() => {
    onHover?.(hovered);

    // GSAP animation for badge hover
    if (hovered) {
      gsap.to(meshRef.current?.scale || { x: 1, y: 1, z: 1 }, {
        x: 1.3,
        y: 1.3,
        z: 1.3,
        duration: 0.3,
        ease: 'power2.out'
      });

      // Animate tech icons appearing
      techIconsRef.current.forEach((icon, index) => {
        if (icon) {
          gsap.fromTo(
            icon.scale,
            { x: 0, y: 0, z: 0 },
            {
              x: 1,
              y: 1,
              z: 1,
              duration: 0.5,
              delay: index * 0.1,
              ease: 'back.out(1.7)'
            }
          );

          gsap.fromTo(
            icon.rotation,
            { x: Math.PI * 2, y: Math.PI * 2, z: Math.PI * 2 },
            {
              x: 0,
              y: 0,
              z: 0,
              duration: 0.8,
              delay: index * 0.1,
              ease: 'power2.out'
            }
          );
        }
      });
    } else {
      gsap.to(meshRef.current?.scale || { x: 1, y: 1, z: 1 }, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.3,
        ease: 'power2.out'
      });

      // Hide tech icons
      techIconsRef.current.forEach(icon => {
        if (icon) {
          gsap.to(icon.scale, {
            x: 0,
            y: 0,
            z: 0,
            duration: 0.2,
            ease: 'power2.in'
          });
        }
      });
    }
  }, [hovered, onHover]);

  useFrame(state => {
    if (meshRef.current) {
      // Enhanced rotation with floating effect
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.6;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }

    // Animate tech icons orbiting
    if (hovered) {
      techIconsRef.current.forEach((icon, index) => {
        if (icon) {
          const angle = state.clock.elapsedTime * (0.5 + index * 0.1);
          const originalPos = techIcons[index].position;

          icon.position.x = originalPos[0] + Math.cos(angle) * 0.5;
          icon.position.y = originalPos[1] + Math.sin(angle) * 0.5;
          icon.position.z = originalPos[2] + Math.sin(angle * 1.5) * 0.3;

          icon.rotation.x = angle * 0.5;
          icon.rotation.y = angle * 0.7;
          icon.rotation.z = angle * 0.3;
        }
      });
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
      <group position={position}>
        {/* Main badge with enhanced material */}
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <torusGeometry args={[2, 0.3, 32, 100]} />
          <meshStandardMaterial
            color={hovered ? '#8a2be2' : '#4a00e0'}
            emissive={hovered ? '#6a2be2' : '#2a0080'}
            emissiveIntensity={hovered ? 0.5 : 0.3}
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.95}
          />
        </mesh>

        {/* Inner glow ring */}
        <mesh>
          <torusGeometry args={[1.8, 0.1, 16, 64]} />
          <meshStandardMaterial
            color="#00f2fe"
            emissive="#00f2fe"
            emissiveIntensity={0.8}
            transparent
            opacity={hovered ? 0.8 : 0.4}
          />
        </mesh>

        {/* Enhanced center text with glow effect */}
        <group ref={textRef}>
          <Text
            position={[0, 0.2, 0.5]}
            fontSize={0.4}
            color="white"
            anchorX="center"
            anchorY="middle"
            font={getFontUrl()}
            onSync={state => {
              if (state === 'error') {
                setFontError(true);
              }
            }}
            material-toneMapped={false}
            maxWidth={10}
            textAlign="center"
            whiteSpace="nowrap"
            overflowWrap="break-word"
            letterSpacing={0.02}
          >
            FULL-STACK
            <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.2} />
          </Text>

          <Text
            position={[0, -0.6, 0.5]}
            fontSize={0.25}
            color="#00f2fe"
            anchorX="center"
            anchorY="middle"
            font={getMediumFontUrl()}
            onSync={state => {
              if (state === 'error') {
                setFontError(true);
              }
            }}
            material-toneMapped={false}
            maxWidth={10}
            textAlign="center"
            whiteSpace="nowrap"
            overflowWrap="break-word"
            letterSpacing={0.02}
          >
            DEVELOPER
            <meshStandardMaterial color="#00f2fe" emissive="#00f2fe" emissiveIntensity={0.3} />
          </Text>
        </group>

        {/* Enhanced floating tech icons with better visuals */}
        {techIcons.map((tech, index) => (
          <group
            key={tech.name}
            ref={el => {
              if (el) techIconsRef.current[index] = el;
            }}
            scale={[0, 0, 0]}
          >
            <Float speed={2 + index * 0.3} rotationIntensity={0.8} floatIntensity={0.6}>
              <Sphere args={[0.25, 32, 32]} position={tech.position}>
                <meshStandardMaterial
                  color={tech.color}
                  emissive={tech.color}
                  emissiveIntensity={0.3}
                  metalness={0.7}
                  roughness={0.3}
                  transparent
                  opacity={0.9}
                />
              </Sphere>

              <Text
                position={[tech.position[0], tech.position[1], tech.position[2] + 0.4]}
                fontSize={0.15}
                color={tech.textColor || 'white'}
                anchorX="center"
                anchorY="middle"
                font={getFontUrl()}
                onSync={state => {
                  if (state === 'error') {
                    setFontError(true);
                  }
                }}
                maxWidth={5}
                textAlign="center"
                whiteSpace="nowrap"
                overflowWrap="break-word"
                letterSpacing={0.01}
              >
                {tech.name}
              </Text>

              {/* Glow ring around tech icons */}
              <mesh position={tech.position}>
                <torusGeometry args={[0.35, 0.02, 8, 32]} />
                <meshStandardMaterial
                  color={tech.color}
                  emissive={tech.color}
                  emissiveIntensity={0.5}
                  transparent
                  opacity={0.6}
                />
              </mesh>
            </Float>
          </group>
        ))}
      </group>
    </Float>
  );
};
