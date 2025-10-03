"use client";

import React, { useEffect, useRef, useState } from 'react';

// Define the props for our component
export type UnicornSceneProps = {
  projectId: string;
  className?: string;
};

// Define the types for the UnicornStudio library on the window object
declare global {
  interface Window {
    UnicornStudio?: {
      addScene: (config: any) => Promise<any>;
      destroy: () => void;
    };
  }
}

const UnicornBackground = ({ projectId, className = "" }: UnicornSceneProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{ destroy: () => void } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Function to load the Unicorn Studio script if it's not already present
    const initializeScript = (callback: () => void) => {
      const version = '1.4.32';
      const scriptSrc = `https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v${version}/dist/unicornStudio.umd.js`;
      
      const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);

      if (existingScript) {
        if (window.UnicornStudio) {
          callback();
        } else {
          existingScript.addEventListener('load', callback, { once: true });
        }
        return;
      }

      const script = document.createElement('script');
      script.src = scriptSrc;
      script.async = true;
      script.onload = () => callback();
      script.onerror = () => setError('Failed to load UnicornStudio script');
      document.body.appendChild(script);
    };

    // Function to initialize the scene once the script is loaded
    const initializeScene = async () => {
      if (!elementRef.current || !window.UnicornStudio?.addScene) {
        setTimeout(initializeScene, 100); // Retry if script not ready
        return;
      }

      try {
        const scene = await window.UnicornStudio.addScene({
          elementId: elementRef.current.id,
          projectId: projectId,
          lazyLoad: false,
          scale: 1,
          dpi: 1.5,
        });
        sceneRef.current = scene;
      } catch (err) {
        console.error("Unicorn Studio Error:", err);
        setError("Failed to initialize Unicorn Studio scene.");
      }
    };

    initializeScript(() => {
      void initializeScene();
    });

    // Cleanup function to destroy the scene on component unmount
    return () => {
      if (sceneRef.current?.destroy) {
        sceneRef.current.destroy();
        sceneRef.current = null;
      }
    };
  }, [projectId]);

  // Use a unique ID for the container div
  const containerId = `unicorn-container-${React.useId()}`;

  return (
    <div
      ref={elementRef}
      id={containerId}
      className={`fixed inset-0 z-[-1] ${className}`}
      role="img"
      aria-label="Dynamic background animation"
    >
      {error && <div className="text-red-500 absolute top-4 left-4">{error}</div>}
    </div>
  );
};

export default UnicornBackground;