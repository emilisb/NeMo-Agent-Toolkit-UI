import React from 'react';

export const GreetingAnimation = () => {
  return (
    <div className="relative flex items-center justify-center w-24 h-24 mx-auto mb-2">
      {/* Outer pulsing ring */}
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#76b900]/20 animate-ping" />

      {/* Middle ring */}
      <span className="absolute inline-flex h-16 w-16 rounded-full bg-[#76b900]/30 animate-pulse" />

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

      {/* Core glowing orb */}
      <div className="relative z-10 w-10 h-10 rounded-full bg-gradient-to-br from-[#76b900] to-[#4a7a00] shadow-[0_0_20px_rgba(118,185,0,0.6)] animate-pulse" />
    </div>
  );
};
