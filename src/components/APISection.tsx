import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Copy, CheckCircle, Terminal, Book, Key } from 'lucide-react';

const APISection: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const codeExamples = {
    curl: `curl -X POST https://api.nebtm.calculator/v1/calculate \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "sequence": "ATGCGTACGTAGC",
    "primer_conc": 0.5,
    "salt_conc": 50,
    "polymerase": "Q5 High-Fidelity DNA Polymerase"
  }'`,
    
    javascript: `const response = await fetch('https://api.nebtm.calculator/v1/calculate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    sequence: 'ATGCGTACGTAGC',
    primer_conc: 0.5,
    salt_conc: 50,
    polymerase: 'Q5 High-Fidelity DNA Polymerase'
  })
});

const data = await response.json();
console.log('Tm:', data.tm, '°C');`,

    python: `import requests

url = "https://api.nebtm.calculator/v1/calculate"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_API_KEY"
}
data = {
    "sequence": "ATGCGTACGTAGC",
    "primer_conc": 0.5,
    "salt_conc": 50,
    "polymerase": "Q5 High-Fidelity DNA Polymerase"
}

response = requests.post(url, json=data, headers=headers)
result = response.json()
print(f"Tm: {result['tm']}°C")`
  };

  const [activeTab, setActiveTab] = useState<'curl' | 'javascript' | 'python'>('curl');

  return (
    <section id="api" className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Powerful API Integration
          </motion.h2>
          <motion.p 
            className="text-xl text-slate-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Integrate Tm calculations directly into your applications and workflows
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Terminal className="h-6 w-6 mr-3 text-blue-400" />
                API Examples
              </h3>
              
              <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
                <div className="flex border-b border-slate-700">
                  {Object.keys(codeExamples).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setActiveTab(lang as keyof typeof codeExamples)}
                      className={`px-4 py-3 text-sm font-medium capitalize transition-colors ${
                        activeTab === lang
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-400 hover:text-white hover:bg-slate-700'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
                
                <div className="relative">
                  <pre className="p-4 text-sm text-slate-300 overflow-x-auto">
                    <code>{codeExamples[activeTab]}</code>
                  </pre>
                  <button
                    onClick={() => copyToClipboard(codeExamples[activeTab], activeTab)}
                    className="absolute top-2 right-2 p-2 text-slate-400 hover:text-white transition-colors"
                  >
                    {copiedCode === activeTab ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                <div className="flex items-center mb-4">
                  <Key className="h-6 w-6 text-yellow-400 mr-3" />
                  <h4 className="text-xl font-semibold">API Features</h4>
                </div>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    RESTful API with JSON responses
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    Batch processing up to 1000 primers
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    Rate limiting: 1000 requests/hour
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    99.9% uptime SLA
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    Comprehensive error handling
                  </li>
                </ul>
              </div>

              <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                <div className="flex items-center mb-4">
                  <Book className="h-6 w-6 text-green-400 mr-3" />
                  <h4 className="text-xl font-semibold">Response Format</h4>
                </div>
                <pre className="text-sm text-slate-300 bg-slate-900 p-4 rounded border border-slate-600 overflow-x-auto">
{`{
  "tm": 58.2,
  "optimal_ta": 53.2,
  "gc_content": 46.2,
  "length": 13,
  "sequence": "ATGCGTACGTAGC",
  "polymerase": "Q5 High-Fidelity",
  "conditions": {
    "primer_conc": 0.5,
    "salt_conc": 50,
    "mg_conc": 2.0
  }
}`}
                </pre>
              </div>

              <div className="text-center">
                <button className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-semibold">
                  Get API Key
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default APISection;