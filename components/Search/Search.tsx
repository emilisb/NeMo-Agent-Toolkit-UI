import { IconX } from '@tabler/icons-react';
import { FC } from 'react';
import { useTranslation } from 'next-i18next';

interface Props {
  placeholder: string;
  searchTerm: string;
  onSearch: (_searchTerm: string) => void;
}
const Search: FC<Props> = ({ placeholder, searchTerm, onSearch }) => {
  const { t } = useTranslation('sidebar');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const clearSearch = () => {
    onSearch('');
  };

  return (
    <div className="relative flex items-center">
      <input
        className="w-full flex-1 rounded-xl border border-gray-200 bg-white/70 px-4 py-2.5 pr-10 text-[14px] text-gray-800 placeholder-gray-400 shadow-sm outline-none focus:border-gray-300 focus:ring-0"
        type="text"
        placeholder={t(placeholder) || ''}
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {searchTerm && (
        <IconX
          className="absolute right-4 cursor-pointer text-gray-400 hover:text-gray-600"
          size={18}
          onClick={clearSearch}
        />
      )}
    </div>
  );
};

export default Search;
