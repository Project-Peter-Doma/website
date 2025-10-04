"use client";

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Search, Loader, Bird, Database, Globe, Share2, Sparkles, Gavel, Bot, Layers } from 'lucide-react';
import { cn } from '@/utils';

// ==============================================================================
// 1. API Fetching Logic & Types
// ==============================================================================
type AnalysisReport = any; 

const fetchAnalysis = async (domain: string | null): Promise<AnalysisReport> => {
    if (!domain) return null;
    const apiUrl = process.env.NEXT_PUBLIC_PETER_API_URL || "https://peter-api-server.vercel.app/api/analyze";
    const res = await fetch(`${apiUrl}?domain=${domain}`);
    
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to fetch analysis from the Peter API.');
    }
    return res.json();
};

// ==============================================================================
// 2. CHILD UI COMPONENTS
// ==============================================================================

const AnimatedGridBackground = () => {
    return (
        <div className="grid-container">
            <div className="grid">
                <div className="grid-fade"></div>
                <div className="grid-lines"></div>
            </div>
        </div>
    );
};

const FinalSearchBar = ({ onSearch, isLoading }: { onSearch: (domain: string) => void, isLoading: boolean }) => {
    const [domainInput, setDomainInput] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const domainRegex = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)(\.[A-Za-z]{2,6})+$/;
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isLoading) return;
        if (domainRegex.test(domainInput)) {
            onSearch(domainInput);
        } else {
            toast.error("Please enter a valid domain name.", { description: "For example: peter.ai or google.com" });
        }
    };
    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col items-center"
        >
            <h1 className="text-5xl md:text-7xl font-bold text-center text-white mb-8 font-heading">
                P.E.T.E.R
            </h1>
            <form onSubmit={handleFormSubmit} className="relative">
                 <motion.div 
                    className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 blur-lg"
                    animate={{ 
                        scale: isFocused ? 1.05 : 1,
                        opacity: isFocused ? 0.8 : 0.4
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20}}
                 />
                <input
                    type="search"
                    placeholder="Analyze a domain..."
                    value={domainInput}
                    onChange={(e) => setDomainInput(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    disabled={isLoading}
                    className="relative w-full md:w-[500px] h-16 pl-6 pr-16 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white text-lg placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                />
                <button type="submit" disabled={isLoading} className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 bg-purple-600 rounded-full flex items-center justify-center text-white hover:bg-purple-700 transition-colors disabled:bg-neutral-600 disabled:cursor-not-allowed">
                    {isLoading ? <Loader className="animate-spin" /> : <Search />}
                </button>
            </form>
        </motion.div>
    );
};

const AnalysisLoader = ({ domain }: { domain: string }) => {
    const stages = [
        { name: "Deploying P.E.T.E.R. Agents...", icon: <Sparkles className="h-6 w-6"/> },
        { name: "Analyzing On-Chain History on Doma...", icon: <Database className="h-6 w-6"/> },
        { name: "Gauging X/Twitter Community Sentiment...", icon: <Bird className="h-6 w-6"/> },
        { name: "Researching Live Market Trends...", icon: <Globe className="h-6 w-6"/> },
        { name: "Synthesizing Final Report...", icon: <Share2 className="h-6 w-6"/> },
    ];
    const [currentStageIndex, setCurrentStageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentStageIndex(prev => (prev < stages.length - 1 ? prev + 1 : prev));
        }, 2500);
        return () => clearInterval(intervalId);
    }, [stages.length]);

    return (
        <motion.div 
            className="w-full h-full flex flex-col items-center justify-center text-white text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <h2 className="text-3xl font-bold">Analyzing</h2>
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 py-2">{domain}</h1>
            <div className="relative mt-12 w-full max-w-lg h-24">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStageIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className="absolute inset-0 flex items-center justify-center gap-4"
                    >
                        <div className="text-purple-400">{stages[currentStageIndex].icon}</div>
                        <p className="text-xl text-neutral-300">{stages[currentStageIndex].name}</p>
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

const DashboardDisplay = ({ report }: { report: AnalysisReport }) => {
    const scoreColor = (score: number) => {
        if (score >= 8) return "text-green-400";
        if (score >= 5) return "text-yellow-400";
        return "text-red-400";
    };
    
    const onChainReasoning = report.deep_dive?.on_chain_report?.reason || report.deep_dive?.on_chain_report?.on_chain_health_reasoning || "On-chain analysis was not available.";
    const analystSummary = report.deep_dive?.market_intel_report?.analyst_summary || "Market analysis was not available.";
    const comparableSales = report.deep_dive?.comps_report?.comparable_sales || [];
    const sentimentReasoning = report.deep_dive?.momentum_report?.reasoning || "Live sentiment data was not available.";
    const web2Reasoning = report.deep_dive?.web2_report?.seo_authority_reasoning || "Web2 analysis was not available.";

    return (
        <motion.div
            key="dashboard-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8"
        >
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <div className="flex flex-col items-center justify-center md:col-span-1">
                    <div className="relative h-48 w-48">
                        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" stroke="#333" strokeWidth="10" fill="transparent" />
                            <motion.circle
                                cx="50" cy="50" r="45"
                                stroke="url(#scoreGradient)"
                                strokeWidth="10" fill="transparent"
                                strokeLinecap="round"
                                initial={{ strokeDasharray: "0, 283" }}
                                animate={{ strokeDasharray: `${(report.peter_score / 100) * 283}, 283` }}
                                transition={{ duration: 1.5, ease: "circOut", delay: 0.5 }}
                            />
                            <defs>
                                <linearGradient id="scoreGradient"><stop offset="0%" stopColor="#A855F7" /><stop offset="100%" stopColor="#6366F1" /></linearGradient>
                            </defs>
                        </svg>
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-white"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                        >
                            {Math.round(report.peter_score)}
                        </motion.div>
                    </div>
                </div>
                <div className="md:col-span-2">
                    <h1 className="text-4xl md:text-6xl font-bold text-white font-heading">{report.domain_name}</h1>
                    <motion.p className="text-lg text-neutral-300 mt-4 max-w-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                        {report.executive_summary}
                    </motion.p>
                </div>
            </motion.div>

            <motion.div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4" variants={{ visible: { transition: { staggerChildren: 0.05 } } }} initial="hidden" animate="visible">
                {/* CORRECTED: Cast 'value' to 'number' to resolve the TypeScript error */}
                {Object.entries(report.scores).map(([key, value]) => (
                    <motion.div key={key} className="bg-neutral-900/50 border border-neutral-800 p-4 rounded-lg text-center" variants={{hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }}}>
                        <h3 className="text-xs font-medium text-neutral-400 capitalize">{key.replace(/_/g, ' ')}</h3>
                        <p className={`text-3xl md:text-4xl font-bold mt-2 ${scoreColor(value as number)}`}>
                            {typeof value === 'number' && (key !== 'peter_score' && key !== 'live_momentum') ? `${value}/10` : (value as React.ReactNode)}
                        </p>
                    </motion.div>
                ))}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 <motion.div className="lg:col-span-2 space-y-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                     <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-lg">
                         <h3 className="text-2xl font-bold text-white flex items-center gap-2"><Globe className="text-purple-400"/> Market Intelligence</h3>
                         <p className="text-neutral-400 mt-2">{analystSummary}</p>
                         <h4 className="font-semibold text-white mt-4">Comparable Sales:</h4>
                         <ul className="text-neutral-400 text-sm list-disc pl-5 mt-2 space-y-1">
                             {comparableSales.length > 0 ? comparableSales.map((sale: any) => (
                                 <li key={sale.domain}>{sale.domain} - <span className="font-bold text-white">${sale.price_usd.toLocaleString()}</span> ({sale.date})</li>
                             )) : <li>No direct comparable sales found in live research.</li>}
                         </ul>
                    </div>
                    <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-lg">
                        <h3 className="text-2xl font-bold text-white text-center">🚀 Actionable Ecosystem Opportunities</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <div className="bg-neutral-800/50 p-4 rounded-lg text-center hover:bg-neutral-700/50 transition-colors cursor-pointer"><Gavel className="mx-auto h-8 w-8 text-purple-400"/><h4 className="font-semibold mt-2">Price Discovery</h4><p className="text-xs text-neutral-400 mt-1">Prime candidate for a Doma auction.</p></div>
                            <div className="bg-neutral-800/50 p-4 rounded-lg text-center hover:bg-neutral-700/50 transition-colors cursor-pointer"><Layers className="mx-auto h-8 w-8 text-purple-400"/><h4 className="font-semibold mt-2">DeFi Collateral</h4><p className="text-xs text-neutral-400 mt-1">Assess risk for lending protocols.</p></div>
                            <div className="bg-neutral-800/50 p-4 rounded-lg text-center hover:bg-neutral-700/50 transition-colors cursor-pointer"><Bot className="mx-auto h-8 w-8 text-purple-400"/><h4 className="font-semibold mt-2">Set Momentum Alert</h4><p className="text-xs text-neutral-400 mt-1">Create real-time alerts for market shifts.</p></div>
                        </div>
                    </div>
                 </motion.div>
                 <div className="space-y-8">
                    <motion.div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-lg" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                        <h3 className="text-xl font-bold text-white flex items-center gap-2"><Database className="text-purple-400"/> On-Chain Health</h3>
                        <p className="text-neutral-400 mt-2 text-sm">{onChainReasoning}</p>
                    </motion.div>
                     <motion.div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-lg" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                        <h3 className="text-xl font-bold text-white flex items-center gap-2"><Bird className="text-purple-400"/> X/Twitter Sentiment</h3>
                        <p className="text-neutral-400 mt-2 text-sm">{sentimentReasoning}</p>
                    </motion.div>
                    <motion.div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-lg" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                        <h3 className="text-xl font-bold text-white flex items-center gap-2"><Search className="text-purple-400"/> Web2 Authority</h3>
                        <p className="text-neutral-400 mt-2 text-sm">{web2Reasoning}</p>
                    </motion.div>
                 </div>
            </div>
        </motion.div>
    );
};

// ==============================================================================
// 5. MAIN PAGE CONTROLLER
// ==============================================================================
const DashboardPage = () => {
    const [domainToAnalyze, setDomainToAnalyze] = useState<string | null>(null);

    const { data: analysisReport, isLoading, isError, error } = useQuery({
        queryKey: ['domainAnalysis', domainToAnalyze],
        queryFn: () => fetchAnalysis(domainToAnalyze),
        enabled: !!domainToAnalyze,
        retry: false,
    });

    useEffect(() => {
        if (isError) {
            toast.error("Analysis Failed", { description: (error as Error).message });
            setDomainToAnalyze(null);
        }
    }, [isError, error]);

    const handleSearch = (domain: string) => {
        setDomainToAnalyze(domain);
    };

    return (
        <main className="section-resource">
            <AnimatedGridBackground />
            <AnimatePresence mode="wait">
                {!domainToAnalyze ? (
                    <motion.div key="search-view" className="z-10">
                        <FinalSearchBar onSearch={handleSearch} isLoading={isLoading} />
                    </motion.div>
                ) : isLoading ? (
                    <motion.div key="loading-view">
                        <AnalysisLoader domain={domainToAnalyze} />
                    </motion.div>
                ) : analysisReport ? (
                    <DashboardDisplay report={analysisReport} />
                ) : (
                  <div className="z-10 text-white">Something went wrong. Please try another search.</div>
                )}
            </AnimatePresence>
            <style jsx global>{`
                /* Keep the same global styles from the previous correct version */
                .section-resource { justify-content: center; align-items: center; height: 100vh; width: 100vw; display: flex; position: fixed; inset: 0; background-color: #0E1416; color: white; overflow: hidden; font-family: var(--font-aeonik), sans-serif; }
                .grid-container { position: absolute; inset: 0; width: 100%; height: 100%; overflow: hidden; }
                .grid { width: 100%; height: 100vh; overflow: hidden; perspective: calc(100vh * .75); position: absolute; top: 0; left: 0; }
                .grid-fade { width: 100%; height: 100%; position: absolute; z-index: 1; background: radial-gradient(ellipse at 50% 50%, rgba(14, 20, 22, 0) 0%, rgba(14, 20, 22, 1) 80%); }
                .grid-lines { width: 100%; height: 200%; background-image: linear-gradient(rgba(154, 75, 255, 0.4) 2px, transparent 2px), linear-gradient(90deg, rgba(154, 75, 255, 0.4) 2px, transparent 2px), linear-gradient(rgba(154, 75, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(154, 75, 255, 0.2) 1px, transparent 1px); background-size: 150px 100px, 150px 100px, 30px 20px, 30px 20px; transform-origin: 50% 0; animation: play 15s linear infinite; }
                @keyframes play { 0% { transform: rotateX(45deg) translateY(-50%); } 100% { transform: rotateX(45deg) translateY(0); } }
                .search-wrapper { position: relative; }
                .search { --easing: cubic-bezier(0.4, 0, 0.2, 1); --font-size: 2rem; --color-foreground: #ddd; --color-highlight: white; --transition-time-icon: 0.2s; --transition-time-input: 0.3s 0.25s; position: relative; border-radius: 999px; border: 2px solid transparent; display: flex; transition: all var(--transition-time-icon) linear; }
                .search:not(.focused) { --transition-time-input: 0.2s 0s; }
                .search__input { background: transparent; border: none; color: #000000; font-size: var(--font-size); font-family: var(--font-aeonik); font-weight: 500; opacity: 0; outline: none; padding: 0; transition: width var(--transition-time-input) var(--easing), padding var(--transition-time-input) var(--easing), opacity var(--transition-time-input) linear; width: 0; cursor: pointer; }
                .search__input::placeholder { color: #555; opacity: 0.75; }
                .search__icon-container { height: calc(var(--font-size) + 2rem); position: relative; width: calc(var(--font-size) + 2rem); }
                .search__label, .search__submit { color: var(--color-foreground); cursor: pointer; display: block; height: 100%; padding: 0; position: absolute; width: 100%; border: none; background: none; }
                .search__label:hover, .search__label:focus, .search__label:active, .search__submit:hover, .search__submit:focus, .search__submit:active { color: var(--color-highlight); }
                .search__label { transition: transform var(--transition-time-icon) var(--easing), color 0.1s, opacity 0.3s; }
                .search__submit { display: none; outline: none; }
                .search__submit svg { transform: scale(0.5); }
                .search.focused { border-color: #555; background: white; backdrop-filter: blur(10px); padding-left: 2rem; width: calc(var(--font-size) * 12 + 4rem); }
                .search.focused .search__input { opacity: 1; width: 100%; cursor: text; }
                .search.focused .search__label { transform: scale(0); opacity: 0; }
                .search.focused .search__submit { animation: unhide var(--transition-time-icon) steps(1, end); display: block; }
                @keyframes unhide { from { height: 0; opacity: 0; } to { height: auto; opacity: 1; } }
            `}</style>
        </main>
    );
};

export default DashboardPage;