import { useState } from 'react';
import RepoList from './components/RepoList'
import Search from './components/Search';
import SortSelect from './components/SortSelect';
import Pagination from './components/Pagination';
import useGithubSearch from './hooks/useGithubSearch'
import useDebounce from './hooks/useDebounce';
import type { SortValue } from './types/github';

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortValue>('best-match');
  const debouncedQuery = useDebounce(query, 300).trim();
  const { repos, loading, error, totalResults } = useGithubSearch({ query: debouncedQuery, page, sort });

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setPage(1);
  };
  const handleSortChange = (value: SortValue) => {
    setSort(value);
    setPage(1);
  }
  const hasQuery = debouncedQuery.length > 0;

  return (
    <main style={{
      maxWidth: 900,
      margin: "0 auto",
      padding: 16,
      background: "#f6f8fa",
      minHeight: "100vh"
    }}>
      <h1 style={{ marginBottom: 12 }}>GitHub Repo Explorer</h1>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
        <SortSelect value={sort} onChange={handleSortChange} />
      </div>
      <Search query={query} onQueryChange={handleQueryChange} />
      <div style={{ marginTop: 16 }}>
        <RepoList loading={loading} error={error} repos={repos} />
      </div>
      {hasQuery && totalResults > 0 && (
        <Pagination
          page={page}
          totalResults={totalResults}
          onPrevious={() => setPage(prev => Math.max(1, prev - 1))}
          onNext={() => setPage(prev => prev + 1)}
          loading={loading}
        />
      )}
    </main>
  )
}

export default App
