import type { Repo } from '../types/github';

type RepoCardProps = {
    repo: Repo;
}

const DESCRIPTION_CUTOFF = 60
const getDescriptionPreview = (description: string | undefined) => {
    if (description && description.length > DESCRIPTION_CUTOFF) {
        return description.slice(0, DESCRIPTION_CUTOFF) + '...'
    } else {
        return description
    }
}

function RepoCard({ repo }: RepoCardProps) {

    return (
        <li
            style={{
                border: '1px solid #ddd',
                borderRadius: 8,
                padding: 16,
                marginBottom: 12,
                background: '#fff'
            }}
        >
            <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                style={{
                    fontWeight: 600,
                    fontSize: 18,
                    textDecoration: 'none',
                    display: 'block',
                    marginBottom: 6,
                }}
            >
                {repo.full_name}
            </a> 
            
            <p style={{ margin: '6px 0', color: '#555' }}>
                {getDescriptionPreview(repo.description?.trim()) || 'No description available.'}
            </p>

            <div style={{ fontSize: 14, color: '#333' }}>
                ⭐️ {repo.stargazers_count.toLocaleString()}
            </div>
        </li>
    )
}

export default RepoCard;