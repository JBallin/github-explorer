import type { Repo } from '../types/github';
import RepoContributorsDisplay from './RepoContributorsDisplay';

type RepoDetailsModalProps = {
    repo: Repo;
    onClose: () => void;
}

const backdropStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0, 0, 0, 0.45)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 16,
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  width: 'min(720px, 100%)',
  maxHeight: '85vh',
  overflowY: 'auto',
  background: '#fff',
  borderRadius: 12,
  padding: 20,
  boxShadow: '0 18px 40px rgba(0, 0, 0, 0.25)',
};

function RepoDetailsModal({ repo, onClose }: RepoDetailsModalProps) {
    return (
        <div style={backdropStyle} onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="repo-modal-title">
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <h2 id="repo-modal-title">Repo Details</h2>
            <p><a target="_blank" rel="noreferrer" href={repo.html_url}>{repo.full_name}</a></p>
            <p>{repo.description || 'No description available.'}</p>
            <RepoContributorsDisplay repo={repo.full_name} />
            <button style={{ marginTop: 8 }} onClick={onClose}>Close</button>
            </div>
        </div>
    )
}

export default RepoDetailsModal;