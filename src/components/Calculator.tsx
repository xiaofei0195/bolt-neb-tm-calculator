import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator as CalcIcon, Upload, Download, Copy, Play, RotateCcw } from 'lucide-react';
import CalculatorForm from './CalculatorForm';
import BatchProcessor from './BatchProcessor';
import ResultsDisplay from './ResultsDisplay';

const Calculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'single' | 'batch'>('single');
  const [results, setResults] = useState<any>(null);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="border-b border-slate-200">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-2 rounded-lg">
              <CalcIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Tm Calculator</h2>
              <p className="text-slate-600">Calculate melting temperatures with precision</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('single')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'single'
                  ? 'bg-blue-100 text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Single Primer
            </button>
            <button
              onClick={() => setActiveTab('batch')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'batch'
                  ? 'bg-blue-100 text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Batch Processing
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'single' ? (
            <CalculatorForm onResults={setResults} />
          ) : (
            <BatchProcessor onResults={setResults} />
          )}
        </motion.div>

        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 border-t border-slate-200 pt-8"
          >
            <ResultsDisplay results={results} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Calculator;