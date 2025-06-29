import React from 'react';
import { motion } from 'framer-motion';
import { Copy, Download, ExternalLink, TrendingUp, Thermometer, Dna } from 'lucide-react';

interface ResultsDisplayProps {
  results: any;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  if (!results) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const exportResults = () => {
    const data = results.type === 'batch' 
      ? results.data.map((r: any) => `${r.name}\t${r.sequence}\t${r.tm}\t${r.optimalTa}\t${r.gcContent}`).join('\n')
      : `${results.sequence}\t${results.tm}\t${results.optimalTa}\t${results.gcContent}`;
    
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tm_results.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (results.type === 'batch') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900">Batch Results</h3>
          <div className="flex space-x-2">
            <button
              onClick={exportResults}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Primer</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Sequence</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Length</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">GC%</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Tm (°C)</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Ta (°C)</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Notes</th>
              </tr>
            </thead>
            <tbody>
              {results.data.map((result: any, index: number) => (
                <motion.tr
                  key={result.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="border-t border-slate-200 hover:bg-slate-50"
                >
                  <td className="px-4 py-3 font-medium text-slate-900">{result.name}</td>
                  <td className="px-4 py-3 font-mono text-sm text-slate-700">{result.sequence}</td>
                  <td className="px-4 py-3 text-slate-700">{result.length}</td>
                  <td className="px-4 py-3 text-slate-700">{result.gcContent}%</td>
                  <td className="px-4 py-3 font-semibold text-red-600">{result.tm}°C</td>
                  <td className="px-4 py-3 font-semibold text-blue-600">{result.optimalTa}°C</td>
                  <td className="px-4 py-3 text-slate-600 text-sm">{result.notes}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900">Calculation Results</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => copyToClipboard(`Tm: ${results.tm}°C, Ta: ${results.optimalTa}°C`)}
            className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <Copy className="h-4 w-4" />
            <span>Copy</span>
          </button>
          <button
            onClick={exportResults}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border border-red-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-red-500 p-2 rounded-lg">
              <Thermometer className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-red-900">Melting Temperature</h4>
              <p className="text-sm text-red-700">Tm (°C)</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-red-900">{results.tm}°C</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-blue-500 p-2 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-blue-900">Optimal Annealing</h4>
              <p className="text-sm text-blue-700">Ta (°C)</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-blue-900">{results.optimalTa}°C</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-green-500 p-2 rounded-lg">
              <Dna className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-green-900">GC Content</h4>
              <p className="text-sm text-green-700">Percentage</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-green-900">{results.gcContent}%</p>
        </div>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
        <h4 className="font-semibold text-slate-900 mb-4">Primer Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-600 mb-1">Sequence (5' to 3')</p>
            <p className="font-mono text-slate-900 break-all">{results.sequence}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-1">Length</p>
            <p className="text-slate-900">{results.length} bp</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-1">Polymerase</p>
            <p className="text-slate-900">{results.polymerase}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-1">Conditions</p>
            <p className="text-slate-900 text-sm">
              {results.conditions.primerConc}µM primer, {results.conditions.saltConc}mM salt
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-3">Recommendations</h4>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• Use {results.optimalTa}°C as starting annealing temperature</li>
          <li>• Consider temperature gradient from {(parseFloat(results.optimalTa) - 3).toFixed(1)}°C to {(parseFloat(results.optimalTa) + 3).toFixed(1)}°C for optimization</li>
          <li>• GC content of {results.gcContent}% is {parseFloat(results.gcContent) > 60 ? 'high' : parseFloat(results.gcContent) < 40 ? 'low' : 'optimal'}</li>
          <li>• Results calculated using Santa Lucia algorithm with salt correction</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default ResultsDisplay;