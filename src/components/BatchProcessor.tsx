import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, Trash2, Plus, Play } from 'lucide-react';

interface BatchProcessorProps {
  onResults: (results: any) => void;
}

const BatchProcessor: React.FC<BatchProcessorProps> = ({ onResults }) => {
  const [primers, setPrimers] = useState([
    { id: 1, name: 'Primer-1', sequence: '', notes: '' }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const addPrimer = () => {
    const newId = Math.max(...primers.map(p => p.id)) + 1;
    setPrimers([...primers, { id: newId, name: `Primer-${newId}`, sequence: '', notes: '' }]);
  };

  const removePrimer = (id: number) => {
    if (primers.length > 1) {
      setPrimers(primers.filter(p => p.id !== id));
    }
  };

  const updatePrimer = (id: number, field: string, value: string) => {
    setPrimers(primers.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const processBatch = async () => {
    setIsProcessing(true);
    
    // Simulate batch processing
    setTimeout(() => {
      const results = primers.map(primer => {
        const cleanSeq = primer.sequence.replace(/\s/g, '').toUpperCase();
        const length = cleanSeq.length;
        const gcContent = (cleanSeq.match(/[GC]/g) || []).length / length;
        const baseTm = 64.9 + 41 * gcContent - 650 / length;
        const tm = baseTm + 12 * Math.log(50 / 1000); // Assuming 50mM salt
        
        return {
          name: primer.name,
          sequence: cleanSeq,
          length,
          gcContent: (gcContent * 100).toFixed(1),
          tm: tm.toFixed(1),
          optimalTa: (tm - 5).toFixed(1),
          notes: primer.notes
        };
      });
      
      setIsProcessing(false);
      onResults({ type: 'batch', data: results });
    }, 2000);
  };

  const importFromFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const lines = text.split('\n').filter(line => line.trim());
        const newPrimers = lines.map((line, index) => {
          const [name, sequence, notes = ''] = line.split('\t');
          return {
            id: index + 1,
            name: name || `Primer-${index + 1}`,
            sequence: sequence || '',
            notes
          };
        });
        setPrimers(newPrimers);
      };
      reader.readAsText(file);
    }
  };

  const exportTemplate = () => {
    const template = "Name\tSequence\tNotes\nPrimer-1\tATGCGTACGTAGC\tForward primer\nPrimer-2\tCGTAGCATGCGTA\tReverse primer";
    const blob = new Blob([template], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'batch_template.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Batch Processing</h3>
          <p className="text-sm text-slate-600">Process multiple primers simultaneously</p>
        </div>
        
        <div className="flex gap-2">
          <label className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
            <Upload className="h-4 w-4" />
            <span className="text-sm font-medium">Import</span>
            <input
              type="file"
              accept=".txt,.tsv,.csv"
              onChange={importFromFile}
              className="hidden"
            />
          </label>
          
          <button
            onClick={exportTemplate}
            className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span className="text-sm font-medium">Template</span>
          </button>
          
          <button
            onClick={addPrimer}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span className="text-sm font-medium">Add</span>
          </button>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {primers.map((primer, index) => (
          <motion.div
            key={primer.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            className="bg-slate-50 p-4 rounded-lg border border-slate-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-3">
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Primer Name
                </label>
                <input
                  type="text"
                  value={primer.name}
                  onChange={(e) => updatePrimer(primer.id, 'name', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="md:col-span-5">
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Sequence (5' to 3')
                </label>
                <input
                  type="text"
                  value={primer.sequence}
                  onChange={(e) => updatePrimer(primer.id, 'sequence', e.target.value)}
                  placeholder="ATGCGTACGTAGC..."
                  className="w-full px-3 py-2 text-sm font-mono border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="md:col-span-3">
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Notes
                </label>
                <input
                  type="text"
                  value={primer.notes}
                  onChange={(e) => updatePrimer(primer.id, 'notes', e.target.value)}
                  placeholder="Optional notes..."
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="md:col-span-1 flex justify-center">
                <button
                  onClick={() => removePrimer(primer.id)}
                  disabled={primers.length === 1}
                  className="p-2 text-red-600 hover:bg-red-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center">
        <motion.button
          onClick={processBatch}
          disabled={isProcessing || primers.some(p => !p.sequence.trim())}
          className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-semibold flex items-center space-x-2 disabled:opacity-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Play className="h-5 w-5" />
          <span>{isProcessing ? 'Processing...' : `Process ${primers.length} Primers`}</span>
        </motion.button>
      </div>
    </div>
  );
};

export default BatchProcessor;