import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  ArrowRight,
  RefreshCw,
  Download
} from 'lucide-react';

const PipelineStatus: React.FC = () => {
  const [showDevUI, setShowDevUI] = useState(false); // <-- add control variable
  const pipelineSteps = [
    {
      id: 'atlas',
      name: 'Atlas - Project Management',
      description: 'Generate prompts and coordinate team activities',
      status: 'completed',
      duration: '2.3s',
      output: 'Prompt generated successfully'
    },
    {
      id: 'curie',
      name: 'Curie - Bayesian Optimization',
      description: 'Run optimization algorithms and suggest parameters',
      status: 'completed',
      duration: '45.2s',
      output: 'Next suggestion: [0.074, 19, 103]'
    },
    {
      id: 'deng',
      name: 'Deng - Robot Protocol',
      description: 'Generate automated laboratory protocols',
      status: 'completed',
      duration: '1.8s',
      output: 'Robot protocol generated'
    },
    {
      id: 'edison',
      name: 'Edison - 3D Design',
      description: 'Create 3D models for laboratory equipment',
      status: 'running',
      duration: '12.5s',
      output: 'Generating STL file...'
    },
    {
      id: 'analysis',
      name: 'Data Analysis',
      description: 'Process experimental results and update models',
      status: 'pending',
      duration: '-',
      output: 'Waiting for previous step'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'running':
        return <RefreshCw className="h-5 w-5 text-blue-600 animate-spin" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-200';
      case 'running':
        return 'bg-blue-50 border-blue-200';
      case 'pending':
        return 'bg-yellow-50 border-yellow-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-slate-50 border-slate-200';
    }
  };

  const recentRuns = [
    {
      id: 'run-001',
      timestamp: '2024-01-15 14:30:22',
      status: 'completed',
      duration: '2m 15s',
      experiments: 3,
      success_rate: '100%'
    },
    {
      id: 'run-002',
      timestamp: '2024-01-15 12:15:45',
      status: 'completed',
      duration: '1m 58s',
      experiments: 2,
      success_rate: '100%'
    },
    {
      id: 'run-003',
      timestamp: '2024-01-15 10:22:11',
      status: 'completed',
      duration: '2m 32s',
      experiments: 4,
      success_rate: '75%'
    },
    {
      id: 'run-004',
      timestamp: '2024-01-14 16:45:33',
      status: 'error',
      duration: '45s',
      experiments: 1,
      success_rate: '0%'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Pipeline Status</h1>
          <p className="text-slate-600 mt-1">Monitor automated laboratory workflow execution</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Logs</span>
          </button>
          <button className="btn-primary flex items-center space-x-2"
            onClick={() => setShowDevUI(true)}>
            <Play className="h-4 w-4" />
            <span>Workflow</span>
          </button>
        </div>
      </div>

      {/* Current Pipeline Execution View */}
      <div className="card">
        <div className="card-header">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Current Execution</h3>
              <p className="text-sm text-slate-600">
                {showDevUI
                  ? "Live agent execution via ADK Dev UI"
                  : "Pipeline run started at 14:30:22"}
              </p>
            </div>
            {!showDevUI && (
              <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1.5 rounded-full">
                <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />
                <span className="text-sm font-medium text-blue-700">Running</span>
              </div>
            )}
          </div>
        </div>

        <div className="card-content">
          {showDevUI ? (
            <iframe
              src="http://127.0.0.1:8000/dev-ui/?app=agents"
              width="100%"
              height="800px"
              className="rounded-md border border-slate-200"
              style={{ background: '#fff' }}
            />
          ) : (
            <div className="space-y-4">
              {pipelineSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border-2 ${getStatusColor(step.status)}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(step.status)}
                      <div>
                        <h4 className="font-semibold text-slate-900">{step.name}</h4>
                        <p className="text-sm text-slate-600">{step.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-900">{step.duration}</p>
                      <p className="text-xs text-slate-500">{step.output}</p>
                    </div>
                  </div>
                  {index < pipelineSteps.length - 1 && (
                    <div className="flex justify-center mt-4">
                      <ArrowRight className="h-4 w-4 text-slate-400" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pipeline Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Runs', value: '247', change: '+12 today' },
          { label: 'Success Rate', value: '94.2%', change: '+1.8% this week' },
          { label: 'Avg Duration', value: '2m 15s', change: '-15s improvement' },
          { label: 'Active Agents', value: '6/7', change: 'Edison idle' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card"
          >
            <div className="card-content">
              <h4 className="text-sm font-medium text-slate-600">{stat.label}</h4>
              <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
              <p className="text-sm text-slate-500 mt-1">{stat.change}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Pipeline Runs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="card-header">
          <h3 className="text-lg font-semibold text-slate-900">Recent Pipeline Runs</h3>
          <p className="text-sm text-slate-600">History of automated workflow executions</p>
        </div>
        <div className="card-content">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Run ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Timestamp</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Duration</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Experiments</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Success Rate</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentRuns.map((run, index) => (
                  <motion.tr
                    key={run.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-primary-600">{run.id}</td>
                    <td className="py-3 px-4 text-slate-600">{run.timestamp}</td>
                    <td className="py-3 px-4">
                      <span className={`status-badge ${
                        run.status === 'completed' ? 'status-completed' : 
                        run.status === 'error' ? 'status-error' : 'status-running'
                      }`}>
                        {run.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{run.duration}</td>
                    <td className="py-3 px-4 text-slate-600">{run.experiments}</td>
                    <td className="py-3 px-4 text-slate-600">{run.success_rate}</td>
                    <td className="py-3 px-4">
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        View Details
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PipelineStatus;
