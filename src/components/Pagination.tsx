import { PAGE_SIZE, RESULTS_LIMIT } from "../api/github";

type PaginationProps = {
    page: number;
    totalResults: number;
    onPrevious: () => void;
    onNext: () => void;
    loading: boolean;
}

const getButtonStyle = (disabled: boolean) => {
    return {
        padding: '6px 12px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? .6 : 1
    }
}

function Pagination({ page, totalResults, onPrevious, onNext, loading } : PaginationProps) {
    const totalPages = Math.min(Math.ceil(totalResults / PAGE_SIZE), Math.ceil(RESULTS_LIMIT / PAGE_SIZE));
    const prevDisabled = page === 1 || loading;
    const nextDisabled = page >= totalPages || loading;

    return (
        <div
            role="navigation"
            aria-label="Pagination"
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginTop: 16,
            }}
        >
            <span role="status" aria-live="polite">
                Page {page} of {totalPages || 1}
            </span>
            <button
                onClick={onPrevious}
                disabled={prevDisabled}
                style={getButtonStyle(prevDisabled)}
                aria-label="Go to previous page"
            >
                Previous
            </button>
            <button
                onClick={onNext}
                disabled={nextDisabled}
                style={getButtonStyle(nextDisabled)}
                aria-label="Go to next page"
            >
                Next
            </button>
            <span>Total results: {totalResults.toLocaleString()}</span>
            {loading && (
                <span role="status" aria-live="polite" style={{ marginLeft: 8 }}>
                    Loading...
                </span>
            )}
        </div>
    )
}

export default Pagination;