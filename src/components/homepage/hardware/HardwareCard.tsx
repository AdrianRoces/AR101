import React from 'react';

interface HardwareCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  imagePosition?: 'left' | 'right';
}

const HardwareCard: React.FC<HardwareCardProps> = ({ 
  title, 
  description, 
  imageUrl, 
  imagePosition = 'right' 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-7 mb-6 transform hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-0 h-1 bg-teal-500 group-hover:w-full transition-all duration-300"></div>
      
      <div className={`flex flex-col ${imagePosition === 'right' ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-4 sm:gap-6 lg:gap-7`}>
        <div className="flex-1 w-full">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">{title}</h3>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">{description}</p>
        </div>
        
        <div className="flex-1 w-full">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-lg shadow-md transform group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-48 sm:h-56 lg:h-64 bg-gray-200 rounded-lg shadow-md flex items-center justify-center">
              <span className="text-gray-500 text-sm sm:text-base">Image Coming Soon</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HardwareCard;