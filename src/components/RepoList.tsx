import type { Repo } from '../types/github';
import RepoCard from './RepoCard';

type RepoListProps = {
    loading: boolean;
    error: Error | null;
    repos: Repo[];
    onRepoSelect: (repoName: string) => void;
}

function RepoList({ repos, loading, error, onRepoSelect }: RepoListProps) {
    if (loading && repos.length === 0) {
        return (
            <p role="status" aria-live="polite">
                Loading...
            </p>
        );
    }

    if (error) {
        return (
            <p role="alert" aria-live="assertive">
                Error: {error.message}
            </p>
        );
    }
    
    if (repos.length === 0) {
        return (
            <p role="status" aria-live="polite">
                Start typing to search
            </p>
        );
    }

    return (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {repos.map((repo) => <RepoCard key={repo.id} repo={repo} onSelect={onRepoSelect} />)}
        </ul>
    );
}

export default RepoList;