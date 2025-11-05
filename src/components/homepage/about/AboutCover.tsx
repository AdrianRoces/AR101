import React from 'react';

interface AboutCoverProps {
  title: string;
  description: string[];
  backgroundImage?: string;
}

const AboutCover: React.FC<AboutCoverProps> = ({ 
  title, 
  description, 
  backgroundImage 
}) => {
  return (
    <div className="relative w-full h-64 sm:h-80 md:h-96 bg-cover bg-center">
      {backgroundImage ? (
        <img 
          src={backgroundImage} 
          alt="About Cover"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-blue-700"></div>
      )}
      
      <div className="absolute inset-0 bg-black opacity-40"></div>
      
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 sm:p-8 md:p-12 max-w-4xl w-full mx-auto shadow-2xl">
          <div className="text-center text-white">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 animate-fade-in-up drop-shadow-lg">
              {title}
            </h2>
            <div className="max-w-2xl mx-auto space-y-3">
              {description.map((line, index) => (
                <p 
                  key={index}
                  className="text-sm sm:text-base md:text-lg animate-fade-in-up drop-shadow-md leading-relaxed"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCover;