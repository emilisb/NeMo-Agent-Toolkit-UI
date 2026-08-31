'use client';

import React, { useEffect, useRef } from 'react';

export const BrainWaveAnimation = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const width = svg.clientWidth || 600;
    const height = 100;
    const points = 300;

    let offset = 0;
    let animId: number;

    const primaryPath = svg.querySelector('#wave-primary') as SVGPathElement;
    const ghostPath = svg.querySelector('#wave-ghost') as SVGPathElement;
    const gradientEl = svg.querySelector('#waveGradient') as SVGLinearGradientElement;

    const buildPath = (phaseShift: number, amplitude: number) => {
      const step = width / points;
      let d = '';
      for (let i = 0; i <= points; i++) {
        const x = i * step;
        const y =
          height / 2 +
          amplitude * Math.sin((i / points) * Math.PI * 10 + phaseShift);
        d += i === 0 ? `M ${x},${y}` : ` L ${x},${y}`;
      }
      return d;
    };

    const animate = () => {
      offset += 0.04;
      if (primaryPath) primaryPath.setAttribute('d', buildPath(offset, 28));
      if (ghostPath) ghostPath.setAttribute('d', buildPath(offset + 0.6, 22));
      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div style={{ width: '100%', maxWidth: 600, margin: '0 auto 8px' }}>
      <svg
        ref={svgRef}
        width="100%"
        height="100"
        viewBox="0 0 600 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#76b900" />
            <stop offset="50%" stopColor="#3ecfcf" />
            <stop offset="100%" stopColor="#00c6ff" />
          </linearGradient>
          <linearGradient id="waveGhostGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#76b900" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#3ecfcf" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#00c6ff" stopOpacity="0.25" />
          </linearGradient>
        </defs>
        {/* Ghost / shadow wave */}
        <path
          id="wave-ghost"
          fill="none"
          stroke="url(#waveGhostGradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Primary wave */}
        <path
          id="wave-primary"
          fill="none"
          stroke="url(#waveGradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
