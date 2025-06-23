import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  Filter, 
  Search, 
  TrendingUp, 
  TrendingDown,
  Minus,
  Eye,
  Edit
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';

const ExperimentData: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const experimentData = [
    {
      id: 'EXP-247',
      metalAmount: 0.1,
      modulator: 'AcOH',
      addSolvent: 'DMF',
      reactionTime: 12,
      reactionTemp: 120,
      crystallinity: 8.2,
      date: '2024-01-15',
      status: 'completed',
      trend: 'up'
    },
    {
      id: 'EXP-246',
      metalAmount: 0.2,
      modulator: 'AcOH',
      addSolvent: 'DEF',
      reactionTime: 10,
      reactionTemp: 110,
      crystallinity: 7.8,
      date: '2024-01-14',
      status: 'completed',
      trend: 'down'
    },
    {
      id: 'EXP-245',
      metalAmount: 0.15,
      modulator: 'EtOH',
      addSolvent: 'DMF',
      reactionTime: 14,
      reactionTemp: 130,
      crystallinity: 9.0,
      date: '2024-01-13',
      status: 'completed',
      trend: 'up'
    },
    {
      id: 'EXP-244',
      metalAmount: 0.12,
      modulator: 'AcOH',
      addSolvent: 'DMF',
      reactionTime: 11,
      reactionTemp: 125,
      crystallinity: 8.5,
      date: '2024-01-12',
      status: 'completed',
      trend: 'up'
    },
    {
      id: 'EXP-243',
      metalAmount: 0.18,
      modulator: 'EtOH',
      addSolvent: 'DEF',
      reactionTime: 13,
      reactionTemp: 115,
      crystallinity: 7.9,
      date: '2024-01-11',
      status: 'completed',
      trend: 'down'
    }
  ];

  const correlationData = experimentData.map(exp => ({
    temp: exp.reactionTemp,
    crystallinity: exp.crystallinity,
    time: exp.reactionTime
  }));

  const filteredData = experimentData.filter(exp => {
    const matchesSearch = exp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exp.modulator.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exp.addSolvent.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    return matchesSearch && exp.status === selectedFilter;
  });

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Experiment Data</h1>
          <p className="text-slate-600 mt-1">MOF synthesis experimental results and analysis</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </button>
          <button className="btn-primary">New Experiment</button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card">
        <div className="card-content">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search experiments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-slate-400" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="running">Running</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Data Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card"
        >
          <div className="card-header">
            <h3 className="text-lg font-semibold text-slate-900">Crystallinity Trends</h3>
            <p className="text-sm text-slate-600">Performance over recent experiments</p>
          </div>
          <div className="card-content">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={experimentData.slice().reverse()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="id" stroke="#64748b" />
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
          className="card"
        >
          <div className="card-header">
            <h3 className="text-lg font-semibold text-slate-900">Temperature vs Crystallinity</h3>
            <p className="text-sm text-slate-600">Correlation analysis</p>
          </div>
          <div className="card-content">
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart data={correlationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="temp" stroke="#64748b" name="Temperature" />
                <YAxis dataKey="crystallinity" stroke="#64748b" name="Crystallinity" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} 
                />
                <Scatter dataKey="crystallinity" fill="#3b82f6" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Data Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="card-header">
          <h3 className="text-lg font-semibold text-slate-900">Experiment Results</h3>
          <p className="text-sm text-slate-600">Detailed experimental data and parameters</p>
        </div>
        <div className="card-content">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Metal Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Modulator</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Solvent</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Time (h)</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Temp (°C)</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Crystallinity</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Trend</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((exp, index) => (
                  <motion.tr
                    key={exp.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-primary-600">{exp.id}</td>
                    <td className="py-3 px-4 text-slate-600">{exp.metalAmount}</td>
                    <td className="py-3 px-4 text-slate-600">{exp.modulator}</td>
                    <td className="py-3 px-4 text-slate-600">{exp.addSolvent}</td>
                    <td className="py-3 px-4 text-slate-600">{exp.reactionTime}</td>
                    <td className="py-3 px-4 text-slate-600">{exp.reactionTemp}</td>
                    <td className="py-3 px-4 font-semibold text-slate-900">{exp.crystallinity}</td>
                    <td className="py-3 px-4">{getTrendIcon(exp.trend)}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="p-1 text-slate-400 hover:text-primary-600 transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-slate-400 hover:text-primary-600 transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
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

export default ExperimentData;