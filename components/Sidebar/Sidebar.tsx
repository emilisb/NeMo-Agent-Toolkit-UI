import { IconFolderPlus, IconMistOff, IconPlus } from '@tabler/icons-react';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import Search from '../Search';

import {
  CloseSidebarButton,
  OpenSidebarButton,
} from './components/OpenCloseButton';


interface Props<T> {
  isOpen: boolean;
  addItemButtonTitle: string;
  side: 'left' | 'right';
  items: T[];
  itemComponent: ReactNode;
  folderComponent: ReactNode;
  footerComponent?: ReactNode;
  searchTerm: string;
  handleSearchTerm: (_searchTerm: string) => void;
  toggleOpen: () => void;
  handleCreateItem: () => void;
  handleCreateFolder: () => void;
  handleDrop: (_e: any) => void;
}

const Sidebar = <T,>({
  isOpen,
  addItemButtonTitle,
  side,
  items,
  itemComponent,
  folderComponent,
  footerComponent,
  searchTerm,
  handleSearchTerm,
  toggleOpen,
  handleCreateItem,
  handleCreateFolder,
  handleDrop,
}: Props<T>) => {
  const { t } = useTranslation('promptbar');

  const allowDrop = (e: any) => {
    e.preventDefault();
  };

  const highlightDrop = (e: any) => {
    e.target.style.background = '#343541';
  };

  const removeHighlight = (e: any) => {
    e.target.style.background = 'none';
  };

  return isOpen ? (
    <div>
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          isOpen ? 'bg-black/30' : 'bg-transparent opacity-0'
        } md:relative md:w-64`}
        onClick={toggleOpen}
      ></div>

      <div
        className={`fixed top-0 ${side}-0 z-40 flex h-full w-[260px] flex-none flex-col text-[14px] transition-all`}
        style={{
          background: 'rgba(248,249,250,0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRight: side === 'left' ? '4px solid #f97316' : 'none',
          borderLeft: side === 'right' ? '4px solid #f97316' : 'none',
        }}
      >
        {/* Header */}
        <div className="px-4 pt-4 pb-2">
          <span className="text-xl font-bold text-gray-900">NeMo Toolkit</span>
        </div>

        {/* New chat + folder buttons */}
        <div className="flex items-center gap-2 px-3 pb-2">
          <button
            className="flex flex-1 cursor-pointer select-none items-center justify-center gap-2 rounded-full bg-[#f97316] px-4 py-2.5 text-[14px] font-semibold text-white shadow-md transition-colors duration-200 hover:bg-[#ea580c]"
            onClick={() => {
              handleCreateItem();
              handleSearchTerm('');
            }}
          >
            <IconPlus size={16} />
            {addItemButtonTitle}
          </button>

          <button
            className="flex flex-shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white/70 p-2.5 text-gray-500 transition-colors duration-200 hover:bg-gray-100"
            onClick={handleCreateFolder}
          >
            <IconFolderPlus size={18} />
          </button>
        </div>

        {/* Search */}
        <div className="px-3 pb-2">
          <Search
            placeholder={t('Search...') || ''}
            searchTerm={searchTerm}
            onSearch={handleSearchTerm}
          />
        </div>

        {/* Conversation list */}
        <div className="min-h-0 flex-grow overflow-auto px-2">
          {items?.length > 0 && (
            <div className="flex border-b border-gray-200 pb-2">
              {folderComponent}
            </div>
          )}

          {items?.length > 0 ? (
            <div
              className="pt-2"
              onDrop={handleDrop}
              onDragOver={allowDrop}
              onDragEnter={highlightDrop}
              onDragLeave={removeHighlight}
            >
              {itemComponent}
            </div>
          ) : (
            <div className="mt-10 select-none text-center text-gray-400">
              <IconMistOff className="mx-auto mb-3" size={32} />
              <span className="text-[14px] leading-normal">
                {t('No data.')}
              </span>
            </div>
          )}
        </div>

        {footerComponent}
      </div>

      <CloseSidebarButton onClick={toggleOpen} side={side} />
    </div>
  ) : (
    <OpenSidebarButton onClick={toggleOpen} side={side} />
  );
};

export default Sidebar;
