import type { Repo } from '../types/github';
import RepoCard from './RepoCard';

type RepoListProps = {
    loading: boolean;
    error: Error | null;
    repos: Repo[];
}

function RepoList({ repos, loading, error }: RepoListProps) {
    if (loading && repos.length === 0) {
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
            {repos.map((repo) => <RepoCard key={repo.id} repo={repo} />)}
        </ul>
    );
}

export default RepoList;