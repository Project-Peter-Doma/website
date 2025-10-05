// src/app/(main)/dashboard/components/DashboardView.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { motion, animate, AnimatePresence } from 'framer-motion';
import { SmartAlerts } from '@/components/ui/smart-alerts';
import { 
  TrendingUp, 
  Database, 
  Globe, 
  Search,
  ArrowLeft,
  DollarSign,
  Sparkles,
  LineChart,
  Waypoints,
  Zap,
  ChevronRight,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Define props for the component
interface DashboardViewProps {
  report: any; // The full aggregated report from our API
  onReset: () => void;
}

// Define the structure for our pop-up modal data
interface ModalData {
  title: string;
  icon: React.ElementType; // Use React.ElementType for Lucide icons
  content: Array<{ label: string; text: string }>;
}

// Reusable animated counter component for numbers
const AnimatedCounter = ({ value, precision = 1 }: { value: number, precision?: number }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const controls = animate(0, value, {
            duration: 2,
            ease: [0.16, 1, 0.3, 1], // Ease-out expo for a nice effect
            onUpdate: (latest: number) => {
                setCount(parseFloat(latest.toFixed(precision)));
            },
        });
        return () => controls.stop();
    }, [value, precision]);

    return <span>{count.toFixed(precision)}</span>;
};

export default function DashboardView({ report, onReset }: DashboardViewProps) {
  const [modalData, setModalData] = useState<ModalData | null>(null);

  // Define the metrics to be displayed in the clickable grid
  const scoreMetrics = [
    { key: 'on_chain_health', label: 'Chain Health', icon: Database, maxValue: 10 },
    { key: 'on_chain_liquidity', label: 'Chain Liquidity', icon: LineChart, maxValue: 10 },
    { key: 'seo_authority', label: 'SEO Authority', icon: Search, maxValue: 10 },
    { key: 'traffic', label: 'Traffic', icon: Globe, maxValue: 10 },
    { key: 'brandability', label: 'Brandability', icon: Sparkles, maxValue: 10 },
    { key: 'market_trend', label: 'Market Trend', icon: TrendingUp, maxValue: 10 },
    { key: 'live_momentum', label: 'Momentum', icon: Zap, maxValue: 10 },
    { key: 'predicted_liquidity', label: 'Predicted Liquidity', icon: Waypoints, maxValue: 10 },
  ];

  // Safely access nested data from the report
  const peterScore = report.final_summary?.peter_score || report.peter_score || 0;
  const executiveSummary = report.final_summary?.executive_summary || report.executive_summary || "No summary available.";
  const domainName = report.final_summary?.domain_name || report.domain_name || "N/A";
  const comparableSales = report.deep_dive?.comps_report?.comparable_sales || [];

  const openModal = (data: ModalData) => setModalData(data);
  const closeModal = () => setModalData(null);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-12">
            <button
              onClick={onReset}
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              New Analysis
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-start justify-between gap-12">
            <div className="flex-1">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tighter">
                {domainName}
              </h1>
              <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl">
                {executiveSummary}
              </p>
            </div>
            
            <div className="relative w-40 h-40 flex-shrink-0">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="transparent" stroke="#27272a" strokeWidth="6" />
                <motion.circle
                  cx="50" cy="50" r="45"
                  fill="transparent"
                  stroke="url(#peter-gradient)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "0, 283" }}
                  animate={{ strokeDasharray: `${(peterScore / 100) * 283}, 283` }}
                  transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                />
                <defs>
                    <linearGradient id="peter-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-4xl font-extrabold text-white">
                  <AnimatedCounter value={peterScore} precision={1} />
                </div>
                <div className="text-xs text-zinc-500 mt-1 font-medium tracking-wider uppercase">Peter Score</div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Clickable Metrics Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {scoreMetrics.map((metric) => {
            const score = report.scores[metric.key] || 0;
            const Icon = metric.icon;
            
            const getMetricDetails = (): ModalData => {
                if (['on_chain_health', 'on_chain_liquidity'].includes(metric.key)) {
                    return {
                        title: 'On-Chain Intelligence', icon: Database,
                        content: [
                            { label: 'Health Assessment', text: report.deep_dive?.on_chain_report?.on_chain_health_reasoning || "No data available." },
                            { label: 'Liquidity Analysis', text: report.deep_dive?.on_chain_report?.liquidity_reasoning || "No data available." }
                        ]
                    };
                }
                if (['seo_authority', 'traffic'].includes(metric.key)) {
                    return {
                        title: 'Web2 Authority', icon: Globe,
                        content: [
                            { label: 'SEO Authority', text: report.deep_dive?.web2_report?.seo_authority_reasoning || "No data available." },
                            { label: 'Traffic Analysis', text: report.deep_dive?.web2_report?.traffic_reasoning || "No data available." }
                        ]
                    };
                }
                if (['brandability', 'market_trend'].includes(metric.key)) {
                     return {
                        title: 'Market Intelligence', icon: TrendingUp,
                        content: [
                            { label: 'Brandability', text: report.deep_dive?.market_intel_report?.brandability_reasoning || "No data available." },
                            { label: 'Market Trend', text: report.deep_dive?.market_intel_report?.market_trend_reasoning || "No data available." }
                        ]
                    };
                }
                if (metric.key === 'live_momentum') {
                    return {
                        title: 'Live Momentum', icon: Zap,
                        content: [{ label: report.deep_dive?.momentum_report?.momentum_state || "Status", text: report.deep_dive?.momentum_report?.reasoning || "No data available." }]
                    };
                }
                if (metric.key === 'predicted_liquidity') {
                    return {
                        title: 'Liquidity Prediction', icon: Waypoints,
                        content: [
                            { label: 'Liquidity Prediction', text: report.deep_dive?.liquidity_report?.liquidity_reasoning || "No data available." },
                            { label: 'Market Activity Summary', text: report.deep_dive?.liquidity_report?.market_activity_summary || "No market activity found." }
                        ]
                    };
                }
                return { title: metric.label, icon: Icon, content: [{ label: 'Summary', text: 'Detailed analysis is not available for this metric.' }] };
            };
            
            return (
              <motion.button
                key={metric.key}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                onClick={() => openModal(getMetricDetails())}
                className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 sm:p-6 hover:border-purple-500 hover:bg-zinc-800/50 transition-all text-left group"
              >
                <div className="flex items-start justify-between mb-4">
                  <Icon className="w-5 h-5 text-zinc-400 group-hover:text-purple-400 transition-colors" />
                  <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-purple-400 transition-colors" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  {(metric.maxValue === 100) ? score.toFixed(0) : score.toFixed(1)}
                </div>
                <div className="text-sm text-zinc-400 mb-1">{metric.label}</div>
                <div className="text-xs text-zinc-600">/ {metric.maxValue || 10}</div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* --- REVISED BOTTOM SECTION: Main Content + Smart Alerts --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-zinc-900 border border-zinc-800 rounded-lg"
                >
                    <div className="p-6 border-b border-zinc-800 flex items-center gap-3">
                        <DollarSign className="w-5 h-5 text-purple-400" />
                        <h3 className="text-lg font-semibold text-white">Comparable Sales</h3>
                    </div>
                    <div className="p-6">
                        {comparableSales.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    {comparableSales.map((sale: any, idx: number) => (
                                    <div key={idx} className="border-l-2 border-purple-500 pl-4">
                                        <div className="text-2xl font-bold text-white mb-1">
                                            ${sale.price_usd.toLocaleString()}
                                        </div>
                                        <div className="text-sm text-zinc-400">{sale.domain}</div>
                                        <div className="text-xs text-zinc-600">{sale.date}</div>
                                    </div>
                                    ))}
                                </div>
                                {report.deep_dive?.comps_report?.analysis_summary && (
                                    <div className="mt-6 pt-6 border-t border-zinc-800">
                                    <p className="text-sm text-zinc-400 leading-relaxed italic">
                                        {report.deep_dive.comps_report.analysis_summary}
                                    </p>
                                    </div>
                                )}
                            </>
                        ) : (
                            <p className="text-sm text-zinc-500 text-center py-8">No comparable sales data found by the agent.</p>
                        )}
                    </div>
                </motion.div>
            </div>
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="lg:col-span-1"
            >
                <SmartAlerts domain={domainName} />
            </motion.div>
        </div>
      </div>

      {/* --- MODAL --- */}
      <AnimatePresence>
        {modalData && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col shadow-2xl shadow-purple-900/10">
                <div className="p-6 border-b border-zinc-800 flex items-center justify-between flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <modalData.icon className="w-6 h-6 text-purple-400" />
                    <h2 className="text-xl font-semibold text-white">{modalData.title}</h2>
                  </div>
                  <button onClick={closeModal} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
                    <X className="w-5 h-5 text-zinc-400" />
                  </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1">
                  <div className="space-y-8">
                    {modalData.content.map((section, idx) => (
                      <div key={idx}>
                        <h3 className="text-sm text-purple-400 mb-2 uppercase tracking-wider font-semibold">
                          {section.label}
                        </h3>
                        <p className="text-base text-zinc-300 leading-relaxed">
                          {section.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}