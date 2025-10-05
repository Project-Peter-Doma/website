"use client";

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { SearchView, LoadingView, DashboardView } from './components';

type ViewState = 'search' | 'loading' | 'dashboard';

const fetchAnalysis = async (domain: string | null): Promise<any> => {
  if (!domain) return null;
  const apiUrl = process.env.NEXT_PUBLIC_PETER_API_URL || "https://peter-api-server.vercel.app/api/analyze";
  const res = await fetch(`${apiUrl}?domain=${domain}`);
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to fetch analysis from the Peter API.');
  }
  return res.json();
};

export default function DashboardPage() {
  const [currentView, setCurrentView] = useState<ViewState>('search');
  const [domainToAnalyze, setDomainToAnalyze] = useState<string | null>(null);

  const { data: analysisReport, isLoading, isError, error } = useQuery({
    queryKey: ['domainAnalysis', domainToAnalyze],
    queryFn: () => fetchAnalysis(domainToAnalyze),
    enabled: !!domainToAnalyze && currentView === 'loading',
    retry: false,
  });

  React.useEffect(() => {
    if (isError) {
      toast.error("Analysis Failed", { 
        description: error instanceof Error ? error.message : "Unknown error occurred" 
      });
      handleReset();
    }
  }, [isError, error]);

  React.useEffect(() => {
    if (analysisReport && currentView === 'loading') {
      // Small delay to show the final loading state
      setTimeout(() => {
        setCurrentView('dashboard');
      }, 1000);
    }
  }, [analysisReport, currentView]);

  const handleSearch = (domain: string) => {
    setDomainToAnalyze(domain);
    setCurrentView('loading');
  };

  const handleReset = () => {
    setDomainToAnalyze(null);
    setCurrentView('search');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {currentView === 'search' && (
        <SearchView onSearch={handleSearch} />
      )}
      
      {currentView === 'loading' && domainToAnalyze && (
        <LoadingView domain={domainToAnalyze} />
      )}
      
      {currentView === 'dashboard' && analysisReport && (
        <DashboardView report={analysisReport} onReset={handleReset} />
      )}
    </div>
  );
}