import React from 'react';

export const GreetingLoader = () => {
  return (
    <>
      <style>{`
        @keyframes greetingPulse {
          0%, 100% { opacity: 0.2; transform: var(--dot-transform) scale(0.6); }
          50% { opacity: 1; transform: var(--dot-transform) scale(1.3); }
        }
        @keyframes greetingPop {
          0%, 100% { transform: scale(0.8); opacity: 0.6; }
          50% { transform: scale(1.2); opacity: 1; }
        }
        @keyframes greetingBar {
          from { transform: scaleY(0.3); opacity: 0.35; }
          to { transform: scaleY(1.5); opacity: 1; }
        }
      `}</style>

      <div className="flex flex-col items-center gap-3 mb-2">
        {/* Orbiting dots ring */}
        <div className="relative w-16 h-16">
          {[...Array(8)].map((_, i) => {
            const angle = i * 45;
            const rad = (angle * Math.PI) / 180;
            const cx = 32 + 24 * Math.cos(rad);
            const cy = 32 + 24 * Math.sin(rad);
            return (
              <span
                key={i}
                style={{
                  position: 'absolute',
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  left: cx - 5,
                  top: cy - 5,
                  background: `hsl(${88 + i * 6}, 100%, ${38 + i * 3}%)`,
                  ['--dot-transform' as string]: 'none',
                  animation: `greetingPulse 1.4s ease-in-out ${(i * 0.175).toFixed(3)}s infinite`,
                }}
              />
            );
          })}

          {/* Center NVIDIA green glowing circle */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 24,
              height: 24,
              marginTop: -12,
              marginLeft: -12,
              borderRadius: '50%',
              background: 'radial-gradient(circle, #76b900 30%, #4a7800 100%)',
              boxShadow: '0 0 10px 3px rgba(118,185,0,0.5)',
              animation: 'greetingPop 1.4s ease-in-out infinite',
            }}
          />
        </div>

        {/* Animated equalizer bars */}
        <div className="flex items-end gap-1" style={{ height: 24 }}>
          {[5, 9, 15, 20, 15, 9, 5].map((baseH, i) => (
            <div
              key={i}
              style={{
                width: 6,
                height: baseH,
                borderRadius: 3,
                background: '#76b900',
                opacity: 0.85,
                transformOrigin: 'bottom',
                animation: `greetingBar 0.9s ease-in-out ${(i * 0.1).toFixed(1)}s infinite alternate`,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};
