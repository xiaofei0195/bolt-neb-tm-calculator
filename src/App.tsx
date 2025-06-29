import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import Header from './components/Header';
import Hero from './components/Hero';
import Calculator from './components/Calculator';
import AIAssistant from './components/AIAssistant';
import Features from './components/Features';
import Footer from './components/Footer';
import APISection from './components/APISection';
import DocumentationSection from './components/DocumentationSection';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <Hero />
      <div id="calculator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <div className="xl:col-span-3">
            <Calculator />
          </div>
          <div className="xl:col-span-1">
            <AIAssistant />
          </div>
        </div>
      </div>
      <Features />
      <APISection />
      <DocumentationSection />
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;