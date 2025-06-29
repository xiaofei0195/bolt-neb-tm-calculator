import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, AlertCircle, Info } from 'lucide-react';

interface CalculatorFormProps {
  onResults: (results: any) => void;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({ onResults }) => {
  const [formData, setFormData] = useState({
    sequence: '',
    primerConc: '0.5',
    saltConc: '50',
    mgConc: '2',
    dntp: '0.8',
    polymerase: 'Taq DNA Polymerase',
    customPolymerase: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);

  const polymerases = [
    'Taq DNA Polymerase',
    'OneTaq DNA Polymerase',
    'OneTaq Hot Start DNA Polymerase',
    'Q5 High-Fidelity DNA Polymerase',
    'Q5 Hot Start High-Fidelity DNA Polymerase',
    'Phusion High-Fidelity DNA Polymerase',
    'Phusion Hot Start Flex DNA Polymerase',
    'LongAmp Taq DNA Polymerase',
    'Bst DNA Polymerase, Large Fragment',
    'Bst 2.0 DNA Polymerase',
    'Bst 3.0 DNA Polymerase',
    'Vent DNA Polymerase',
    'Deep Vent DNA Polymerase',
    'Therminator DNA Polymerase',
    'Custom'
  ];

  const validateSequence = (seq: string): boolean => {
    const validBases = /^[ATGCRYSWKMBDHVNatgcryswkmbdhvn\s]+$/;
    return validBases.test(seq.replace(/\s/g, ''));
  };

  const calculateTm = async () => {
    const newErrors: Record<string, string> = {};

    // Validation
    if (!formData.sequence.trim()) {
      newErrors.sequence = 'Primer sequence is required';
    } else if (!validateSequence(formData.sequence)) {
      newErrors.sequence = 'Invalid characters in sequence. Use A, T, G, C, and degenerate bases only.';
    }

    if (parseFloat(formData.primerConc) <= 0) {
      newErrors.primerConc = 'Primer concentration must be positive';
    }

    if (parseFloat(formData.saltConc) <= 0) {
      newErrors.saltConc = 'Salt concentration must be positive';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsCalculating(true);

    // Simulate calculation (replace with actual Tm calculation logic)
    setTimeout(() => {
      const cleanSeq = formData.sequence.replace(/\s/g, '').toUpperCase();
      const length = cleanSeq.length;
      
      // Simple Tm calculation (replace with accurate algorithm)
      const gcContent = (cleanSeq.match(/[GC]/g) || []).length / length;
      const baseTm = 64.9 + 41 * gcContent - 650 / length;
      
      // Salt correction (simplified)
      const saltCorrection = 12 * Math.log(parseFloat(formData.saltConc) / 1000);
      
      const tm = baseTm + saltCorrection;
      const optimalTa = tm - 5; // Optimal annealing temperature

      const results = {
        sequence: cleanSeq,
        length,
        gcContent: (gcContent * 100).toFixed(1),
        tm: tm.toFixed(1),
        optimalTa: optimalTa.toFixed(1),
        polymerase: formData.polymerase === 'Custom' ? formData.customPolymerase : formData.polymerase,
        conditions: {
          primerConc: formData.primerConc,
          saltConc: formData.saltConc,
          mgConc: formData.mgConc,
          dntp: formData.dntp
        }
      };

      setIsCalculating(false);
      onResults(results);
    }, 1000);
  };

  const resetForm = () => {
    setFormData({
      sequence: '',
      primerConc: '0.5',
      saltConc: '50',
      mgConc: '2',
      dntp: '0.8',
      polymerase: 'Taq DNA Polymerase',
      customPolymerase: ''
    });
    setErrors({});
    onResults(null);
  };

  return (
    <div className="space-y-6">
      {/* Primer Sequence Input */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Primer Sequence
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="relative">
          <textarea
            value={formData.sequence}
            onChange={(e) => setFormData({ ...formData, sequence: e.target.value })}
            placeholder="Enter primer sequence (5' to 3')... e.g., ATGCGTACGTAGC"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono text-sm ${
              errors.sequence ? 'border-red-500' : 'border-slate-300'
            }`}
            rows={3}
          />
          {formData.sequence && (
            <div className="absolute bottom-2 right-2 text-xs text-slate-500 bg-white px-2 py-1 rounded">
              {formData.sequence.replace(/\s/g, '').length} bp
            </div>
          )}
        </div>
        {errors.sequence && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" />
            {errors.sequence}
          </p>
        )}
        <p className="mt-1 text-xs text-slate-500 flex items-center">
          <Info className="h-3 w-3 mr-1" />
          Supports degenerate bases (R, Y, S, W, K, M, B, D, H, V, N)
        </p>
      </div>

      {/* Reaction Conditions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Primer Concentration (µM)
          </label>
          <input
            type="number"
            step="0.1"
            min="0.1"
            value={formData.primerConc}
            onChange={(e) => setFormData({ ...formData, primerConc: e.target.value })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.primerConc ? 'border-red-500' : 'border-slate-300'
            }`}
          />
          {errors.primerConc && (
            <p className="mt-1 text-sm text-red-600">{errors.primerConc}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Salt Concentration (mM)
          </label>
          <input
            type="number"
            step="1"
            min="1"
            value={formData.saltConc}
            onChange={(e) => setFormData({ ...formData, saltConc: e.target.value })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.saltConc ? 'border-red-500' : 'border-slate-300'
            }`}
          />
          {errors.saltConc && (
            <p className="mt-1 text-sm text-red-600">{errors.saltConc}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Mg²⁺ Concentration (mM)
          </label>
          <input
            type="number"
            step="0.5"
            min="0"
            value={formData.mgConc}
            onChange={(e) => setFormData({ ...formData, mgConc: e.target.value })}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            dNTP Concentration (mM)
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            value={formData.dntp}
            onChange={(e) => setFormData({ ...formData, dntp: e.target.value })}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Polymerase Selection */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          DNA Polymerase
        </label>
        <select
          value={formData.polymerase}
          onChange={(e) => setFormData({ ...formData, polymerase: e.target.value })}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        >
          {polymerases.map((poly) => (
            <option key={poly} value={poly}>
              {poly}
            </option>
          ))}
        </select>
        
        {formData.polymerase === 'Custom' && (
          <input
            type="text"
            placeholder="Enter custom polymerase name"
            value={formData.customPolymerase}
            onChange={(e) => setFormData({ ...formData, customPolymerase: e.target.value })}
            className="mt-2 w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <motion.button
          onClick={calculateTm}
          disabled={isCalculating}
          className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-semibold flex items-center justify-center space-x-2 disabled:opacity-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Play className="h-5 w-5" />
          <span>{isCalculating ? 'Calculating...' : 'Calculate Tm'}</span>
        </motion.button>

        <motion.button
          onClick={resetForm}
          className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-all duration-200 font-semibold flex items-center space-x-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <RotateCcw className="h-5 w-5" />
          <span>Reset</span>
        </motion.button>
      </div>
    </div>
  );
};

export default CalculatorForm;