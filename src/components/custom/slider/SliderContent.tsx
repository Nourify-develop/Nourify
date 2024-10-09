import React, { ReactNode, CSSProperties } from 'react';

interface SliderContentProps {
  children: ReactNode;
  className?: string; // Tailwind or custom class for styling individual slide content
  style?: CSSProperties; // Inline style for individual slide content
}

export const SliderContent: React.FC<SliderContentProps> = ({ children, className, style }) => {
  return (
    <div className={`slider-content-item ${className}`} style={{ flex: '0 0 100%', ...style }}>
      {children}
    </div>
  );
};
