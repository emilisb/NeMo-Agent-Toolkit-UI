import { FC } from 'react';

interface Props {
  text: string;
  icon: JSX.Element;
  onClick: () => void;
}

export const SidebarButton: FC<Props> = ({ text, icon, onClick }) => {
  return (
    <button
      className="flex w-full cursor-pointer select-none items-center gap-3 rounded-xl border border-gray-200 bg-white/60 py-2.5 px-4 text-[14px] font-medium text-gray-800 shadow-sm transition-colors duration-200 hover:bg-white/90"
      onClick={onClick}
    >
      <div className="text-gray-600">{icon}</div>
      <span>{text}</span>
    </button>
  );
};
