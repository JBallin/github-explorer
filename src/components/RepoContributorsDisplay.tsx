import useRepoContributors from '../hooks/useRepoContributors'

type RepoContributorsDisplayProps = {
    repo: string;
}

function RepoContributorsDisplay({ repo }: RepoContributorsDisplayProps) {
    const { contributors, loading, error } = useRepoContributors(repo);

    if (loading) {
        return (
            <section style={{ marginTop: 20 }}>
                <h3 style={{ margin: '0 0 12px 0' }}>Top contributors</h3>
                <p role="status" aria-live="polite">Loading contributors...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section style={{ marginTop: 20 }}>
                <h3 style={{ margin: '0 0 12px 0' }}>Top contributors</h3>
                <p role="alert">Error loading contributors: {error.message}</p>
            </section>
        );
    }

    if (!contributors?.length) {
        return (
            <section style={{ marginTop: 20 }}>
                <h3 style={{ margin: '0 0 12px 0' }}>Top contributors</h3>
                <p role="status" aria-live="polite">No contributors found.</p>
            </section>
        );
    }

    return (
        <section style={{ marginTop: 20 }}>
            <h3 style={{ margin: '0 0 12px 0' }}>Top contributors</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
                {contributors.map((contributor) => (
                    <li
                        key={contributor.login}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            padding: 10,
                            border: '1px solid #d0d7de',
                            borderRadius: 10,
                            background: '#f6f8fa',
                        }}
                    >
                        <img
                            src={contributor.avatar_url}
                            alt={`${contributor.login} avatar`}
                            style={{
                                width: 44,
                                height: 44,
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: '1px solid #d0d7de',
                            }}
                        />
                        <div style={{ minWidth: 0 }}>
                            <a target="_blank" rel="noreferrer" href={contributor.html_url} style={{ fontWeight: 600 }}>
                                {contributor.login}
                            </a>
                            <p style={{ margin: '4px 0 0 0', color: '#57606a', fontSize: 13 }}>
                                {contributor.contributions.toLocaleString()} contributions
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default RepoContributorsDisplay;
