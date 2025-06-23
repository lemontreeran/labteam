import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Zap, 
  CheckCircle, 
  Clock,
  AlertTriangle,
  Activity
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Dashboard: React.FC = () => {
  const experimentData = [
    { name: 'Day 1', crystallinity: 8.2, efficiency: 85 },
    { name: 'Day 2', crystallinity: 7.8, efficiency: 78 },
    { name: 'Day 3', crystallinity: 9.0, efficiency: 92 },
    { name: 'Day 4', crystallinity: 8.5, efficiency: 88 },
    { name: 'Day 5', crystallinity: 9.2, efficiency: 95 },
    { name: 'Day 6', crystallinity: 8.9, efficiency: 91 },
    { name: 'Day 7', crystallinity: 9.4, efficiency: 97 },
  ];

  const agentActivity = [
    { name: 'Atlas', tasks: 12, status: 'active' },
    { name: 'Curie', tasks: 8, status: 'active' },
    { name: 'Deng', tasks: 15, status: 'active' },
    { name: 'Edison', tasks: 6, status: 'idle' },
    { name: 'Faraday', tasks: 9, status: 'active' },
    { name: 'Gauss', tasks: 11, status: 'active' },
  ];

  const stats = [
    {
      title: 'Total Experiments',
      value: '247',
      change: '+12%',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Active Processes',
      value: '8',
      change: '+2',
      icon: Zap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Success Rate',
      value: '94.2%',
      change: '+1.8%',
      icon: CheckCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      title: 'Avg. Runtime',
      value: '2.4h',
      change: '-0.3h',
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Laboratory Dashboard</h1>
          <p className="text-slate-600 mt-1">Real-time monitoring of MOF synthesis optimization</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary">Export Data</button>
          <button className="btn-primary">Run Pipeline</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card"
            >
              <div className="card-content">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                    <p className={`text-sm mt-1 ${stat.color}`}>{stat.change} from last week</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <div className="card-header">
            <h3 className="text-lg font-semibold text-slate-900">Crystallinity Optimization</h3>
            <p className="text-sm text-slate-600">MOF synthesis performance over time</p>
          </div>
          <div className="card-content">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={experimentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="crystallinity" 
                  stroke="#0ea5e9" 
                  strokeWidth={3}
                  dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="card"
        >
          <div className="card-header">
            <h3 className="text-lg font-semibold text-slate-900">Agent Activity</h3>
            <p className="text-sm text-slate-600">Task completion by AI agents</p>
          </div>
          <div className="card-content">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={agentActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} 
                />
                <Bar dataKey="tasks" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card"
      >
        <div className="card-header">
          <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
          <p className="text-sm text-slate-600">Latest system events and notifications</p>
        </div>
        <div className="card-content">
          <div className="space-y-4">
            {[
              { agent: 'Curie', action: 'Completed Bayesian optimization cycle', time: '2 minutes ago', status: 'success' },
              { agent: 'Deng', action: 'Generated robot protocol for experiment #247', time: '5 minutes ago', status: 'success' },
              { agent: 'Atlas', action: 'Updated project summary with latest results', time: '8 minutes ago', status: 'info' },
              { agent: 'Edison', action: 'Designed new tube rack configuration', time: '12 minutes ago', status: 'success' },
              { agent: 'Gauss', action: 'Analyzed crystallinity data from batch #45', time: '15 minutes ago', status: 'success' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-slate-50 rounded-lg">
                <div className={`p-2 rounded-full ${
                  activity.status === 'success' ? 'bg-green-100' : 
                  activity.status === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                }`}>
                  <Activity className={`h-4 w-4 ${
                    activity.status === 'success' ? 'text-green-600' : 
                    activity.status === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">
                    <span className="text-primary-600">{activity.agent}</span> {activity.action}
                  </p>
                  <p className="text-xs text-slate-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;