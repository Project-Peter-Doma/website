"use client";

import React, { useState, useEffect } from 'react';
import { motion, animate, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Database, 
  Globe, 
  Search,
  ArrowLeft,
  DollarSign,
  Activity,
  Sparkles,
  LineChart,
  Waypoints,
  Zap,
  ChevronRight,
  X
} from 'lucide-react';

interface DashboardViewProps {
  report: any;
  onReset: () => void;
}

interface ModalData {
  title: string;
  icon: any;
  content: Array<{ label: string; text: string }>;
}

const AnimatedCounter = ({ value, precision = 1 }: { value: number, precision?: number }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const controls = animate(0, value, {
            duration: 2,
            ease: [0.16, 1, 0.3, 1],
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

  const scoreMetrics = [
    { key: 'on_chain_health', label: 'Chain Health', icon: Database },
    { key: 'on_chain_liquidity', label: 'Chain Liquidity', icon: LineChart },
    { key: 'seo_authority', label: 'SEO Authority', icon: Search },
    { key: 'traffic', label: 'Traffic', icon: Globe },
    { key: 'brandability', label: 'Brandability', icon: Sparkles },
    { key: 'market_trend', label: 'Market Trend', icon: TrendingUp },
    { key: 'live_momentum', label: 'Momentum', icon: Zap, maxValue: 100 },
    { key: 'predicted_liquidity', label: 'Predicted Liquidity', icon: Waypoints },
  ];

  const comparableSales = report.deep_dive?.comps_report?.comparable_sales || [];
  const peterScore = report.peter_score || 0;

  const openModal = (data: ModalData) => {
    setModalData(data);
  };

  const closeModal = () => {
    setModalData(null);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <button
            onClick={onReset}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            New Analysis
          </button>

          <div className="flex items-start justify-between gap-12 mb-8">
            <div className="flex-1">
              <h1 className="text-6xl font-semibold text-white mb-6">
                {report.domain_name}
              </h1>
              <p className="text-lg text-gray-400 leading-relaxed">
                {report.executive_summary}
              </p>
            </div>
            
            <div className="relative w-40 h-40 flex-shrink-0">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="transparent" stroke="#27272a" strokeWidth="4" />
                <motion.circle
                  cx="50" cy="50" r="45"
                  fill="transparent"
                  stroke="#8b5cf6"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "0, 283" }}
                  animate={{ strokeDasharray: `${(peterScore / 100) * 283}, 283` }}
                  transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-4xl font-semibold text-white">
                  <AnimatedCounter value={peterScore} precision={1} />
                </div>
                <div className="text-xs text-gray-500 mt-1">Peter Score</div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Metrics Grid - Clickable */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-4 gap-4 mb-16"
        >
          {scoreMetrics.map((metric, i) => {
            const score = report.scores[metric.key] || 0;
            const Icon = metric.icon;
            
            const getMetricDetails = () => {
              if (metric.key === 'on_chain_health' || metric.key === 'on_chain_liquidity') {
                return {
                  title: 'On-Chain Analysis',
                  icon: Database,
                  content: [
                    { 
                      label: 'Health Assessment', 
                      text: report.deep_dive?.on_chain_report?.on_chain_health_reasoning || "N/A" 
                    },
                    { 
                      label: 'Liquidity Analysis', 
                      text: report.deep_dive?.on_chain_report?.liquidity_reasoning || "N/A" 
                    }
                  ]
                };
              } else if (metric.key === 'seo_authority' || metric.key === 'traffic') {
                return {
                  title: 'Web2 Metrics',
                  icon: Globe,
                  content: [
                    { 
                      label: 'SEO Authority', 
                      text: report.deep_dive?.web2_report?.seo_authority_reasoning || "N/A" 
                    },
                    { 
                      label: 'Traffic Analysis', 
                      text: report.deep_dive?.web2_report?.traffic_reasoning || "N/A" 
                    }
                  ]
                };
              } else if (metric.key === 'live_momentum') {
                return {
                  title: 'Live Momentum',
                  icon: Zap,
                  content: [
                    { 
                      label: report.deep_dive?.momentum_report?.momentum_state || "Status", 
                      text: report.deep_dive?.momentum_report?.reasoning || "N/A" 
                    }
                  ]
                };
              } else if (metric.key === 'predicted_liquidity') {
                return {
                  title: 'Liquidity Insights',
                  icon: Waypoints,
                  content: [
                    { 
                      label: 'Liquidity Analysis', 
                      text: report.deep_dive?.liquidity_report?.liquidity_reasoning || "N/A" 
                    },
                    ...(report.deep_dive?.liquidity_report?.market_activity_summary ? [{
                      label: 'Market Activity',
                      text: report.deep_dive.liquidity_report.market_activity_summary
                    }] : [])
                  ]
                };
              } else {
                return {
                  title: 'Market Intelligence',
                  icon: TrendingUp,
                  content: [
                    { 
                      label: 'Brandability', 
                      text: report.deep_dive?.market_intel_report?.brandability_reasoning || "N/A" 
                    },
                    { 
                      label: 'Market Trend', 
                      text: report.deep_dive?.market_intel_report?.market_trend_reasoning || "N/A" 
                    },
                    { 
                      label: 'Analyst Summary', 
                      text: report.deep_dive?.market_intel_report?.analyst_summary || "N/A" 
                    }
                  ]
                };
              }
            };
            
            return (
              <motion.button
                key={metric.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                onClick={() => openModal(getMetricDetails())}
                className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 hover:border-purple-500 hover:bg-zinc-800/50 transition-all text-left group"
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors" />
                  <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-purple-500 transition-colors" />
                </div>
                <div className="text-4xl font-semibold text-white mb-2">
                  {(metric.maxValue === 100) ? score : score.toFixed(1)}
                </div>
                <div className="text-sm text-gray-400 mb-1">{metric.label}</div>
                <div className="text-xs text-gray-600">/ {metric.maxValue || 10}</div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* On-Chain Card */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={() => openModal({
              title: 'On-Chain Analysis',
              icon: Database,
              content: [
                { 
                  label: 'Health Assessment', 
                  text: report.deep_dive?.on_chain_report?.on_chain_health_reasoning || "N/A" 
                },
                { 
                  label: 'Liquidity Analysis', 
                  text: report.deep_dive?.on_chain_report?.liquidity_reasoning || "N/A" 
                }
              ]
            })}
            className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 hover:border-purple-500 hover:bg-zinc-800/50 transition-all text-left group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Database className="w-6 h-6 text-purple-500" />
                <h2 className="text-2xl font-semibold text-white">On-Chain</h2>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-purple-500 transition-colors" />
            </div>
            <p className="text-sm text-gray-400">View health and liquidity analysis</p>
          </motion.button>

          {/* Web2 Card */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            onClick={() => openModal({
              title: 'Web2 Metrics',
              icon: Globe,
              content: [
                { 
                  label: 'SEO Authority', 
                  text: report.deep_dive?.web2_report?.seo_authority_reasoning || "N/A" 
                },
                { 
                  label: 'Traffic Analysis', 
                  text: report.deep_dive?.web2_report?.traffic_reasoning || "N/A" 
                }
              ]
            })}
            className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 hover:border-purple-500 hover:bg-zinc-800/50 transition-all text-left group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Globe className="w-6 h-6 text-purple-500" />
                <h2 className="text-2xl font-semibold text-white">Web2</h2>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-purple-500 transition-colors" />
            </div>
            <p className="text-sm text-gray-400">View SEO and traffic insights</p>
          </motion.button>

          {/* Market Card */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => openModal({
              title: 'Market Intelligence',
              icon: TrendingUp,
              content: [
                { 
                  label: 'Brandability', 
                  text: report.deep_dive?.market_intel_report?.brandability_reasoning || "N/A" 
                },
                { 
                  label: 'Market Trend', 
                  text: report.deep_dive?.market_intel_report?.market_trend_reasoning || "N/A" 
                },
                { 
                  label: 'Analyst Summary', 
                  text: report.deep_dive?.market_intel_report?.analyst_summary || "N/A" 
                }
              ]
            })}
            className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 hover:border-purple-500 hover:bg-zinc-800/50 transition-all text-left group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-purple-500" />
                <h2 className="text-2xl font-semibold text-white">Market</h2>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-purple-500 transition-colors" />
            </div>
            <p className="text-sm text-gray-400">View market trends and brand analysis</p>
          </motion.button>
        </div>

        {/* Comparable Sales - Compact */}
        {comparableSales.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-16 bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden"
          >
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-purple-500" />
                <h3 className="text-lg font-semibold text-white">Comparable Sales</h3>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-3 gap-6">
                {comparableSales.map((sale: any, idx: number) => (
                  <div key={idx} className="border-l-2 border-purple-500 pl-4">
                    <div className="text-2xl font-semibold text-white mb-1">
                      ${sale.price_usd >= 1000000 ? `${(sale.price_usd / 1000000).toFixed(1)}M` : `${(sale.price_usd / 1000).toFixed(0)}K`}
                    </div>
                    <div className="text-sm text-gray-400">{sale.domain}</div>
                    <div className="text-xs text-gray-600">{sale.date}</div>
                  </div>
                ))}
              </div>

              {report.deep_dive?.comps_report?.analysis_summary && (
                <div className="mt-6 pt-6 border-t border-zinc-800">
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {report.deep_dive.comps_report.analysis_summary}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Modal */}
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
              className="fixed inset-0 z-50 flex items-center justify-center p-8"
            >
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-3xl w-full max-h-[80vh] overflow-hidden flex flex-col">
                {/* Modal Header */}
                <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <modalData.icon className="w-6 h-6 text-purple-500" />
                    <h2 className="text-2xl font-semibold text-white">{modalData.title}</h2>
                  </div>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 overflow-y-auto flex-1">
                  <div className="space-y-8">
                    {modalData.content.map((section, idx) => (
                      <div key={idx}>
                        <h3 className="text-sm text-purple-400 mb-3 uppercase tracking-wider font-semibold">
                          {section.label}
                        </h3>
                        <p className="text-base text-gray-300 leading-relaxed">
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