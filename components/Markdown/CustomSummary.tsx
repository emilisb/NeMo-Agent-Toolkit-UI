'use client';

import {
  IconCpu,
  IconTool,
  IconLoader,
  IconChevronDown,
  IconChevronUp,
} from '@tabler/icons-react';
import { useState, useEffect } from 'react';


// Import IconLoader for the loading state

// Custom summary with additional props
export const CustomSummary = ({ children, id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [checkOpen, setCheckOpen] = useState(false);

  const shouldOpen = () => {
    const savedState = sessionStorage.getItem(`details-${id}`);
    const open = savedState === 'true';
    return open;
  };

  // Simulate an artificial delay of 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // After 1 second, change the state to stop loading
    }, 10);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <summary
      className={`
        cursor-pointer 
        font-normal 
        text-gray-600 
        hover:text-[#e11d2e] 
        dark:text-neutral-300 
        dark:hover:text-[#e11d2e]
        list-none 
        flex items-center justify-between 
        p-0 rounded
      `}
      onClick={(e) => {
        e.preventDefault();
        setCheckOpen(!checkOpen);
      }}
    >
      <div className="flex items-center flex-1 gap-2">
        {children?.toString().toLowerCase()?.includes('tool') ? (
          <IconTool size={16} className="text-[#e11d2e]" />
        ) : (
          <IconCpu size={16} className="text-[#e11d2e]" />
        )}
        <span>{children}</span>
      </div>

      {/* Right-side icons */}
      <div className="flex items-center gap-1">
        {isLoading ? (
          <IconLoader size={16} className="animate-spin text-[#e11d2e]" />
        ) : // <IconCheck size={16} className="text-[#e11d2e]" />
          null}
        {shouldOpen() ? (
          <IconChevronUp
            size={16}
            className="text-gray-500 transition-colors duration-300 dark:text-neutral-300"
          />
        ) : (
          <IconChevronDown
            size={16}
            className="text-gray-500 transition-colors duration-300 dark:text-neutral-300"
          />
        )}
      </div>
    </summary>
  );
};
