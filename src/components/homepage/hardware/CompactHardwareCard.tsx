import React from 'react';

interface CompactHardwareCardProps {
  title: string;
  description: string;
  imageUrl?: string;
}

const CompactHardwareCard: React.FC<CompactHardwareCardProps> = ({ 
  title, 
  description, 
  imageUrl 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 transform transition-all duration-500 relative overflow-hidden group border border-gray-100 h-72 sm:h-80 flex flex-col hover:shadow-xl">
      <div className="absolute top-0 left-0 w-0 h-1 bg-gradient-to-r from-teal-500 to-blue-500 group-hover:w-full transition-all duration-500"></div>
      
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-3 sm:mb-4 flex-shrink-0">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-24 sm:h-32 object-cover rounded-lg shadow-md transform group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-24 sm:h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg shadow-md flex items-center justify-center">
              <span className="text-gray-500 text-xs sm:text-sm font-medium">Image Coming Soon</span>
            </div>
          )}
        </div>
        
        <div className="flex-1 flex flex-col">
          <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3 line-clamp-2 group-hover:text-gray-900 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-4 flex-1 group-hover:text-gray-700 transition-colors duration-300">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompactHardwareCard;