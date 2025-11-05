import React from 'react';

interface MissionSectionProps {
  title: string;
  description: string[];
  imageUrl?: string;
}

const MissionSection: React.FC<MissionSectionProps> = ({ 
  title, 
  description, 
  imageUrl 
}) => {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
      <div className="flex-1 order-2 lg:order-1">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">{title}</h3>
        <div className="space-y-3 sm:space-y-4 text-gray-700 text-base sm:text-lg">
          {description.map((line, index) => (
            <p key={index} className="leading-relaxed">{line}</p>
          ))}
        </div>
      </div>
      
      <div className="flex-1 order-1 lg:order-2 w-full">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-48 sm:h-64 md:h-80 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg shadow-md flex items-center justify-center">
            <span className="text-gray-500 text-base sm:text-lg font-medium">Mission Image</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MissionSection;