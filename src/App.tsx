import { useState } from 'react';
import RepoList from './components/RepoList'
import useGithubSearch from './hooks/useGithubSearch'
import useDebounce from './hooks/useDebounce';

function App() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  const { repos, loading, error } = useGithubSearch(debouncedQuery.trim())

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
      <h1 style={{ marginBottom: 12 }}>GitHub Repo Explorer</h1>

      <label htmlFor="repo-search" style={{ display: "block", marginBottom: 8 }}>
        Search
      </label>

      <input
        id="repo-search"
        onChange={e => setQuery(e.target.value)}
        placeholder='Search GitHub repos'
        value={query}
        autoComplete="off"
        spellCheck={false}
        style={{
          display: "block",
          width: "100%",
          padding: 10,
          marginTop: 6,
        }}
      />

      <div style={{ marginTop: 16 }}>
        <RepoList loading={loading} error={error} repos={repos} />
      </div>
    </main>
  )
}

export default App
