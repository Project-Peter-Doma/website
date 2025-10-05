"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Globe, Bird, Search, Share2, Sparkles, Brain } from 'lucide-react';

interface LoadingViewProps {
  domain: string;
}

const analysisStages = [
  {
    name: "Initializing P.E.T.E.R. Agents",
    icon: Sparkles,
    duration: 5000,
    description: "Spinning up multi-agent intelligence system"
  },
  {
    name: "Querying Doma Protocol",
    icon: Database,
    duration: 8000,
    description: "Analyzing on-chain history and tokenization data"
  },
  {
    name: "Scanning X/Twitter",
    icon: Bird,
    duration: 10000,
    description: "Gauging community sentiment and narrative velocity"
  },
  {
    name: "Researching Market Trends",
    icon: Globe,
    duration: 12000,
    description: "Deep-diving into comparable sales and brandability"
  },
  {
    name: "Analyzing Web2 Metrics",
    icon: Search,
    duration: 8000,
    description: "Evaluating SEO authority and organic traffic"
  },
  {
    name: "Predicting Liquidity",
    icon: Brain,
    duration: 7000,
    description: "Running ML-based liquidity forecasting"
  },
  {
    name: "Synthesizing Final Report",
    icon: Share2,
    duration: 5000,
    description: "Aggregating insights from all specialist agents"
  },
];

export default function LoadingView({ domain }: LoadingViewProps) {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentStageIndex >= analysisStages.length) return;

    const currentStage = analysisStages[currentStageIndex];
    const startTime = Date.now();
    
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const stageProgress = Math.min((elapsed / currentStage.duration) * 100, 100);
      
      const baseProgress = (currentStageIndex / analysisStages.length) * 100;
      const currentProgress = baseProgress + (stageProgress / analysisStages.length);
      
      setProgress(currentProgress);
    }, 50);

    const stageTimer = setTimeout(() => {
      if (currentStageIndex < analysisStages.length - 1) {
        setCurrentStageIndex(prev => prev + 1);
      }
    }, currentStage.duration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(stageTimer);
    };
  }, [currentStageIndex]);

  const CurrentIcon = analysisStages[currentStageIndex]?.icon || Sparkles;
  const currentStage = analysisStages[currentStageIndex];

  return (
    <div className="section-resource">
      <div className="grid-container">
        <div className="grid">
          <div className="grid-fade"></div>
          <div className="grid-lines"></div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-2xl px-4">
        {/* Domain Name */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl font-semibold text-gray-400 mb-2">Analyzing</h2>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {domain}
          </h1>
        </motion.div>

        {/* Central Icon with Glow */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-purple-500/30 rounded-full blur-2xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStageIndex}
                initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.5, rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="relative bg-gray-900 p-8 rounded-full border-2 border-purple-500/50"
              >
                <CurrentIcon className="w-16 h-16 text-purple-400" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Current Stage Text */}
        <div className="mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStageIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                {currentStage?.name}
              </h3>
              <p className="text-gray-400 text-sm">
                {currentStage?.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Stage Timeline */}
        <div className="space-y-2">
          {analysisStages.map((stage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                index === currentStageIndex
                  ? 'bg-purple-500/20 border border-purple-500/50'
                  : index < currentStageIndex
                  ? 'bg-green-500/10 border border-green-500/30'
                  : 'bg-gray-800/30 border border-gray-700/30'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index < currentStageIndex ? 'bg-green-500' : index === currentStageIndex ? 'bg-purple-500' : 'bg-gray-700'
              }`}>
                {index < currentStageIndex ? (
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <stage.icon className="w-4 h-4 text-white" />
                )}
              </div>
              <span className={`text-sm font-medium ${
                index <= currentStageIndex ? 'text-white' : 'text-gray-500'
              }`}>
                {stage.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .section-resource {
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100vw;
          display: flex;
          position: fixed;
          inset: 0;
          background-color: #0E1416;
          color: white;
          overflow: hidden;
          font-family: var(--font-aeonik), sans-serif;
        }
        .grid-container {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .grid {
          width: 100%;
          height: 100vh;
          overflow: hidden;
          perspective: calc(100vh * .75);
          position: absolute;
          top: 0;
          left: 0;
        }
        .grid-fade {
          width: 100%;
          height: 100%;
          position: absolute;
          z-index: 1;
          background: radial-gradient(ellipse at 50% 50%, rgba(14, 20, 22, 0) 0%, rgba(14, 20, 22, 1) 80%);
        }
        .grid-lines {
          width: 100%;
          height: 200%;
          background-image: 
            linear-gradient(rgba(154, 75, 255, 0.6) 2px, transparent 2px),
            linear-gradient(90deg, rgba(154, 75, 255, 0.6) 2px, transparent 2px),
            linear-gradient(rgba(154, 75, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(154, 75, 255, 0.3) 1px, transparent 1px);
          background-size: 
            150px 100px, 150px 100px,
            30px 20px, 30px 20px;
          transform-origin: 50% 0;
          animation: play 15s linear infinite;
        }
        @keyframes play {
          0% {
            transform: rotateX(45deg) translateY(-50%);
          }
          100% {
            transform: rotateX(45deg) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}