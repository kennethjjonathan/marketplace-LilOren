import React, { useEffect, useState } from 'react';
import styles from './SearchBar.module.scss';
import { Search } from 'lucide-react';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';

const SearchBar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>('');
  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    if (/^\s+$/.test(value)) {
      return;
    }
    setKeyword(value);
  }

  function handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && keyword !== '') {
      router.push(`/search?search_term=${keyword}&page=1`);
    }
  }

  async function setInitialState() {
    const searchTerm: string | null = searchParams.get('search_term');
    if (typeof searchTerm === 'string') {
      setKeyword(searchTerm);
    } else {
      setKeyword('');
    }
  }

  useEffect(() => {
    setInitialState();
  }, [searchParams]);

  return (
    <div className={styles.searchInput}>
      <Search className="absolute text-primary top-[8px] left-[12px]" />
      <input
        className={styles.inputField}
        value={keyword}
        onChange={(e) => handleSearchChange(e)}
        onKeyDown={(e) => handleSearch(e)}
        placeholder="Search product"
      />
    </div>
  );
};

export default SearchBar;
