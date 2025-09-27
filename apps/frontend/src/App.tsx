import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@eggshell/ui';

import { Navigation } from './components/Navigation';
import { Scene3D } from './components/3d/Scene3D';
import { TechStackShowcase } from './components/TechStackShowcase';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { ParticleBackground } from './components/3d/ParticleBackground';
import { DataVisualization } from './components/DataVisualization';
import { EngineeringShowcase } from './components/EngineeringShowcase';
import { InfrastructureShowcase } from './components/InfrastructureShowcase';

import './App.css';

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '500%']);

  useEffect(() => {
    let animationFrameId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      // Use requestAnimationFrame to throttle updates
      if (animationFrameId) return;

      animationFrameId = requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 20,
          y: (e.clientY / window.innerHeight - 0.5) * 20
        });
        animationFrameId = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-hidden"
      style={{ background: 'linear-gradient(to bottom right, #0a0a0a, #1a0a2e, #0a0a0a)' }}
    >
      <ParticleBackground />
      <Navigation />

      {/* Hero Section with enhanced 3D effects */}
      <section
        id="home"
        className="relative z-10 min-h-screen flex items-center justify-center px-4 overflow-hidden"
      >
        <motion.div className="text-center max-w-6xl mx-auto" style={{ y: textY }}>
          {/* Main title with 3D parallax effect */}
          <motion.div
            className="mb-8"
            animate={{
              x: mousePosition.x,
              y: mousePosition.y
            }}
            transition={{ duration: 0.1, ease: 'easeOut' }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 1.2,
                ease: [0.23, 1, 0.32, 1],
                scale: { duration: 1.5 }
              }}
              className="text-7xl md:text-9xl font-bold mb-4"
            >
              <motion.span
                className="gradient-text"
                animate={{
                  textShadow: [
                    '0 0 20px rgba(168, 85, 247, 0.5), 0 0 40px rgba(168, 85, 247, 0.3)',
                    '0 0 30px rgba(59, 130, 246, 0.6), 0 0 60px rgba(59, 130, 246, 0.4)',
                    '0 0 20px rgba(168, 85, 247, 0.5), 0 0 40px rgba(168, 85, 247, 0.3)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                Full-Stack
              </motion.span>
              <br />
              <motion.span
                className="text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                Developer
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Enhanced subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-xl md:text-3xl text-gray-300 mb-12 leading-relaxed font-light"
          >
            <motion.span
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Building modern web applications with cutting-edge technologies
            </motion.span>
          </motion.p>

          {/* Enhanced CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex gap-6 justify-center flex-wrap"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() =>
                document.querySelector('#tech-stack')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="shadow-2xl"
            >
              Explore Tech Stack
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() =>
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              View Projects
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-purple-400 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* 3D Badge overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <Scene3D />
        </div>
      </section>

      {/* Tech Stack Section */}
      <TechStackShowcase />

      {/* Engineering & Build Tools Section */}
      <EngineeringShowcase />

      {/* Infrastructure Architecture Section */}
      <InfrastructureShowcase />

      {/* Data Visualization Section */}
      <section id="data-viz">
        <DataVisualization />
      </section>

      {/* Projects Section */}
      <ProjectsShowcase />

      {/* Enhanced Footer */}
      <footer
        id="contact"
        className="relative z-10 bg-gray-900/80 backdrop-blur-md border-t border-gray-700/50 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-4 gradient-text"
          >
            Let's Build Something Amazing Together
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 mb-8 text-lg"
          >
            Ready to bring your ideas to life with modern web technologies
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-6 mb-8"
          >
            <motion.a
              href="mailto:contact@eggshell.dev"
              className="text-purple-400 hover:text-purple-300 transition-colors text-lg"
              whileHover={{ scale: 1.1 }}
            >
              📧 Email
            </motion.a>
            <motion.a
              href="#"
              className="text-purple-400 hover:text-purple-300 transition-colors text-lg"
              whileHover={{ scale: 1.1 }}
            >
              🐙 GitHub
            </motion.a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-500"
          >
            © 2025 Eggshell
          </motion.p>
        </div>
      </footer>
    </div>
  );
}
export default App;
