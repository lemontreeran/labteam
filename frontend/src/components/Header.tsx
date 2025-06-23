import React from 'react';
import { motion } from 'framer-motion';
import { Beaker, Activity, Zap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white/90 backdrop-blur-md border-b border-slate-200/60 px-6 py-4 sticky top-0 z-50"
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Beaker className="h-8 w-8 text-primary-600" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-1 -right-1"
            >
              <Zap className="h-4 w-4 text-yellow-500" />
            </motion.div>
          </div>
          <div>
            <h1 className="text-2xl font-bold gradient-text">ChatGPT-Lab</h1>
            <p className="text-sm text-slate-600">AI-Powered Laboratory Automation</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-green-50 px-3 py-1.5 rounded-full">
            <Activity className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">System Active</span>
          </div>
          <div className="h-8 w-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">YL</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;