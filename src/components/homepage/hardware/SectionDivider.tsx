import React from 'react';

interface SectionDividerProps {
  label: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ label }) => {
  return (
    <div className="flex items-center justify-center my-8 sm:my-12">
      <div className="flex-1 h-px bg-gray-300"></div>
      <span className="mx-3 sm:mx-4 text-base sm:text-lg font-semibold text-gray-700 bg-gray-50 px-3 sm:px-4 py-1 sm:py-2 rounded-lg shadow-sm">
        {label}
      </span>
      <div className="flex-1 h-px bg-gray-300"></div>
    </div>
  );
};

export default SectionDivider;