import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

let transitionNavigate: ((path: string) => void) | null = null;

export const usePageTransition = () => {
  return {
    transitionTo: (path: string) => {
      if (transitionNavigate) {
        transitionNavigate(path);
      }
    }
  };
};

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeTransition, setActiveTransition] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleTransitionTo = (targetPath: string) => {
    // Don't transition if we're already on the target path
    if (location.pathname === targetPath || isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveTransition(true);

    // Trigger bar animations with stagger
    const bars = document.querySelectorAll('.transition-bar');
    bars.forEach((bar, i) => {
      setTimeout(() => {
        bar.classList.add('animate');
      }, i * 100);
    });

    // After bars cover screen, navigate
    setTimeout(() => {
      navigate(targetPath);
      
      // Uncover after navigation
      setTimeout(() => {
        bars.forEach(bar => bar.classList.remove('animate'));
        setActiveTransition(false);
        setIsTransitioning(false);
      }, 500);
    }, 800);
  };

  // Set the global transition function
  transitionNavigate = handleTransitionTo;

  return (
    <>
      {/* Page Transition Overlay */}
      <div 
        id="page-transition" 
        className={`page-transition ${activeTransition ? 'active' : ''}`} 
        aria-hidden="true"
      >
        <div className="bars">
          <div className="transition-bar bar1"></div>
          <div className="transition-bar bar2"></div>
          <div className="transition-bar bar3"></div>
          <div className="transition-bar bar4"></div>
        </div>
      </div>

      {children}

      <style>
        {`
          .page-transition {
            position: fixed;
            inset: 0;
            z-index: 9999;
            pointer-events: none;
          }
          
          .page-transition.active {
            pointer-events: all;
          }
          
          .page-transition .bars {
            display: flex;
            width: 100%;
            height: 100%;
          }
          
          .transition-bar {
            flex: 1 1 25%;
            transform: translateY(100%);
            transition: transform 800ms cubic-bezier(0.4,0,0.2,1);
          }
          
          /* Bar colors matching pal colors */
          .bar1 { background: hsl(22 89% 58%); } /* orange */
          .bar2 { background: hsl(253 55% 62%); } /* purple */
          .bar3 { background: hsl(111 46% 55%); } /* green */
          .bar4 { background: hsl(214 63% 57%); } /* blue */
          
          .transition-bar.animate {
            transform: translateY(0);
          }
        `}
      </style>
    </>
  );
};