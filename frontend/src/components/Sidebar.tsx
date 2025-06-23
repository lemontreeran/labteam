import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  FlaskConical, 
  GitBranch, 
  Boxes,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'agents', label: 'AI Agents', icon: Users },
    { id: 'experiments', label: 'Experiments', icon: FlaskConical },
    { id: 'console', label: 'Console', icon: GitBranch },
    { id: 'labware', label: 'Labware Design', icon: Boxes },
  ];

  return (
    <motion.aside 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white/80 backdrop-blur-sm border-r border-slate-200/60 p-4"
    >
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-200 group ${
                isActive 
                  ? 'bg-primary-50 text-primary-700 shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`h-5 w-5 ${isActive ? 'text-primary-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                <span className="font-medium">{item.label}</span>
              </div>
              {isActive && (
                <ChevronRight className="h-4 w-4 text-primary-600" />
              )}
            </motion.button>
          );
        })}
      </nav>
      
      <div className="mt-8 p-4 bg-gradient-to-br from-primary-50 to-blue-50 rounded-lg border border-primary-100">
        <h3 className="font-semibold text-primary-900 mb-2">Quick Stats</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-600">Active Agents</span>
            <span className="font-medium text-primary-700">7</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Experiments</span>
            <span className="font-medium text-primary-700">23</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Success Rate</span>
            <span className="font-medium text-green-600">94%</span>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
