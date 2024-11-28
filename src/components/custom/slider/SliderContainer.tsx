import React, { CSSProperties, ReactNode } from 'react';

interface SliderContainerProps {
  children: ReactNode;
  className?: string; // Tailwind or custom class for styling the container
  style?: CSSProperties; // Inline style for the container
}

export const SliderContainer: React.FC<SliderContainerProps> = ({ children, className, style }) => {
  return (
    <div className={`slider-container relative ${className}`} style={{ overflow: 'hidden', position: 'relative', ...style }}>
      {children}
    </div>
  );
};
