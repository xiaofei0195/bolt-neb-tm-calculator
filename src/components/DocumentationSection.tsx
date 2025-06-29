import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, FileText, Download, ExternalLink, Search, ChevronRight } from 'lucide-react';

const DocumentationSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('getting-started');

  const documentationCategories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: BookOpen,
      items: [
        { title: 'Quick Start Guide', description: 'Get up and running in 5 minutes' },
        { title: 'Basic Tm Calculation', description: 'Your first primer analysis' },
        { title: 'Understanding Results', description: 'Interpreting Tm and Ta values' }
      ]
    },
    {
      id: 'advanced',
      title: 'Advanced Features',
      icon: FileText,
      items: [
        { title: 'Batch Processing', description: 'Process multiple primers efficiently' },
        { title: 'Degenerate Bases', description: 'Working with IUPAC codes' },
        { title: 'Custom Polymerases', description: 'Adding your own enzyme parameters' }
      ]
    },
    {
      id: 'api',
      title: 'API Reference',
      icon: ExternalLink,
      items: [
        { title: 'Authentication', description: 'API key setup and usage' },
        { title: 'Endpoints', description: 'Complete API endpoint reference' },
        { title: 'Error Codes', description: 'Troubleshooting API responses' }
      ]
    },
    {
      id: 'algorithms',
      title: 'Algorithms & Methods',
      icon: Search,
      items: [
        { title: 'Santa Lucia Method', description: 'Thermodynamic calculations explained' },
        { title: 'Salt Corrections', description: 'How ionic strength affects Tm' },
        { title: 'Validation Studies', description: 'Experimental validation data' }
      ]
    }
  ];

  const resources = [
    {
      title: 'PCR Primer Design Guide',
      description: 'Comprehensive guide to designing effective PCR primers',
      type: 'PDF',
      size: '2.4 MB'
    },
    {
      title: 'Tm Calculator User Manual',
      description: 'Complete user manual with examples and troubleshooting',
      type: 'PDF',
      size: '1.8 MB'
    },
    {
      title: 'API Integration Examples',
      description: 'Code examples in multiple programming languages',
      type: 'ZIP',
      size: '856 KB'
    },
    {
      title: 'Validation Dataset',
      description: 'Experimental data used for algorithm validation',
      type: 'CSV',
      size: '3.2 MB'
    }
  ];

  const filteredCategories = documentationCategories.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.items.some(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <section id="documentation" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-bold text-slate-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Documentation & Resources
          </motion.h2>
          <motion.p 
            className="text-xl text-slate-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Everything you need to master PCR primer Tm calculations
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Search and Navigation */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="sticky top-8"
            >
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-6">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search documentation..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <nav className="space-y-2">
                  {filteredCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                        activeCategory === category.id
                          ? 'bg-blue-100 text-blue-700 border border-blue-200'
                          : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <category.icon className="h-5 w-5" />
                      <span className="font-medium">{category.title}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-6 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-slate-900 mb-3">Need Help?</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Can't find what you're looking for? Our support team is here to help.
                </p>
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Contact Support
                </button>
              </div>
            </motion.div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-2">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredCategories.map((category) => (
                category.id === activeCategory && (
                  <div key={category.id} className="space-y-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <category.icon className="h-8 w-8 text-blue-600" />
                      <h3 className="text-2xl font-bold text-slate-900">{category.title}</h3>
                    </div>

                    <div className="grid gap-4">
                      {category.items.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.1 }}
                          className="bg-white p-6 rounded-lg border border-slate-200 hover:shadow-md transition-shadow cursor-pointer group"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                                {item.title}
                              </h4>
                              <p className="text-slate-600 mt-1">{item.description}</p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </motion.div>

            {/* Downloads Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <Download className="h-6 w-6 mr-3 text-green-600" />
                Downloads & Resources
              </h3>
              
              <div className="grid gap-4">
                {resources.map((resource, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg border border-slate-200 hover:shadow-md transition-shadow cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {resource.title}
                        </h4>
                        <p className="text-sm text-slate-600 mt-1">{resource.description}</p>
                      </div>
                      <div className="flex items-center space-x-3 ml-4">
                        <div className="text-right">
                          <div className="text-xs font-medium text-slate-500 uppercase">
                            {resource.type}
                          </div>
                          <div className="text-xs text-slate-400">{resource.size}</div>
                        </div>
                        <Download className="h-5 w-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentationSection;