import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BuildTool {
  name: string;
  icon: string;
  description: string;
  color: string;
  category: 'bundler' | 'linter' | 'test' | 'ci';
  position: number;
}

const buildTools: BuildTool[] = [
  {
    name: 'Vite',
    icon: '⚡',
    description: 'Lightning-fast build tool with HMR',
    color: '#646cff',
    category: 'bundler',
    position: 1
  },
  {
    name: 'Webpack',
    icon: '📦',
    description: 'Powerful module bundler',
    color: '#8dd6f9',
    category: 'bundler',
    position: 2
  },
  {
    name: 'Turbo',
    icon: '🚀',
    description: 'High-performance build system',
    color: '#0096ff',
    category: 'bundler',
    position: 3
  },
  {
    name: 'ESLint',
    icon: '🔍',
    description: 'Pluggable linting utility',
    color: '#4b32c3',
    category: 'linter',
    position: 4
  },
  {
    name: 'Stylelint',
    icon: '🎨',
    description: 'Modern CSS linter',
    color: '#263238',
    category: 'linter',
    position: 5
  },
  {
    name: 'Prettier',
    icon: '✨',
    description: 'Opinionated code formatter',
    color: '#f7b93e',
    category: 'linter',
    position: 6
  },
  {
    name: 'Jest',
    icon: '🃏',
    description: 'Delightful JavaScript testing',
    color: '#c21325',
    category: 'test',
    position: 7
  },
  {
    name: 'Vitest',
    icon: '🔬',
    description: 'Blazing fast unit test framework',
    color: '#729d39',
    category: 'test',
    position: 8
  },
  {
    name: 'Cypress',
    icon: '🔷',
    description: 'End-to-end testing framework',
    color: '#17202c',
    category: 'test',
    position: 9
  },
  {
    name: 'GitHub Actions',
    icon: '🔄',
    description: 'CI/CD automation platform',
    color: '#2088ff',
    category: 'ci',
    position: 10
  },
  {
    name: 'Docker',
    icon: '🐳',
    description: 'Container platform',
    color: '#2496ed',
    category: 'ci',
    position: 11
  },
  {
    name: 'pnpm',
    icon: '📋',
    description: 'Fast, disk space efficient package manager',
    color: '#f69220',
    category: 'ci',
    position: 12
  }
];

const pipelineSteps = [
  { id: 'dev', name: 'Development', icon: '💻', color: '#4a00e0' },
  { id: 'build', name: 'Build', icon: '🔨', color: '#6a00f0' },
  { id: 'test', name: 'Test', icon: '🧪', color: '#8000ff' },
  { id: 'lint', name: 'Lint', icon: '📋', color: '#9a00ff' },
  { id: 'deploy', name: 'Deploy', icon: '🚀', color: '#b400ff' }
];

export const EngineeringShowcase = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % pipelineSteps.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="engineering" className="py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="section-title text-4xl md:text-5xl mb-4"
        >
          Build & Ship
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-300 text-lg mb-12 max-w-3xl mx-auto"
        >
          Modern development workflow with automated build pipelines, comprehensive testing, and
          seamless deployment
        </motion.p>

        {/* Pipeline Visualization */}
        <div className="mb-16">
          <div className="flex justify-center items-center mb-8">
            <div className="flex items-center space-x-4 bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              {pipelineSteps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <motion.div
                    className={`relative flex items-center justify-center w-16 h-16 rounded-full border-2 cursor-pointer transition-all duration-300 ${
                      activeStep >= index
                        ? 'border-white bg-white/10'
                        : 'border-gray-600 bg-gray-800/30'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setActiveStep(index)}
                    animate={{
                      boxShadow:
                        activeStep >= index ? `0 0 20px ${step.color}40` : '0 0 0px transparent'
                    }}
                  >
                    <span className="text-2xl">{step.icon}</span>
                    {activeStep === index && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{
                          boxShadow: [
                            `0 0 10px ${step.color}`,
                            `0 0 20px ${step.color}`,
                            `0 0 10px ${step.color}`
                          ]
                        }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                  {index < pipelineSteps.length - 1 && (
                    <motion.div
                      className="w-8 h-1 mx-2 rounded"
                      style={{ backgroundColor: activeStep > index ? step.color : '#374151' }}
                      animate={{
                        backgroundColor: activeStep > index ? step.color : '#374151',
                        boxShadow: activeStep > index ? `0 0 5px ${step.color}` : 'none'
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Current Step Info */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-2">
              {pipelineSteps[activeStep].name} Phase
            </h3>
            <p className="text-gray-400">
              {pipelineSteps[activeStep].id === 'dev' &&
                'Writing code with modern tools and frameworks'}
              {pipelineSteps[activeStep].id === 'build' &&
                'Compiling and bundling assets for production'}
              {pipelineSteps[activeStep].id === 'test' && 'Running comprehensive test suites'}
              {pipelineSteps[activeStep].id === 'lint' && 'Ensuring code quality and consistency'}
              {pipelineSteps[activeStep].id === 'deploy' && 'Shipping to production environments'}
            </p>
          </motion.div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {buildTools.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              onHoverStart={() => setHoveredTool(tool.name)}
              onHoverEnd={() => setHoveredTool(null)}
              className="glass-card group cursor-pointer relative overflow-hidden"
            >
              {/* Background gradient */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, ${tool.color}15, transparent)`
                }}
              />

              {/* Glow border */}
              <motion.div
                className="absolute inset-0 rounded-lg"
                style={{
                  border: `1px solid ${tool.color}40`,
                  opacity: hoveredTool === tool.name ? 1 : 0
                }}
                transition={{ duration: 0.2 }}
              />

              <div className="relative z-10 p-6 text-center">
                <motion.div
                  className="text-4xl mb-4 p-3 rounded-2xl bg-gray-800/30 backdrop-blur-sm"
                  style={{ color: tool.color }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                >
                  {tool.icon}
                </motion.div>

                <h3 className="text-lg font-bold text-white mb-2">{tool.name}</h3>

                <p className="text-gray-400 text-sm leading-relaxed mb-3">{tool.description}</p>

                <div className="px-2 py-1 bg-gray-900/50 rounded-full text-xs text-gray-300 capitalize border border-gray-700">
                  {tool.category}
                </div>
              </div>

              {/* Floating particles */}
              {hoveredTool === tool.name && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full"
                      style={{ backgroundColor: tool.color }}
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
                        delay: i * 0.3
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
