import React, { useEffect, useRef } from 'react';

interface AudioVisualizerProps {
  isActive: boolean;
  threatLevel?: 'LOW' | 'MEDIUM' | 'HIGH';
  className?: string;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  isActive,
  threatLevel = 'HIGH',
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let phase = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const numBars = 36;
      const barWidth = width / numBars - 2;

      // Color mapping
      let barColor = '#00f0ff';
      if (threatLevel === 'HIGH') barColor = '#ff5b5b';
      else if (threatLevel === 'MEDIUM') barColor = '#b3c5ff';

      for (let i = 0; i < numBars; i++) {
        const x = i * (barWidth + 2);
        
        let amplitude = 4;
        if (isActive) {
          const wave1 = Math.sin(phase + i * 0.35);
          const wave2 = Math.cos(phase * 1.5 + i * 0.15);
          const noise = (Math.sin(phase * 4 + i) + 1) * 0.5;
          const threatBoost = threatLevel === 'HIGH' ? 1.6 : 1.0;
          amplitude = Math.max(4, Math.abs(wave1 * 0.6 + wave2 * 0.4 + noise * 0.5) * (height * 0.45) * threatBoost);
        }

        const y = (height - amplitude) / 2;

        const gradient = ctx.createLinearGradient(0, y, 0, y + amplitude);
        gradient.addColorStop(0, barColor);
        gradient.addColorStop(1, `${barColor}33`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, amplitude, 3);
        ctx.fill();
      }

      phase += isActive ? 0.08 : 0.02;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive, threatLevel]);

  return (
    <div className={`w-full flex items-center justify-center ${className}`}>
      <canvas
        ref={canvasRef}
        width={320}
        height={48}
        className="w-full max-w-sm h-12"
      />
    </div>
  );
};
