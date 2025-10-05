"use client";

import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface SearchViewProps {
  onSearch: (domain: string) => void;
}

export default function SearchView({ onSearch }: SearchViewProps) {
  const [domain, setDomain] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!domain.trim()) {
      toast.error("Please enter a domain name", {
        description: "The search field cannot be empty"
      });
      return;
    }

    const domainRegex = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)(\.[A-Za-z]{2,6})+$/;
    
    if (!domainRegex.test(domain)) {
      toast.error("Invalid domain format", {
        description: "Please enter a valid domain name (e.g., crypto.ai, web3.io)"
      });
      return;
    }

    onSearch(domain);
  };

  const examples = ['crypto.ai', 'defi.xyz', 'web3.io', 'nft.art'];

  return (
    <div className="section-resource">
      <div className="grid-container">
        <div className="grid">
          <div className="grid-fade"></div>
          <div className="grid-lines"></div>
        </div>
      </div>

      <div className="content-wrapper">
        {/* Logo & Title */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="header-section"
        >
          <div className="logo-container">
            <Sparkles className="w-12 h-12 text-purple-400" />
            <h1 className="text-7xl font-bold text-white font-heading">
              P.E.T.E.R
            </h1>
          </div>
          <p className="subtitle">
            Predictive Evaluation Tool for Ecosystem Research
          </p>
          <p className="tagline">
            AI-driven intelligence for on-chain domains
          </p>
        </motion.div>

        {/* Search Box */}
        <motion.form
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="search-box"
        >
          <input 
            className="search-txt" 
            type="text" 
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Analyze a domain..."
          />
          <button type="submit" className="search-btn">
            <Search className="w-5 h-5" />
          </button>
        </motion.form>

        {/* Examples */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="examples-section"
        >
          <p className="examples-label">Try these examples:</p>
          <div className="examples-grid">
            {examples.map((example) => (
              <button
                key={example}
                onClick={() => setDomain(example)}
                className="example-btn"
              >
                {example}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        /* Grid Background Animation */
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

        /* Content Layout */
        .content-wrapper {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1200px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3rem;
          padding: 2rem;
        }

        .header-section {
          text-align: center;
          margin-bottom: 2rem;
        }

        .logo-container {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .subtitle {
          font-size: 1.25rem;
          color: #9ca3af;
          max-width: 42rem;
          margin: 0 auto 0.5rem;
        }

        .tagline {
          font-size: 0.875rem;
          color: #6b7280;
        }

        /* Centered Search Box */
        .search-box {
          background: #2F3640;
          height: 40px;
          border-radius: 40px;
          padding: 10px;
          transition: 0.4s;
          display: flex;
          align-items: center;
        }
        
        .search-btn {
          color: #9A4BFF;
          float: right;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #2F3640;
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          transition: 0.4s;
          border: none;
          cursor: pointer;
          flex-shrink: 0;
        }
        
        .search-txt {
          border: none;
          background: none;
          outline: none;
          float: left;
          padding: 0;
          color: #fff;
          font-size: 16px;
          transition: 0.4s;
          line-height: 40px;
          width: 0px;
        }
        
        .search-box:hover > .search-txt {
          width: 240px;
          padding: 0 6px;
        }
        
        .search-box:hover > .search-btn {
          background: white;
          color: #9A4BFF;
        }
        
        .search-txt::placeholder {
          color: #999;
        }

        /* Examples Section */
        .examples-section {
          text-align: center;
          margin-top: 1rem;
        }

        .examples-label {
          color: #6b7280;
          font-size: 0.875rem;
          margin-bottom: 0.75rem;
        }

        .examples-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.5rem;
        }

        .example-btn {
          padding: 0.5rem 1rem;
          background: rgba(31, 41, 55, 0.5);
          border: 1px solid #374151;
          border-radius: 0.5rem;
          color: #d1d5db;
          font-size: 0.875rem;
          transition: all 0.2s;
          cursor: pointer;
        }

        .example-btn:hover {
          background: rgba(55, 65, 81, 0.5);
        }
      `}</style>
    </div>
  );
}