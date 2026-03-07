import { useState } from 'react';
import RepoList from './components/RepoList'
import Search from './components/Search';
import Pagination from './components/Pagination';
import useGithubSearch from './hooks/useGithubSearch'
import useDebounce from './hooks/useDebounce';

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const debouncedQuery = useDebounce(query, 300).trim();
  const { repos, loading, error, totalResults } = useGithubSearch({ query: debouncedQuery, page });

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setPage(1);
  };
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
