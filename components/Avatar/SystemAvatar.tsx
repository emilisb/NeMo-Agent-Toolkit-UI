import { IconPasswordUser } from '@tabler/icons-react';
import React from 'react';

export const SystemAgentAvatar = ({ height = 7, width = 7 }) => {
  return (
    <div
      className={`w-${width} h-${height} flex justify-center items-center rounded-full bg-[#c2440b] text-white`}
      title="System Agent"
    >
      <IconPasswordUser size={25} />
    </div>
  );
};
