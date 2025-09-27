import { useState } from 'react';
import { motion } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: '3D Portfolio Website',
    description:
      'A modern portfolio website with Three.js 3D animations and interactive elements showcasing full-stack development skills.',
    image: '/images/project1.svg',
    technologies: ['React', 'Three.js', 'TypeScript', 'Tailwind CSS'],
    githubUrl: '#',
    liveUrl: '#',
    featured: true
  },
  {
    id: 2,
    title: 'Real-time Data Dashboard',
    description:
      'Interactive dashboard with real-time data visualization using WebSocket connections and modern charting libraries.',
    image: '/images/project2.svg',
    technologies: ['React', 'Node.js', 'WebSocket', 'Chart.js'],
    githubUrl: '#',
    liveUrl: '#',
    featured: true
  },
  {
    id: 3,
    title: 'E-commerce Platform',
    description:
      'Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.',
    image: '/images/project3.svg',
    technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'Redis'],
    githubUrl: '#',
    liveUrl: '#',
    featured: false
  },
  {
    id: 4,
    title: 'AI Content Generator',
    description:
      'AI-powered content generation tool using machine learning models for automated text and image creation.',
    image: '/images/project4.svg',
    technologies: ['Python', 'TensorFlow', 'React', 'FastAPI'],
    githubUrl: '#',
    liveUrl: '#',
    featured: false
  }
];

export const ProjectsShowcase = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});

  const handleImageError = (projectId: number) => {
    setImageErrors(prev => ({ ...prev, [projectId]: true }));
  };

  const getProjectImage = (project: Project) => {
    if (imageErrors[project.id]) {
      // 创建SVG占位符作为备用
      const svgContent = `
        <svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad${project.id}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#4a00e0;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#8e2de2;stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="600" height="400" fill="url(#grad${project.id})"/>
          <text x="300" y="200" font-family="Arial, sans-serif" font-size="20" fill="white" text-anchor="middle" dominant-baseline="middle">
            ${project.title}
          </text>
        </svg>
      `;
      return `data:image/svg+xml;base64,${btoa(svgContent)}`;
    }
    return project.image;
  };

  return (
    <section className="py-20 px-4 bg-gray-900/50" id="projects">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="section-title"
        >
          Featured Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="glass-card overflow-hidden group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={getProjectImage(project)}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={() => handleImageError(project.id)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {project.featured && (
                  <div
                    className="absolute top-4 right-4 text-white px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background: 'linear-gradient(to right, #9333ea, #2563eb)' }}
                  >
                    Featured
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map(tech => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-800/50 border border-gray-600/30 rounded-full text-xs text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.githubUrl}
                    className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                    onClick={e => e.stopPropagation()}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    Code
                  </a>
                  <a
                    href={project.liveUrl}
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                    onClick={e => e.stopPropagation()}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-3xl font-bold text-white">{selectedProject.title}</h3>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-gray-400 hover:text-white text-2xl"
                  >
                    ×
                  </button>
                </div>

                <img
                  src={getProjectImage(selectedProject)}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                  onError={() => handleImageError(selectedProject.id)}
                />

                <p className="text-gray-300 mb-6 leading-relaxed">{selectedProject.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.technologies.map(tech => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-800/50 border border-gray-600/30 rounded-full text-sm text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={selectedProject.githubUrl}
                    className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    View Code
                  </a>
                  <a
                    href={selectedProject.liveUrl}
                    className="flex items-center gap-2 text-white px-4 py-2 rounded-lg transition-all"
                    style={{ background: 'linear-gradient(to right, #9333ea, #2563eb)' }}
                    onMouseEnter={e =>
                      (e.currentTarget.style.background =
                        'linear-gradient(to right, #7c3aed, #1d4ed8)')
                    }
                    onMouseLeave={e =>
                      (e.currentTarget.style.background =
                        'linear-gradient(to right, #9333ea, #2563eb)')
                    }
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
