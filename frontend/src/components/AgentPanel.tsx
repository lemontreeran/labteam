import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Brain, 
  Code, 
  Wrench, 
  Hammer, 
  FlaskConical, 
  BarChart3,
  Play,
  Pause,
  Settings,
  MessageSquare
} from 'lucide-react';

const AgentPanel: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState('atlas');

  const agents = [
    {
      id: 'atlas',
      name: 'Atlas',
      role: 'Project Manager',
      description: 'Synthesizes team progress, evaluates project status, and proposes next steps',
      icon: User,
      status: 'active',
      tasks: 12,
      lastActivity: '2 minutes ago',
      specialties: ['Project Management', 'Task Coordination', 'Progress Synthesis'],
      color: 'bg-blue-500'
    },
    {
      id: 'curie',
      name: 'Curie',
      role: 'Modeling & Coding Specialist',
      description: 'Writes and revises Python codes for Bayesian Optimization',
      icon: Brain,
      status: 'active',
      tasks: 8,
      lastActivity: '5 minutes ago',
      specialties: ['Bayesian Optimization', 'Python Programming', 'Machine Learning'],
      color: 'bg-purple-500'
    },
    {
      id: 'deng',
      name: 'Deng',
      role: 'Robotic Technician',
      description: 'Operates robots for chemical synthesis reaction preparation',
      icon: Wrench,
      status: 'active',
      tasks: 15,
      lastActivity: '1 minute ago',
      specialties: ['Robot Operation', 'Protocol Generation', 'Automation'],
      color: 'bg-green-500'
    },
    {
      id: 'edison',
      name: 'Edison',
      role: 'Lab Equipment Designer',
      description: 'Designs and creates 3D model files based on descriptions',
      icon: Hammer,
      status: 'idle',
      tasks: 6,
      lastActivity: '12 minutes ago',
      specialties: ['3D Modeling', 'Equipment Design', 'CAD Programming'],
      color: 'bg-orange-500'
    },
    {
      id: 'faraday',
      name: 'Faraday',
      role: 'Chemical Synthesis Consultant',
      description: 'Provides detailed synthesis steps, safety precautions, and tips',
      icon: FlaskConical,
      status: 'active',
      tasks: 9,
      lastActivity: '7 minutes ago',
      specialties: ['Chemical Synthesis', 'Safety Protocols', 'Process Optimization'],
      color: 'bg-red-500'
    },
    {
      id: 'gauss',
      name: 'Gauss',
      role: 'Analytical Assistant',
      description: 'Analyzes and interprets data, aids in data visualization',
      icon: BarChart3,
      status: 'active',
      tasks: 11,
      lastActivity: '3 minutes ago',
      specialties: ['Data Analysis', 'Statistical Modeling', 'Visualization'],
      color: 'bg-indigo-500'
    }
  ];

  const currentAgent = agents.find(agent => agent.id === selectedAgent) || agents[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">AI Agent Management</h1>
          <p className="text-slate-600 mt-1">Monitor and control your laboratory AI team</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary">Agent Logs</button>
          <button className="btn-primary">Deploy All</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agent List */}
        <div className="lg:col-span-1">
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-slate-900">Team Members</h3>
            </div>
            <div className="card-content space-y-3">
              {agents.map((agent) => {
                const Icon = agent.icon;
                return (
                  <motion.button
                    key={agent.id}
                    onClick={() => setSelectedAgent(agent.id)}
                    className={`w-full p-4 rounded-lg text-left transition-all duration-200 ${
                      selectedAgent === agent.id 
                        ? 'bg-primary-50 border-2 border-primary-200' 
                        : 'bg-slate-50 hover:bg-slate-100 border-2 border-transparent'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${agent.color} text-white`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-slate-900">{agent.name}</h4>
                          <span className={`status-badge ${
                            agent.status === 'active' ? 'status-running' : 'status-pending'
                          }`}>
                            {agent.status}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600">{agent.role}</p>
                        <p className="text-xs text-slate-500 mt-1">{agent.tasks} active tasks</p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Agent Details */}
        <div className="lg:col-span-2">
          <motion.div
            key={selectedAgent}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="card"
          >
            <div className="card-header">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${currentAgent.color} text-white`}>
                    <currentAgent.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{currentAgent.name}</h3>
                    <p className="text-slate-600">{currentAgent.role}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                    <Settings className="h-4 w-4 text-slate-600" />
                  </button>
                  <button className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                    <MessageSquare className="h-4 w-4 text-slate-600" />
                  </button>
                  <button className={`p-2 rounded-lg transition-colors ${
                    currentAgent.status === 'active' 
                      ? 'bg-red-100 hover:bg-red-200 text-red-600' 
                      : 'bg-green-100 hover:bg-green-200 text-green-600'
                  }`}>
                    {currentAgent.status === 'active' ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="card-content space-y-6">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Description</h4>
                <p className="text-slate-600">{currentAgent.description}</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {currentAgent.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <h5 className="font-semibold text-slate-900">Active Tasks</h5>
                  <p className="text-2xl font-bold text-primary-600 mt-1">{currentAgent.tasks}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <h5 className="font-semibold text-slate-900">Last Activity</h5>
                  <p className="text-sm text-slate-600 mt-1">{currentAgent.lastActivity}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Recent Tasks</h4>
                <div className="space-y-3">
                  {[
                    { task: 'Optimized reaction parameters for MOF synthesis', status: 'completed', time: '5 min ago' },
                    { task: 'Generated Bayesian optimization suggestions', status: 'completed', time: '12 min ago' },
                    { task: 'Analyzed crystallinity data from batch #247', status: 'running', time: '15 min ago' },
                  ].map((task, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-slate-900">{task.task}</p>
                        <p className="text-xs text-slate-500">{task.time}</p>
                      </div>
                      <span className={`status-badge ${
                        task.status === 'completed' ? 'status-completed' : 'status-running'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AgentPanel;