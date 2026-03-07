import { PAGE_SIZE } from "../api/github";

type PaginationProps = {
    page: number;
    totalResults: number;
    onPrevious: () => void;
    onNext: () => void;
    loading: boolean;
}

function Pagination({ page, totalResults, onPrevious, onNext, loading } : PaginationProps) {
    const totalPages = Math.ceil(totalResults / PAGE_SIZE);
    const prevDisabled = page === 1 || loading;
    const nextDisabled = page >= totalPages || loading;

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginTop: 16,
            }}
        >
            <span>Page {page} of {totalPages || 1}</span>
            <button
                onClick={onPrevious}
                disabled={prevDisabled}
                style={{
                    padding: '6px 12px',
                    cursor: prevDisabled ? 'not-allowed' : 'pointer',
                    opacity: prevDisabled ? .6 : 1
                }}
            >
                Previous
            </button>
            <button
                onClick={onNext}
                disabled={nextDisabled}
                style={{
                    padding: '6px 12px',
                    cursor: nextDisabled ? 'not-allowed' : 'pointer',
                    opacity: nextDisabled ? .6 : 1
                }}
            >
                Next
            </button>
            {loading && <span style={{ marginLeft: 8 }}>Loading...</span>}
        </div>
    )
}

export default Pagination;