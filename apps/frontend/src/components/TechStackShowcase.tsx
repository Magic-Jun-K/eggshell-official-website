import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TechStack {
  name: string;
  icon: string;
  description: string;
  color: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'build' | 'infrastructure';
  details: string;
  level: number; // Proficiency level 1-10
}

const techStacks: TechStack[] = [
  // Frontend Technologies
  {
    name: 'React',
    icon: '⚛️',
    description: 'Modern UI library for building interactive interfaces',
    details:
      'Component-based architecture with hooks, context, and advanced patterns for scalable applications',
    color: '#61dafb',
    category: 'frontend',
    level: 9
  },
  {
    name: 'TypeScript',
    icon: '📘',
    description: 'Type-safe JavaScript for scalable applications',
    details:
      'Advanced type system, generics, decorators, and strict mode for enterprise-grade development',
    color: '#3178c6',
    category: 'frontend',
    level: 8
  },
  {
    name: 'Three.js',
    icon: '🎲',
    description: '3D graphics library for web browsers',
    details: 'WebGL-based 3D rendering, shaders, animations, and interactive experiences',
    color: '#049ef4',
    category: 'frontend',
    level: 7
  },
  {
    name: 'Tailwind CSS',
    icon: '🎨',
    description: 'Utility-first CSS framework for rapid UI development',
    details: 'Responsive design, custom animations, dark mode, and design system integration',
    color: '#06b6d4',
    category: 'frontend',
    level: 8
  },
  {
    name: 'Framer Motion',
    icon: '🎭',
    description: 'Animation library for React',
    details: 'Advanced animations, gestures, scroll-based animations, and physics-based motion',
    color: '#f5a623',
    category: 'frontend',
    level: 8
  },

  // Backend Technologies
  {
    name: 'Node.js',
    icon: '🟢',
    description: 'JavaScript runtime for server-side development',
    details: 'Event-driven architecture, streams, clustering, and performance optimization',
    color: '#339933',
    category: 'backend',
    level: 8
  },
  {
    name: 'NestJS',
    icon: '🪺',
    description: 'Progressive Node.js framework for building efficient server-side apps',
    details: 'Modular architecture, dependency injection, microservices, and enterprise patterns',
    color: '#ea2845',
    category: 'backend',
    level: 8
  },
  {
    name: 'Express.js',
    icon: '🚂',
    description: 'Fast, unopinionated web framework for Node.js',
    details: 'Middleware, routing, error handling, and RESTful API development',
    color: '#404d59',
    category: 'backend',
    level: 9
  },

  // Database Technologies
  {
    name: 'PostgreSQL',
    icon: '🐘',
    description: 'Advanced open-source relational database',
    details: 'Complex queries, indexing, transactions, and performance optimization',
    color: '#336791',
    category: 'database',
    level: 7
  },
  {
    name: 'Redis',
    icon: '🔴',
    description: 'In-memory data structure store for caching and real-time apps',
    details: 'Pub/sub, caching strategies, session management, and real-time features',
    color: '#dc382d',
    category: 'database',
    level: 7
  },
  {
    name: 'MongoDB',
    icon: '🍃',
    description: 'NoSQL document database for flexible data models',
    details: 'Document modeling, aggregation pipelines, and horizontal scaling',
    color: '#47a248',
    category: 'database',
    level: 6
  },

  // Build & Development Tools
  {
    name: 'Webpack',
    icon: '📦',
    description: 'Module bundler for modern JavaScript applications',
    details: 'Code splitting, lazy loading, optimization, and custom plugin development',
    color: '#8dd6f9',
    category: 'build',
    level: 7
  },
  {
    name: 'Vite',
    icon: '⚡',
    description: 'Next-generation frontend tooling',
    details: 'Lightning-fast HMR, optimized builds, and plugin ecosystem',
    color: '#646cff',
    category: 'build',
    level: 8
  },
  {
    name: 'Docker',
    icon: '🐳',
    description: 'Container platform for deploying applications',
    details: 'Containerization, orchestration, multi-stage builds, and CI/CD integration',
    color: '#2496ed',
    category: 'build',
    level: 7
  },

  // Infrastructure & DevOps
  {
    name: 'Kubernetes',
    icon: '☸️',
    description: 'Container orchestration for automating deployment',
    details: 'Pod management, service discovery, scaling, and rolling updates',
    color: '#326ce5',
    category: 'infrastructure',
    level: 6
  },
  {
    name: 'AWS',
    icon: '☁️',
    description: 'Cloud computing services and infrastructure',
    details: 'EC2, S3, Lambda, CloudFormation, and serverless architectures',
    color: '#ff9900',
    category: 'infrastructure',
    level: 7
  },
  {
    name: 'Nginx',
    icon: '🌐',
    description: 'High-performance web server and reverse proxy',
    details: 'Load balancing, SSL termination, caching, and configuration optimization',
    color: '#009639',
    category: 'infrastructure',
    level: 6
  }
];

const categories = [
  { id: 'all', name: 'All', icon: '🚀' },
  { id: 'frontend', name: 'Frontend', icon: '🎨' },
  { id: 'backend', name: 'Backend', icon: '⚙️' },
  { id: 'database', name: 'Database', icon: '🗄️' },
  { id: 'build', name: 'Build Tools', icon: '🔧' },
  { id: 'infrastructure', name: 'Infrastructure', icon: '🏗️' }
];

export const TechStackShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const filteredStacks =
    selectedCategory === 'all'
      ? techStacks
      : techStacks.filter(stack => stack.category === selectedCategory);

  return (
    <section id="tech-stack" className="py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="section-title text-4xl md:text-5xl mb-4"
        >
          Technology Mastery
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-300 text-lg mb-12 max-w-3xl mx-auto"
        >
          Comprehensive expertise across the full technology stack, from frontend interactions to
          backend infrastructure
        </motion.p>

        {/* Enhanced Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-3 bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-3">
            {categories.map(category => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg transition-all duration-300 capitalize flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/25'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Enhanced Tech Grid */}
        <motion.div
          key={selectedCategory}
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredStacks.map((tech, index) => (
              <motion.div
                key={tech.name}
                layoutId={tech.name}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.5,
                  type: 'spring',
                  stiffness: 100
                }}
                whileHover={{
                  scale: 1.08,
                  y: -8,
                  transition: { duration: 0.2 }
                }}
                onHoverStart={() => setHoveredTech(tech.name)}
                onHoverEnd={() => setHoveredTech(null)}
                className="tech-card glow-effect group cursor-pointer relative overflow-hidden"
              >
                {/* Background gradient effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${tech.color}15, transparent)`
                  }}
                />

                {/* Glow border */}
                <motion.div
                  className="absolute inset-0 rounded-lg"
                  style={{
                    border: `1px solid ${tech.color}40`,
                    opacity: hoveredTech === tech.name ? 1 : 0
                  }}
                  transition={{ duration: 0.2 }}
                />

                <div className="relative z-10 flex flex-col items-center text-center p-6">
                  {/* Enhanced icon with glow */}
                  <motion.div
                    className="text-5xl mb-4 p-4 rounded-2xl bg-gray-800/30 backdrop-blur-sm"
                    style={{ color: tech.color }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {tech.icon}
                  </motion.div>

                  <h3 className="text-xl font-bold text-white mb-3">{tech.name}</h3>

                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{tech.description}</p>

                  {/* Proficiency level indicator */}
                  {/* <div className="w-full mb-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Proficiency</span>
                      <span>{tech.level}/10</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="h-2 rounded-full"
                        style={{ backgroundColor: tech.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${tech.level * 10}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </div> */}

                  {/* Detailed description on hover */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: hoveredTech === tech.name ? 1 : 0,
                      height: hoveredTech === tech.name ? 'auto' : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-xs text-gray-400 leading-relaxed"
                  >
                    {tech.details}
                  </motion.div>

                  <div className="mt-4 px-3 py-1 bg-gray-900/50 rounded-full text-xs text-gray-300 capitalize border border-gray-700">
                    {tech.category}
                  </div>
                </div>

                {/* Floating particles effect */}
                {hoveredTech === tech.name && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 pointer-events-none"
                  >
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full"
                        style={{ backgroundColor: tech.color }}
                        initial={{
                          x: Math.random() * 100 + '%',
                          y: Math.random() * 100 + '%',
                          scale: 0
                        }}
                        animate={{
                          x: Math.random() * 100 + '%',
                          y: Math.random() * 100 + '%',
                          scale: [0, 1, 0]
                        }}
                        transition={{
                          duration: 2 + Math.random() * 2,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Technology statistics */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">
              {techStacks.filter(t => t.category === 'frontend').length}
            </div>
            <div className="text-sm text-gray-400">Frontend Tech</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {techStacks.filter(t => t.category === 'backend').length}
            </div>
            <div className="text-sm text-gray-400">Backend Tech</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {techStacks.filter(t => t.category === 'database').length}
            </div>
            <div className="text-sm text-gray-400">Database Tech</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">
              {techStacks.filter(t => ['build', 'infrastructure'].includes(t.category)).length}
            </div>
            <div className="text-sm text-gray-400">DevOps Tech</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
