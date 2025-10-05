"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingViewProps {
  domain: string;
}

const analysisStages = [
    "Initializing P.E.T.E.R. intelligence agents",
    "Accessing Doma Protocol on-chain data",
    "Scanning X/Twitter for community sentiment",
    "Analyzing Web2 metrics for SEO and traffic",
    "Cross-referencing comparable sales data",
    "Running ML-based liquidity forecasting",
    "Synthesizing multi-vector analysis",
    "Generating final intelligence report",
];

export default function LoadingView({ domain }: LoadingViewProps) {
  const [visibleStageCount, setVisibleStageCount] = useState(0);

  useEffect(() => {
    // Total fixed duration of 50 seconds
    const totalDuration = 50000;
    // Interval between each stage appearing
    const interval = totalDuration / (analysisStages.length + 1);

    const timers = analysisStages.map((_, index) =>
      setTimeout(() => {
        setVisibleStageCount(prev => prev + 1);
      }, (index + 1) * interval)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="section-resource font-mono">
      <div className="grid-container">
        <div className="grid">
          <div className="grid-fade"></div>
          <div className="grid-lines"></div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-between min-h-screen w-full max-w-4xl mx-auto p-8">
        
        {/* Domain Name - Centered */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-purple-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {domain}
          </motion.h1>
        </div>

        {/* Terminal Output - Bottom of the screen */}
        <div className="w-full mt-auto">
          <div className="flex flex-col-reverse items-start">
            <AnimatePresence>
              {analysisStages.slice(0, visibleStageCount).reverse().map((stage, index) => (
                <motion.p
                  key={analysisStages.length - 1 - index}
                  className="text-gray-400 text-base md:text-lg mt-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <span className="text-purple-400 mr-4">&gt;</span>
                  {stage}...
                </motion.p>
              ))}
            </AnimatePresence>
          </div>
          {/* Blinking cursor for the "current" line effect */}
          {visibleStageCount < analysisStages.length && (
             <div className="flex items-center text-lg mt-2">
                <span className="text-purple-400 mr-4">&gt;</span>
                <span className="w-3 h-5 bg-purple-400 animate-caret-blink"></span>
            </div>
          )}
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
          background-color: #000000;
          color: white;
          overflow: hidden;
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
          background: radial-gradient(ellipse at 50% 50%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 90%);
        }
        .grid-lines {
          width: 100%;
          height: 200%;
          background-image: 
            linear-gradient(rgba(154, 75, 255, 0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(154, 75, 255, 0.07) 1px, transparent 1px);
          background-size: 100px 70px;
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