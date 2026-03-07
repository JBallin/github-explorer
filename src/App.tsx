import { useState } from 'react';
import RepoList from './components/RepoList'
import Search from './components/Search';
import useGithubSearch from './hooks/useGithubSearch'
import useDebounce from './hooks/useDebounce';

function App() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const { repos, loading, error } = useGithubSearch(debouncedQuery.trim())

  return (
    <main style={{
      maxWidth: 900,
      margin: "0 auto",
      padding: 16,
      background: "#f6f8fa",
      minHeight: "100vh"
    }}>
      <h1 style={{ marginBottom: 12 }}>GitHub Repo Explorer</h1>
      <Search query={query} onQueryChange={setQuery} />
      <div style={{ marginTop: 16 }}>
        <RepoList loading={loading} error={error} repos={repos} />
      </div>
    </main>
  )
}

export default App
