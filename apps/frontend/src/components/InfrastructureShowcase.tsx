import { useState } from 'react';

interface InfrastructureComponent {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  category: 'compute' | 'storage' | 'network' | 'orchestration' | 'monitoring';
  connections: string[];
  position: { x: number; y: number };
}

const infrastructureComponents: InfrastructureComponent[] = [
  {
    id: 'k8s',
    name: 'Kubernetes',
    icon: '☸️',
    description: 'Container orchestration platform',
    color: '#326ce5',
    category: 'orchestration',
    connections: ['docker', 'nginx', 'prometheus'],
    position: { x: 50, y: 30 }
  },
  {
    id: 'docker',
    name: 'Docker',
    icon: '🐳',
    description: 'Container platform',
    color: '#2496ed',
    category: 'compute',
    connections: ['k8s', 'app'],
    position: { x: 30, y: 50 }
  },
  {
    id: 'app',
    name: 'Application',
    icon: '💻',
    description: 'Node.js/NestJS Application',
    color: '#68a063',
    category: 'compute',
    connections: ['docker', 'redis', 'postgres'],
    position: { x: 50, y: 70 }
  },
  {
    id: 'nginx',
    name: 'Nginx',
    icon: '🌐',
    description: 'Load balancer & reverse proxy',
    color: '#009639',
    category: 'network',
    connections: ['k8s', 'cloudflare'],
    position: { x: 70, y: 30 }
  },
  {
    id: 'postgres',
    name: 'PostgreSQL',
    icon: '🐘',
    description: 'Primary database',
    color: '#336791',
    category: 'storage',
    connections: ['app', 'backup'],
    position: { x: 20, y: 80 }
  },
  {
    id: 'redis',
    name: 'Redis',
    icon: '🔴',
    description: 'In-memory cache & session store',
    color: '#dc382d',
    category: 'storage',
    connections: ['app'],
    position: { x: 80, y: 70 }
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare',
    icon: '☁️',
    description: 'CDN & DDoS protection',
    color: '#f48120',
    category: 'network',
    connections: ['nginx'],
    position: { x: 85, y: 20 }
  },
  {
    id: 'prometheus',
    name: 'Prometheus',
    icon: '📊',
    description: 'Monitoring & alerting',
    color: '#e6522c',
    category: 'monitoring',
    connections: ['k8s', 'grafana'],
    position: { x: 30, y: 10 }
  },
  {
    id: 'grafana',
    name: 'Grafana',
    icon: '📈',
    description: 'Metrics visualization',
    color: '#f46800',
    category: 'monitoring',
    connections: ['prometheus'],
    position: { x: 70, y: 10 }
  },
  {
    id: 'backup',
    name: 'Backup',
    icon: '💾',
    description: 'Automated backup system',
    color: '#7b68ee',
    category: 'storage',
    connections: ['postgres'],
    position: { x: 10, y: 60 }
  }
];

export const InfrastructureShowcase = () => {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);

  const getAllConnections = () => {
    const connections: any[] = [];
    infrastructureComponents.forEach(component => {
      component.connections.forEach(connId => {
        const target = infrastructureComponents.find(c => c.id === connId);
        if (target) {
          connections.push({
            from: component,
            to: target,
            id: `${component.id}-${connId}`
          });
        }
      });
    });
    return connections;
  };

  const connections = getAllConnections();

  return (
    <section id="infrastructure" className="py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="section-title text-4xl md:text-5xl mb-4">Infrastructure Architecture</h2>

        <p className="text-center text-gray-300 text-lg mb-12 max-w-3xl mx-auto">
          Scalable microservices architecture with container orchestration, monitoring, and
          automated deployment
        </p>

        {/* Architecture Diagram */}
        <div className="mb-16">
          <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 min-h-[500px]">
            {/* SVG for connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4a00e0" />
                  <stop offset="100%" stopColor="#00f2fe" />
                </linearGradient>
              </defs>
              {connections.map(connection => {
                const fromX = (connection.from.position.x / 100) * 100 + '%';
                const fromY = (connection.from.position.y / 100) * 100 + '%';
                const toX = (connection.to.position.x / 100) * 100 + '%';
                const toY = (connection.to.position.y / 100) * 100 + '%';

                return (
                  <line
                    key={connection.id}
                    x1={fromX}
                    y1={fromY}
                    x2={toX}
                    y2={toY}
                    stroke="url(#connectionGradient)"
                    strokeWidth={2}
                    opacity={0.5}
                  />
                );
              })}
            </svg>

            {/* Components */}
            {infrastructureComponents.map(component => (
              <div
                key={component.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${component.position.x}%`,
                  top: `${component.position.y}%`
                }}
              >
                <div
                  className={`relative glass-card p-4 cursor-pointer transition-all duration-300 ${
                    hoveredComponent === component.id ? 'scale-110' : ''
                  }`}
                  onMouseEnter={() => setHoveredComponent(component.id)}
                  onMouseLeave={() => setHoveredComponent(null)}
                  onClick={() => setSelectedComponent(component.id)}
                  style={{
                    boxShadow:
                      hoveredComponent === component.id
                        ? `0 0 20px ${component.color}40`
                        : '0 0 0px transparent'
                  }}
                >
                  <div className="text-center">
                    <div
                      className="text-3xl mb-2 p-2 rounded-full bg-gray-800/30"
                      style={{ color: component.color }}
                    >
                      {component.icon}
                    </div>
                    <div className="text-sm font-semibold text-white">{component.name}</div>
                  </div>

                  {/* Glow effect */}
                  {hoveredComponent === component.id && (
                    <div
                      className="absolute inset-0 rounded-lg"
                      style={{
                        border: `1px solid ${component.color}`,
                        opacity: 0.6
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Component Details */}
        {selectedComponent && (
          <div className="glass-card p-8 mb-8">
            {(() => {
              const component = infrastructureComponents.find(c => c.id === selectedComponent);
              if (!component) return null;

              return (
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="text-4xl p-3 rounded-full bg-gray-800/30"
                        style={{ color: component.color }}
                      >
                        {component.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{component.name}</h3>
                        <div className="text-sm text-gray-400 capitalize">{component.category}</div>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4">{component.description}</p>
                    <button
                      onClick={() => setSelectedComponent(null)}
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
                    >
                      Close Details
                    </button>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Connections</h4>
                    <div className="space-y-2">
                      {component.connections.map(connId => {
                        const target = infrastructureComponents.find(c => c.id === connId);
                        if (!target) return null;

                        return (
                          <div
                            key={connId}
                            className="flex items-center gap-3 p-2 rounded-lg bg-gray-800/30 hover:bg-gray-700 transition-colors"
                          >
                            <div style={{ color: target.color }}>{target.icon}</div>
                            <span className="text-white">{target.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Architecture Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {infrastructureComponents.filter(c => c.category === 'compute').length}
            </div>
            <div className="text-sm text-gray-400">Compute Nodes</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {infrastructureComponents.filter(c => c.category === 'storage').length}
            </div>
            <div className="text-sm text-gray-400">Storage Systems</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">
              {infrastructureComponents.filter(c => c.category === 'network').length}
            </div>
            <div className="text-sm text-gray-400">Network Services</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-bold text-orange-400 mb-2">
              {infrastructureComponents.filter(c => c.category === 'monitoring').length}
            </div>
            <div className="text-sm text-gray-400">Monitoring Tools</div>
          </div>
        </div>
      </div>
    </section>
  );
};
