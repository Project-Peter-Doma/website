"use client";

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { SearchView, LoadingView, DashboardView } from './components';

type ViewState = 'search' | 'loading' | 'dashboard';

const fetchAnalysis = async (domain: string | null): Promise<any> => {
  if (!domain) return null;
  // Use the internal Next.js API route to avoid CORS issues and hide the external API URL
  const apiUrl = "/api/analyze";
  const res = await fetch(`${apiUrl}?domain=${domain}`);
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to fetch analysis from the API.');
  }
  return res.json();
};

export default function DashboardPage() {
  const [currentView, setCurrentView] = useState<ViewState>('search');
  const [domainToAnalyze, setDomainToAnalyze] = useState<string | null>(null);
  const [isMinLoadingTimePassed, setIsMinLoadingTimePassed] = useState(false);

  const { data: analysisReport, isError, error, isSuccess } = useQuery({
    queryKey: ['domainAnalysis', domainToAnalyze],
    queryFn: () => fetchAnalysis(domainToAnalyze),
    enabled: !!domainToAnalyze && currentView === 'loading',
    retry: false,
  });

  useEffect(() => {
    if (isError) {
      toast.error("Analysis Failed", { 
        description: error instanceof Error ? error.message : "An unknown error occurred" 
      });
      handleReset();
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess && isMinLoadingTimePassed && analysisReport) {
      setCurrentView('dashboard');
    }
  }, [isSuccess, isMinLoadingTimePassed, analysisReport]);

  const handleSearch = (domain: string) => {
    setDomainToAnalyze(domain);
    setCurrentView('loading');
    setIsMinLoadingTimePassed(false); // Reset timer state

    // Set a fixed 50-second timer for the loading screen
    setTimeout(() => {
        setIsMinLoadingTimePassed(true);
    }, 100000);
  };

  const handleReset = () => {
    setDomainToAnalyze(null);
    setCurrentView('search');
    setIsMinLoadingTimePassed(false);
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