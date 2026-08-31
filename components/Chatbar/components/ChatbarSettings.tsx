import { IconFileExport, IconSettings, IconPlug } from '@tabler/icons-react';
import { useContext, useState } from 'react';
import { useTranslation } from 'next-i18next';

import HomeContext from '@/pages/api/home/home.context';
import { MCPModal } from '@/components/MCP/MCPModal';
import { SettingDialog } from '@/components/Settings/SettingDialog';

import { Import } from '../../Settings/Import';
import { SidebarButton } from '../../Sidebar/SidebarButton';
import ChatbarContext from '../Chatbar.context';

import { ClearConversations } from './ClearConversations';

export const ChatbarSettings = () => {
  const { t } = useTranslation('sidebar');
  const [isSettingDialogOpen, setIsSettingDialog] = useState<boolean>(false);
  const [isMCPModalOpen, setIsMCPModalOpen] = useState<boolean>(false);

  const {
    state: { conversations },
  } = useContext(HomeContext);

  const {
    handleClearConversations,
    handleImportConversations,
    handleExportData,
  } = useContext(ChatbarContext);

  return (
    <div className="flex flex-col items-center space-y-1.5 border-t border-gray-200 px-3 pt-2 pb-3 text-sm">
      <SidebarButton
        text="MCP"
        icon={<IconPlug size={18} />}
        onClick={() => setIsMCPModalOpen(true)}
      />

      {conversations.length > 0 ? (
        <ClearConversations onClearConversations={handleClearConversations} />
      ) : null}

      <Import onImport={handleImportConversations} />

      <SidebarButton
        text={t('Export data')}
        icon={<IconFileExport size={18} />}
        onClick={() => handleExportData()}
      />

      <SidebarButton
        text={t('Settings')}
        icon={<IconSettings size={18} />}
        onClick={() => setIsSettingDialog(true)}
      />

      <SettingDialog
        open={isSettingDialogOpen}
        onClose={() => {
          setIsSettingDialog(false);
        }}
      />

      <MCPModal
        open={isMCPModalOpen}
        onClose={() => {
          setIsMCPModalOpen(false);
        }}
      />

      {/* Avatar */}
      <div className="mt-1 flex w-full items-center px-1">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#f97316] bg-white text-[14px] font-bold text-[#f97316]">
          N
        </div>
      </div>
    </div>
  );
};
