"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Database, 
  Globe, 
  Bird, 
  Search as SearchIcon,
  ArrowLeft,
  DollarSign,
  Activity,
  Sparkles
} from 'lucide-react';

interface DashboardViewProps {
  report: any;
  onReset: () => void;
}

export default function DashboardView({ report, onReset }: DashboardViewProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const scoreColor = (score: number, maxValue: number = 10) => {
    const normalizedScore = (score / maxValue) * 10;
    if (normalizedScore >= 7) return "text-green-400";
    if (normalizedScore >= 4) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreGrade = (score: number, maxValue: number = 10) => {
    const normalizedScore = (score / maxValue) * 10;
    if (normalizedScore >= 8) return "Excellent";
    if (normalizedScore >= 6) return "Good";
    if (normalizedScore >= 4) return "Fair";
    return "Poor";
  };

  const scoreMetrics = [
    { 
      key: 'on_chain_health', 
      label: 'On-Chain Health', 
      icon: Database, 
      maxValue: 10,
      description: 'Blockchain activity and history'
    },
    { 
      key: 'liquidity', 
      label: 'Liquidity', 
      icon: Activity, 
      maxValue: 10,
      description: 'Market depth and tradability'
    },
    { 
      key: 'seo_authority', 
      label: 'SEO Authority', 
      icon: SearchIcon, 
      maxValue: 10,
      description: 'Domain authority and backlinks'
    },
    { 
      key: 'traffic', 
      label: 'Web Traffic', 
      icon: Globe, 
      maxValue: 10,
      description: 'Organic visitor volume'
    },
    { 
      key: 'brandability', 
      label: 'Brandability', 
      icon: Sparkles, 
      maxValue: 10,
      description: 'Brand potential and memorability'
    },
    { 
      key: 'market_trend', 
      label: 'Market Trend', 
      icon: TrendingUp, 
      maxValue: 10,
      description: 'Industry momentum'
    },
    { 
      key: 'live_momentum', 
      label: 'Live Momentum', 
      icon: Activity, 
      maxValue: 100,
      description: 'Real-time market activity'
    },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'onchain', label: 'On-Chain' },
    { id: 'market', label: 'Market Intel' },
    { id: 'web2', label: 'Web2 Metrics' },
  ];

  const comparableSales = report.deep_dive?.comps_report?.comparable_sales || [];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={onReset}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            New Analysis
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white font-heading mb-2">
                {report.domain_name}
              </h1>
              <p className="text-gray-400 max-w-2xl">
                {report.executive_summary}
              </p>
            </div>
            
            {/* Peter Score - Prominent Display */}
            <div className="flex-shrink-0">
              <div className="relative">
                <svg className="w-32 h-32 -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#374151"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <motion.circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="url(#scoreGradient)"
                    strokeWidth="8"
                    fill="transparent"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: "0, 352" }}
                    animate={{ strokeDasharray: `${(report.peter_score / 100) * 352}, 352` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#A855F7" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-white">{report.peter_score}</span>
                  <span className="text-xs text-gray-400 uppercase">Peter Score</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-800 mb-8">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-white border-b-2 border-purple-500'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Score Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {scoreMetrics.map((metric) => {
                const score = report.scores[metric.key] || 0;
                const Icon = metric.icon;
                
                return (
                  <div
                    key={metric.key}
                    className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-5 hover:border-purple-500/50 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <Icon className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                      <span className="text-xs text-gray-500">
                        {metric.maxValue === 100 ? '/100' : '/10'}
                      </span>
                    </div>
                    <div className="mb-1">
                      <span className={`text-3xl font-bold ${scoreColor(score, metric.maxValue)}`}>
                        {score}
                      </span>
                    </div>
                    <h3 className="text-sm font-medium text-white mb-1">
                      {metric.label}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {getScoreGrade(score, metric.maxValue)}
                    </p>
                  </div>
                );
              })}
            </motion.div>

            {/* Comparable Sales */}
            {comparableSales.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="w-5 h-5 text-purple-400" />
                  <h2 className="text-xl font-semibold text-white">Comparable Sales</h2>
                </div>
                <div className="space-y-3">
                  {comparableSales.map((sale: any, idx: number) => (
                    <div 
                      key={idx}
                      className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-colors"
                    >
                      <div>
                        <p className="font-medium text-white">{sale.domain}</p>
                        <p className="text-sm text-gray-400">{sale.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-green-400">
                          ${sale.price_usd.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        )}

        {activeTab === 'onchain' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Database className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-semibold text-white">On-Chain Analysis</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">Health Assessment</h3>
                <p className="text-gray-300 leading-relaxed">
                  {report.deep_dive?.on_chain_report?.on_chain_health_reasoning || 
                   "On-chain analysis not available - this domain may not be tokenized on Doma Protocol."}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">Liquidity Assessment</h3>
                <p className="text-gray-300 leading-relaxed">
                  {report.deep_dive?.on_chain_report?.liquidity_reasoning || 
                   "Liquidity data not available."}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'market' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-semibold text-white">Market Intelligence</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {report.deep_dive?.market_intel_report?.analyst_summary || 
                 "Market intelligence analysis is currently unavailable."}
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Bird className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-semibold text-white">X/Twitter Sentiment</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {report.deep_dive?.momentum_report?.reasoning || 
                 "Live sentiment data unavailable for this TLD."}
              </p>
            </div>
          </motion.div>
        )}

        {activeTab === 'web2' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <SearchIcon className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-semibold text-white">Web2 Authority & Traffic</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">SEO Authority Analysis</h3>
                <p className="text-gray-300 leading-relaxed">
                  {report.deep_dive?.web2_report?.seo_authority_reasoning || 
                   "SEO authority data not available."}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">Traffic Analysis</h3>
                <p className="text-gray-300 leading-relaxed">
                  {report.deep_dive?.web2_report?.traffic_reasoning || 
                   "Traffic data not available."}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}