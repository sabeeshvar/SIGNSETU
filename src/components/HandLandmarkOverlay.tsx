import React from 'react';

interface HandLandmarkOverlayProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  showLandmarks: boolean;
}

export const HandLandmarkOverlay: React.FC<HandLandmarkOverlayProps> = ({
  canvasRef,
  showLandmarks,
}) => {
  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full object-cover pointer-events-none z-10 transition-opacity duration-200 ${
        showLandmarks ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
};
