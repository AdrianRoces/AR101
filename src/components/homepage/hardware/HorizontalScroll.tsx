import React, { useState, useRef, useEffect } from 'react';
import CompactHardwareCard from './CompactHardwareCard';

interface HardwareItem {
  title: string;
  description: string;
  imageUrl?: string;
}

interface HorizontalScrollProps {
  items: HardwareItem[];
  title: string;
}

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ items, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === items.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [items.length, isPaused]);

  useEffect(() => {
    if (scrollContainerRef.current && cardRefs.current[currentIndex]) {
      const container = scrollContainerRef.current;
      const activeCard = cardRefs.current[currentIndex];
      
      if (activeCard) {
        const containerWidth = container.clientWidth;
        const cardWidth = activeCard.offsetWidth;
        const cardLeft = activeCard.offsetLeft;
        const scrollPosition = cardLeft - (containerWidth / 2) + (cardWidth / 2);
        
        container.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [currentIndex]);

  const scrollToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  const scrollLeft = () => {
    setCurrentIndex(prev => prev === 0 ? items.length - 1 : prev - 1);
  };

  const scrollRight = () => {
    setCurrentIndex(prev => prev === items.length - 1 ? 0 : prev + 1);
  };

  // Fixed ref callback function
  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[index] = el;
  };

  return (
    <div className="relative">
      {title && (
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">{title}</h3>
      )}
      
      <div className="relative">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg border border-gray-200 hover:bg-gray-50 transition-all duration-300 hover:scale-110"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <svg className="w-4 h-4 sm:w-6 sm:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div
          ref={scrollContainerRef}
          className="flex space-x-4 sm:space-x-6 overflow-x-auto scrollbar-hide py-6 sm:py-8 px-4 sm:px-16 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {items.map((item, index) => (
            <div
              key={item.title}
              ref={setCardRef(index)}
              className={`flex-shrink-0 w-64 sm:w-72 transition-all duration-500 snap-center ${
                index === currentIndex 
                  ? 'scale-105 sm:scale-110 transform-gpu' 
                  : 'scale-95 opacity-80'
              }`}
            >
              <CompactHardwareCard
                title={item.title}
                description={item.description}
                imageUrl={item.imageUrl}
              />
            </div>
          ))}
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg border border-gray-200 hover:bg-gray-50 transition-all duration-300 hover:scale-110"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <svg className="w-4 h-4 sm:w-6 sm:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="flex justify-center space-x-2 sm:space-x-3 mt-6 sm:mt-8">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-teal-500 scale-125 shadow-lg' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      <div className="text-center mt-3 sm:mt-4">
        <div className="inline-flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
          <div className={`w-1 h-1 sm:w-2 sm:h-2 rounded-full ${isPaused ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
          <span>{isPaused ? 'Paused' : 'Auto-rotating'}</span>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScroll;