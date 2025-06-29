import React from 'react';
import { FlaskRound as Flask, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false); // Close mobile menu after clicking
  };

  const handleGetStarted = () => {
    // Scroll to calculator section
    scrollToSection('calculator');
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            className="flex items-center space-x-3 cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => scrollToSection('hero')}
          >
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-2 rounded-lg">
              <Flask className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">NEB Tm Calculator</h1>
              <p className="text-xs text-slate-600 hidden sm:block">Professional PCR Primer Analysis</p>
            </div>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection('calculator')}
              className="text-slate-700 hover:text-blue-600 transition-colors font-medium"
            >
              Calculator
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className="text-slate-700 hover:text-blue-600 transition-colors font-medium"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('api')}
              className="text-slate-700 hover:text-blue-600 transition-colors font-medium"
            >
              API
            </button>
            <button 
              onClick={() => scrollToSection('documentation')}
              className="text-slate-700 hover:text-blue-600 transition-colors font-medium"
            >
              Documentation
            </button>
            <button 
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
            >
              Get Started
            </button>
          </nav>

          <button 
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden bg-white border-t border-slate-200"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className="px-4 py-4 space-y-4">
            <button 
              onClick={() => scrollToSection('calculator')}
              className="block w-full text-left text-slate-700 hover:text-blue-600 transition-colors font-medium"
            >
              Calculator
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className="block w-full text-left text-slate-700 hover:text-blue-600 transition-colors font-medium"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('api')}
              className="block w-full text-left text-slate-700 hover:text-blue-600 transition-colors font-medium"
            >
              API
            </button>
            <button 
              onClick={() => scrollToSection('documentation')}
              className="block w-full text-left text-slate-700 hover:text-blue-600 transition-colors font-medium"
            >
              Documentation
            </button>
            <button 
              onClick={handleGetStarted}
              className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
            >
              Get Started
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;