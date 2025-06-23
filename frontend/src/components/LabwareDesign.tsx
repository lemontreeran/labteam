import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Box, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  Plus,
  Settings,
  Layers
} from 'lucide-react';

const LabwareDesign: React.FC = () => {
  const [selectedDesign, setSelectedDesign] = useState('tuberack-6');

  const labwareDesigns = [
    {
      id: 'tuberack-6',
      name: '6-Tube Rack (35mL)',
      description: '3D printed tube rack for 35mL glass tubes',
      type: 'Tube Rack',
      dimensions: '127.76 × 85.48 × 100mm',
      wells: 6,
      volume: '35000µL',
      status: 'active',
      lastModified: '2024-01-15',
      thumbnail: '/api/placeholder/200/150'
    },
    {
      id: 'tuberack-8',
      name: '8-Tube Rack (20mL)',
      description: '3D printed tube rack for 20mL vials',
      type: 'Tube Rack',
      dimensions: '127.76 × 85.48 × 60mm',
      wells: 8,
      volume: '20000µL',
      status: 'active',
      lastModified: '2024-01-14',
      thumbnail: '/api/placeholder/200/150'
    },
    {
      id: 'vial-plate',
      name: 'Vial Plate',
      description: 'Custom vial holding plate for small volume reactions',
      type: 'Plate',
      dimensions: '127.76 × 85.48 × 20mm',
      wells: 8,
      volume: '5000µL',
      status: 'draft',
      lastModified: '2024-01-13',
      thumbnail: '/api/placeholder/200/150'
    }
  ];

  const designParameters = {
    'tuberack-6': {
      plateThickness: 12,
      postThickness: 12,
      postHeight: 70,
      tubeRadius: 15.5,
      holeDepth: 4,
      plateXLength: 85.48,
      plateYLength: 127.76,
      liftAmount: 10,
      drillRadiusIncrease: 3,
      textSize: 15,
      textDepth: 4
    },
    'tuberack-8': {
      footprintLength: 127.76,
      footprintWidth: 85.48,
      plateThickness: 20,
      holeDepth: 10,
      tubeDiameter: 28,
      xSpacing: 30,
      ySpacing: 40,
      xOffset: 19,
      yOffset: 23,
      rows: 2,
      columns: 4
    }
  };

  const currentDesign = labwareDesigns.find(design => design.id === selectedDesign) || labwareDesigns[0];
  const currentParams = designParameters[selectedDesign as keyof typeof designParameters] || {};

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Labware Design</h1>
          <p className="text-slate-600 mt-1">Design and manage custom laboratory equipment</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export STL</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>New Design</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Design Library */}
        <div className="lg:col-span-1">
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-slate-900">Design Library</h3>
            </div>
            <div className="card-content space-y-3">
              {labwareDesigns.map((design) => (
                <motion.button
                  key={design.id}
                  onClick={() => setSelectedDesign(design.id)}
                  className={`w-full p-4 rounded-lg text-left transition-all duration-200 ${
                    selectedDesign === design.id 
                      ? 'bg-primary-50 border-2 border-primary-200' 
                      : 'bg-slate-50 hover:bg-slate-100 border-2 border-transparent'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-primary-100 rounded-lg">
                      <Box className="h-5 w-5 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-slate-900">{design.name}</h4>
                        <span className={`status-badge ${
                          design.status === 'active' ? 'status-completed' : 'status-pending'
                        }`}>
                          {design.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">{design.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-slate-500">{design.wells} wells</span>
                        <span className="text-xs text-slate-500">{design.lastModified}</span>
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Design Details */}
        <div className="lg:col-span-2">
          <motion.div
            key={selectedDesign}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Design Overview */}
            <div className="card">
              <div className="card-header">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{currentDesign.name}</h3>
                    <p className="text-slate-600">{currentDesign.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                      <Eye className="h-4 w-4 text-slate-600" />
                    </button>
                    <button className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                      <Edit className="h-4 w-4 text-slate-600" />
                    </button>
                    <button className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                      <Settings className="h-4 w-4 text-slate-600" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="card-content">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <h5 className="font-semibold text-slate-900">Type</h5>
                    <p className="text-sm text-slate-600 mt-1">{currentDesign.type}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <h5 className="font-semibold text-slate-900">Dimensions</h5>
                    <p className="text-sm text-slate-600 mt-1">{currentDesign.dimensions}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <h5 className="font-semibold text-slate-900">Wells</h5>
                    <p className="text-sm text-slate-600 mt-1">{currentDesign.wells}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <h5 className="font-semibold text-slate-900">Volume</h5>
                    <p className="text-sm text-slate-600 mt-1">{currentDesign.volume}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3D Preview */}
            <div className="card">
              <div className="card-header">
                <div className="flex items-center space-x-2">
                  <Layers className="h-5 w-5 text-slate-600" />
                  <h3 className="text-lg font-semibold text-slate-900">3D Preview</h3>
                </div>
              </div>
              <div className="card-content">
                <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center">
                    <Box className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600">3D model preview would appear here</p>
                    <p className="text-sm text-slate-500 mt-1">OpenSCAD rendering integration</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Design Parameters */}
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold text-slate-900">Design Parameters</h3>
                <p className="text-sm text-slate-600">Customize dimensions and properties</p>
              </div>
              <div className="card-content">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(currentParams).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </label>
                      <input
                        type="number"
                        value={value}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        readOnly
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button className="btn-secondary">Reset to Default</button>
                  <button className="btn-primary">Update Design</button>
                </div>
              </div>
            </div>

            {/* Generated Files */}
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold text-slate-900">Generated Files</h3>
                <p className="text-sm text-slate-600">Available design files and exports</p>
              </div>
              <div className="card-content">
                <div className="space-y-3">
                  {[
                    { name: `${currentDesign.name}.scad`, type: 'OpenSCAD Source', size: '2.4 KB', status: 'ready' },
                    { name: `${currentDesign.name}.stl`, type: '3D Model', size: '156 KB', status: 'ready' },
                    { name: `${currentDesign.name}.json`, type: 'Opentrons Config', size: '3.2 KB', status: 'ready' },
                    { name: `test_${currentDesign.name}.py`, type: 'Test Protocol', size: '8.7 KB', status: 'ready' }
                  ].map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-white rounded border">
                          <Box className="h-4 w-4 text-slate-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{file.name}</p>
                          <p className="text-sm text-slate-600">{file.type} • {file.size}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="status-badge status-completed">{file.status}</span>
                        <button className="p-1 text-slate-400 hover:text-primary-600 transition-colors">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
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

export default LabwareDesign;