import React from 'react';

interface TeamMemberCardProps {
  name: string;
  role: string;
  imageUrl?: string;
  animationDelay?: number;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ 
  name, 
  role, 
  imageUrl, 
  animationDelay = 0 
}) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-lg p-0 text-left transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in-up relative overflow-hidden group w-full max-w-xs mx-auto"
      style={{ 
        animationDelay: `${animationDelay}ms`
      }}
    >
      <div className="w-full aspect-square overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
            <span className="text-white font-semibold text-xs sm:text-sm">Team Member</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="text-teal-600 font-semibold mb-2 text-xs uppercase tracking-wide line-clamp-2">
          {role}
        </div>
        
        <div className="text-gray-900 font-bold text-sm leading-tight line-clamp-2">
          {name}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-teal-500 to-blue-500 group-hover:w-full transition-all duration-300"></div>
    </div>
  );
};

export default TeamMemberCard;