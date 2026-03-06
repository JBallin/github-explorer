import type { Repo } from '../types/github';

type RepoListProps = {
    loading: boolean;
    error: Error | null;
    repos: Repo[];
}

function RepoList({ repos, loading, error }: RepoListProps) {
    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error: {error.message}</p>
    }
    
    if (repos.length === 0) {
        return <p>No results</p>
    }

    return (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {repos.map(((repo) => 
                <li
                    key={repo.id}
                    style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16, marginBottom: 12 }}
                >
                    <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        style={{ fontWeight: 600, fontSize: 18, textDecoration: 'none', display: 'block' }}
                    >
                        {repo.full_name}
                    </a> 
                    
                    <p style={{ margin: '8px 0' }}>
                        {repo.description?.trim() || 'No description available.'}
                    </p>

                    <p style={{ margin: 0 }}>
                        ⭐️ {repo.stargazers_count.toLocaleString()}
                    </p>
                </li>)
            )}
        </ul>
    );
}

export default RepoList