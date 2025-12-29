import React from 'react';

interface OrganicShapeProps {
  className?: string;
  delay?: string;
  color?: string;
}

export const OrganicShape: React.FC<OrganicShapeProps> = ({ className = "", delay = "0s", color = "#EBE8E0" }) => {
  return (
    <div className={`absolute -z-10 opacity-60 mix-blend-multiply filter blur-3xl animate-float ${className}`} style={{ animationDelay: delay }}>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path fill={color} d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.2,-19.2,95.8,-5.2C93.4,8.9,81.8,22.1,70.8,33.5C59.8,44.9,49.4,54.5,37.6,62.1C25.8,69.7,12.6,75.3,-0.3,75.8C-13.2,76.3,-26.1,71.7,-38.4,64.6C-50.7,57.5,-62.4,47.9,-70.8,36.2C-79.2,24.5,-84.3,10.7,-82.9,-2.5C-81.5,-15.7,-73.6,-28.3,-64.1,-39.2C-54.6,-50.1,-43.5,-59.3,-31.4,-67.6C-19.3,-75.9,-6.2,-83.3,4.2,-90.6L14.6,-97.9Z" transform="translate(100 100)" />
      </svg>
    </div>
  );
};