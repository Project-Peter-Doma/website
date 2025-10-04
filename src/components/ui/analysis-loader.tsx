"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Database, Globe, Bird, Search, Share2 } from 'lucide-react'; // Icons for our agents

// Define the stages of our analysis sequence
const analysisStages = [
    {
        name: "Deploying P.E.T.E.R. Agents...",
        icon: BrainCircuit,
        duration: 2000,
    },
    {
        name: "Analyzing On-Chain History on Doma...",
        icon: Database, // Represents the Doma Subgraph
        duration: 3000,
    },
    {
        name: "Gauging X/Twitter Community Sentiment...",
        icon: Bird, // Represents X/Twitter
        duration: 4000,
    },
    {
        name: "Researching Live Market Trends via Perplexity...",
        icon: Globe, // Represents web research
        duration: 5000,
    },
    {
        name: "Assessing Web2 Authority & Traffic...",
        icon: Search, // Represents SEO/Web2 analysis
        duration: 3000,
    },
    {
        name: "Synthesizing Final Report...",
        icon: Share2, // Represents aggregation
        duration: 2000,
    },
];

const AnalysisLoader = () => {
    const [currentStageIndex, setCurrentStageIndex] = useState(0);

    useEffect(() => {
        if (currentStageIndex >= analysisStages.length) return;

        const currentStage = analysisStages[currentStageIndex];
        const timer = setTimeout(() => {
            setCurrentStageIndex(prevIndex => prevIndex + 1);
        }, currentStage.duration);

        return () => clearTimeout(timer);
    }, [currentStageIndex]);

    const CurrentIcon = analysisStages[currentStageIndex]?.icon || BrainCircuit;

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50 overflow-hidden font-heading">
            {/* Background Grid */}
            <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
            <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,black_70%)]"></div>

            <div className="relative flex flex-col items-center justify-center">
                {/* Central Animating Icon */}
                <div className="relative h-24 w-24 flex items-center justify-center">
                    {/* Pulsing background glow */}
                    <motion.div
                        className="absolute h-full w-full bg-purple-500/50 rounded-full blur-2xl"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStageIndex}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.5 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                            className="absolute"
                        >
                            <CurrentIcon className="h-12 w-12 text-white" strokeWidth={1.5}/>
                        </motion.div>
                    </AnimatePresence>
                </div>
                
                {/* Status Text */}
                <div className="mt-8 text-center h-8">
                     <AnimatePresence mode="wait">
                        <motion.p
                            key={currentStageIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                            className="text-white/80 text-lg md:text-xl font-medium tracking-wide"
                        >
                            {analysisStages[currentStageIndex]?.name || "Finalizing..."}
                        </motion.p>
                    </AnimatePresence>
                </div>

                {/* Progress Bar */}
                <div className="w-64 h-1 bg-white/10 rounded-full mt-6 overflow-hidden">
                    <motion.div
                        className="h-full bg-purple-500"
                        initial={{ width: "0%" }}
                        animate={{ width: `${(currentStageIndex / (analysisStages.length -1)) * 100}%` }}
                        transition={{ duration: 1.7, ease: 'easeInOut' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default AnalysisLoader;