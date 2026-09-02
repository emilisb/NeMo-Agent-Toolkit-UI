import React, { useEffect, useRef, useState } from 'react';
const DELIBERATE_SYNTAX_ERROR = {{{;


export const GreetingAnimation = () => {
  const [burst, setBurst] = useState(false);
  const [ripples, setRipples] = useState<number[]>([]);
  const rippleId = useRef(0);
  const burstTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleTyping = () => {
      // Trigger burst glow
      setBurst(true);
      if (burstTimeout.current) clearTimeout(burstTimeout.current);
      burstTimeout.current = setTimeout(() => setBurst(false), 400);

      // Add a short-lived ripple
      const id = rippleId.current++;
      setRipples((prev) => [...prev, id]);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r !== id)), 600);
    };

    window.addEventListener('chat-input-change', handleTyping);
    return () => {
      window.removeEventListener('chat-input-change', handleTyping);
      if (burstTimeout.current) clearTimeout(burstTimeout.current);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center w-24 h-24 mx-auto mb-2">
      {/* Outer pulsing ring */}
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#76b900]/20 animate-ping" />

      {/* Middle ring */}
      <span className="absolute inline-flex h-16 w-16 rounded-full bg-[#76b900]/30 animate-pulse" />

      {/* Keystroke ripples */}
      {ripples.map((id) => (
        <span
          key={id}
          className="absolute inline-flex rounded-full border-2 border-[#76b900]/70"
          style={{
            width: '100%',
            height: '100%',
            animation: 'ripple-out 0.6s ease-out forwards',
          }}
        />
      ))}

      {/* Orbiting dots */}
      <span className="absolute w-full h-full animate-[spin_3s_linear_infinite]">
        <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#76b900]" />
      </span>
      <span className="absolute w-full h-full animate-[spin_3s_linear_infinite_reverse] [animation-delay:-1.5s]">
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-orange-400" />
      </span>
      <span className="absolute w-16 h-16 animate-[spin_2s_linear_infinite] [animation-delay:-0.5s]">
        <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#76b900]/70" />
      </span>

      {/* Core glowing orb — brightens on keystrokes */}
      <div
        className={`relative z-10 w-10 h-10 rounded-full bg-gradient-to-br from-[#76b900] to-[#4a7a00] transition-all duration-150 animate-pulse ${
          burst
            ? 'scale-125 shadow-[0_0_32px_8px_rgba(118,185,0,0.9)]'
            : 'scale-100 shadow-[0_0_20px_rgba(118,185,0,0.6)]'
        }`}
      />

      <style>{`
        @keyframes ripple-out {
          0%   { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.9); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
