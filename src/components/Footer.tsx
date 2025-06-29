import React from 'react';
import { FlaskRound as Flask, Github, Twitter, Mail, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-2 rounded-lg">
                <Flask className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">NEB Tm Calculator</h3>
                <p className="text-slate-400 text-sm">Professional PCR Primer Analysis</p>
              </div>
            </div>
            <p className="text-slate-300 mb-4 max-w-md">
              Precision melting temperature calculations for optimal PCR performance. 
              Trusted by researchers worldwide for accurate, reliable results.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Tools</h4>
            <ul className="space-y-2">
              <li><a href="#calculator" className="text-slate-400 hover:text-white transition-colors">Tm Calculator</a></li>
              <li><a href="#batch" className="text-slate-400 hover:text-white transition-colors">Batch Processing</a></li>
              <li><a href="#api" className="text-slate-400 hover:text-white transition-colors">API Access</a></li>
              <li><a href="#mobile" className="text-slate-400 hover:text-white transition-colors">Mobile App</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#docs" className="text-slate-400 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#tutorials" className="text-slate-400 hover:text-white transition-colors">Tutorials</a></li>
              <li><a href="#papers" className="text-slate-400 hover:text-white transition-colors">Publications</a></li>
              <li><a href="#support" className="text-slate-400 hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 text-sm text-slate-400">
              <p>&copy; 2025 NEB Tm Calculator. All rights reserved.</p>
              <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-slate-400 text-sm">Powered by</span>
              <a 
                href="https://www.neb.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-slate-400 hover:text-white transition-colors text-sm"
              >
                <span>New England Biolabs</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;