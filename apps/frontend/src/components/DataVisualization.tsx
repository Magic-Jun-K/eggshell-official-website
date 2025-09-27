import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as echarts from 'echarts';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

// 3D Globe Component
const Globe3D = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [dataPoints] = useState(() => {
    const points = [];
    for (let i = 0; i < 50; i++) {
      const phi = Math.acos(-1 + (2 * i) / 50);
      const theta = Math.sqrt(50 * Math.PI) * phi;
      points.push({
        position: [
          Math.cos(theta) * Math.sin(phi) * 2.1,
          Math.sin(theta) * Math.sin(phi) * 2.1,
          Math.cos(phi) * 2.1
        ],
        intensity: Math.random()
      });
    }
    return points;
  });

  useFrame(state => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group>
      {/* Main globe */}
      <Sphere ref={meshRef} args={[2, 64, 64]}>
        <meshStandardMaterial color="#1e40af" transparent opacity={0.8} wireframe />
      </Sphere>

      {/* Data points */}
      {dataPoints.map((point, index) => (
        <mesh key={index} position={point.position as [number, number, number]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial
            color="#00f2fe"
            emissive="#00f2fe"
            emissiveIntensity={point.intensity}
          />
        </mesh>
      ))}

      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#8a2be2" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00f2fe" />
    </group>
  );
};

// ECharts Component
const EChartsVisualization = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    chartInstance.current = echarts.init(chartRef.current);

    const option: echarts.EChartsOption = {
      backgroundColor: 'transparent',
      title: {
        text: 'Tech Stack Usage',
        textStyle: {
          color: '#e0e0ff',
          fontSize: 18,
          fontWeight: 'bold'
        },
        left: 'center',
        top: 20
      },
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderColor: '#8a2be2',
        borderWidth: 1,
        textStyle: {
          color: '#fff'
        }
      },
      series: [
        {
          name: 'Technology Usage',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '55%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#121212',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: 'bold',
              color: '#fff'
            },
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(138, 43, 226, 0.5)'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 35, name: 'React/TypeScript', itemStyle: { color: '#61dafb' } },
            { value: 25, name: 'Node.js/NestJS', itemStyle: { color: '#68a063' } },
            { value: 20, name: 'Three.js/WebGL', itemStyle: { color: '#049ef4' } },
            { value: 12, name: 'PostgreSQL', itemStyle: { color: '#336791' } },
            { value: 8, name: 'Other', itemStyle: { color: '#8a2be2' } }
          ]
        }
      ],
      animation: true,
      animationDuration: 2000,
      animationEasing: 'elasticOut'
    };

    chartInstance.current.setOption(option);

    // Auto-update data
    const interval = setInterval(() => {
      if (chartInstance.current) {
        const currentOption = chartInstance.current.getOption() as echarts.EChartsOption;
        const currentSeries = currentOption.series as echarts.PieSeriesOption[];

        if (currentSeries && currentSeries[0] && currentSeries[0].data) {
          const newData = currentSeries[0].data.map((item: any) => ({
            ...item,
            value: Math.max(5, item.value + (Math.random() - 0.5) * 4)
          }));

          chartInstance.current.setOption({
            series: [
              {
                data: newData
              }
            ]
          });
        }
      }
    }, 3000);

    // Resize handler
    const handleResize = () => {
      chartInstance.current?.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
      chartInstance.current?.dispose();
    };
  }, []);

  return (
    <div
      ref={chartRef}
      className="w-full h-full min-h-[400px] rounded-lg"
      style={{ background: 'rgba(31, 41, 55, 0.3)' }}
    />
  );
};

export const DataVisualization = () => {
  const [activeTab, setActiveTab] = useState<'globe' | 'charts'>('globe');

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="section-title text-4xl md:text-5xl"
        >
          Data Visualization
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-300 text-lg mb-12 max-w-3xl mx-auto"
        >
          Interactive 3D data visualization and real-time charts showcasing technology usage and
          global reach
        </motion.p>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-2">
            <button
              onClick={() => setActiveTab('globe')}
              className={`px-6 py-3 rounded-md transition-all duration-300 ${
                activeTab === 'globe'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              3D Globe
            </button>
            <button
              onClick={() => setActiveTab('charts')}
              className={`px-6 py-3 rounded-md transition-all duration-300 ${
                activeTab === 'charts'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              Real-time Charts
            </button>
          </div>
        </div>

        {/* Visualization Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
        >
          {/* Left side - 3D Globe or Chart */}
          <div className="h-[500px] rounded-2xl overflow-hidden glass-card">
            {activeTab === 'globe' ? (
              <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
                <Globe3D />
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  autoRotate
                  autoRotateSpeed={0.5}
                />
              </Canvas>
            ) : (
              <EChartsVisualization />
            )}
          </div>

          {/* Right side - Description */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                {activeTab === 'globe' ? 'Global Technology Reach' : 'Technology Usage Analytics'}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {activeTab === 'globe'
                  ? 'Interactive 3D visualization showing the global distribution of technology implementations and user interactions. Each point represents a significant technology deployment or user engagement.'
                  : 'Real-time analytics dashboard displaying the usage distribution across different technology stacks. Data updates dynamically to reflect current trends and adoption rates.'}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="glass-card p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">50+</div>
                <div className="text-sm text-gray-400">Data Points</div>
              </div>
              <div className="glass-card p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">99.9%</div>
                <div className="text-sm text-gray-400">Uptime</div>
              </div>
              <div className="glass-card p-4 text-center">
                <div className="text-2xl font-bold text-green-400">24/7</div>
                <div className="text-sm text-gray-400">Monitoring</div>
              </div>
              <div className="glass-card p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">&lt;100ms</div>
                <div className="text-sm text-gray-400">Response Time</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-3"
            >
              {['Three.js', 'WebGL', 'ECharts', 'D3.js', 'Canvas API'].map(tech => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-sm text-purple-300"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
