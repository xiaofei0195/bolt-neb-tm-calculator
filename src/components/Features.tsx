import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Globe, Cpu, FileText, Users, Beaker, BarChart3 } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast Calculations",
      description: "Get accurate Tm values in milliseconds with our optimized algorithms",
      color: "yellow"
    },
    {
      icon: Shield,
      title: "Laboratory Validated",
      description: "Results validated against experimental data for publication-ready accuracy",
      color: "green"
    },
    {
      icon: Globe,
      title: "20+ NEB Polymerases",
      description: "Comprehensive database of NEB polymerase parameters and custom enzyme support",
      color: "blue"
    },
    {
      icon: Cpu,
      title: "AI-Powered Optimization",
      description: "Get intelligent protocol recommendations and troubleshooting assistance",
      color: "purple"
    },
    {
      icon: FileText,
      title: "Batch Processing",
      description: "Process hundreds of primers simultaneously with bulk import/export",
      color: "teal"
    },
    {
      icon: Beaker,
      title: "Degenerate Base Support",
      description: "Handle complex primers with IUPAC degenerate bases and range calculations",
      color: "orange"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Visualize Tm distributions, GC content analysis, and primer statistics",
      color: "red"
    },
    {
      icon: Users,
      title: "Academic Compliance",
      description: "Proper citations and references for journal publication requirements",
      color: "indigo"
    }
  ];

  const colorClasses = {
    yellow: "from-yellow-500 to-orange-500",
    green: "from-green-500 to-emerald-500",
    blue: "from-blue-500 to-cyan-500",
    purple: "from-purple-500 to-pink-500",
    teal: "from-teal-500 to-blue-500",
    orange: "from-orange-500 to-red-500",
    red: "from-red-500 to-pink-500",
    indigo: "from-indigo-500 to-purple-500"
  };

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-bold text-slate-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Professional-Grade Features
          </motion.h2>
          <motion.p 
            className="text-xl text-slate-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Everything you need for precise PCR primer analysis and optimization
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 hover:shadow-2xl transition-all duration-300 h-full">
                <div className={`bg-gradient-to-r ${colorClasses[feature.color as keyof typeof colorClasses]} p-3 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-8 rounded-2xl border border-blue-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Trusted by Research Labs Worldwide
            </h3>
            <p className="text-slate-700 text-lg mb-6">
              Join thousands of researchers using our calculator for their PCR optimization needs
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-blue-600">10,000+</div>
                <div className="text-slate-600">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-teal-600">1M+</div>
                <div className="text-slate-600">Calculations Performed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">500+</div>
                <div className="text-slate-600">Publications Cited</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;