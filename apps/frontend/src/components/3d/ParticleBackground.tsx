import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ParticleBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create multiple particle layers for depth
    const createParticleLayer = (count: number, size: number, color: number, range: number) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const velocities = new Float32Array(count * 3);

      for (let i = 0; i < count * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * range;
        positions[i + 1] = (Math.random() - 0.5) * range;
        positions[i + 2] = (Math.random() - 0.5) * range;

        velocities[i] = (Math.random() - 0.5) * 0.02;
        velocities[i + 1] = (Math.random() - 0.5) * 0.02;
        velocities[i + 2] = (Math.random() - 0.5) * 0.02;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

      const material = new THREE.PointsMaterial({
        size,
        color,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending
      });

      return new THREE.Points(geometry, material);
    };

    // Create particle layers with different depths and colors
    const particles1 = createParticleLayer(1500, 0.008, 0x4a00e0, 150); // Purple
    const particles2 = createParticleLayer(1000, 0.006, 0x00f2fe, 120); // Blue
    const particles3 = createParticleLayer(800, 0.004, 0xe0e0ff, 100); // Light purple

    scene.add(particles1, particles2, particles3);

    camera.position.z = 8;

    // Store refs
    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Mouse move handler with smooth interpolation
    const handleMouseMove = (event: MouseEvent) => {
      const targetX = (event.clientX / window.innerWidth) * 2 - 1;
      const targetY = -(event.clientY / window.innerHeight) * 2 + 1;

      // Smooth mouse movement
      mouseRef.current.x += (targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (targetY - mouseRef.current.y) * 0.05;
    };

    // Animation loop with dynamic particle movement
    const animate = () => {
      requestAnimationFrame(animate);
      timeRef.current += 0.01;

      // Animate each particle layer
      [particles1, particles2, particles3].forEach((particles, index) => {
        if (particles) {
          const positions = particles.geometry.attributes.position.array as Float32Array;
          const velocities = particles.geometry.attributes.velocity.array as Float32Array;

          // Update particle positions based on velocities and mouse interaction
          for (let i = 0; i < positions.length; i += 3) {
            // Base movement
            positions[i] += velocities[i] + Math.sin(timeRef.current + i) * 0.001;
            positions[i + 1] += velocities[i + 1] + Math.cos(timeRef.current + i) * 0.001;
            positions[i + 2] += velocities[i + 2];

            // Mouse interaction - particles are attracted to mouse
            const mouseInfluence = 0.02 * (index + 1);
            positions[i] += mouseRef.current.x * mouseInfluence;
            positions[i + 1] += mouseRef.current.y * mouseInfluence;

            // Boundary wrapping
            if (Math.abs(positions[i]) > 75) velocities[i] *= -1;
            if (Math.abs(positions[i + 1]) > 75) velocities[i + 1] *= -1;
            if (Math.abs(positions[i + 2]) > 75) velocities[i + 2] *= -1;
          }

          particles.geometry.attributes.position.needsUpdate = true;

          // Gentle rotation with mouse influence
          particles.rotation.x += 0.0005 + mouseRef.current.y * 0.001;
          particles.rotation.y += 0.001 + mouseRef.current.x * 0.001;
          particles.rotation.z += 0.0003;
        }
      });

      // Camera movement based on mouse
      camera.position.x += (mouseRef.current.x * 2 - camera.position.x) * 0.02;
      camera.position.y += (mouseRef.current.y * 2 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 -z-10 pointer-events-none" />;
};
