import type { OrderValue, SortValue } from '../types/github';

type SortSelectProps = {
    sortValue: SortValue;
    orderValue: OrderValue;
    onSortChange: (sort: SortValue) => void;
    onOrderChange: (order: OrderValue) => void;
}

const SELECT_STYLE = {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
};

function SortSelect({ sortValue, orderValue, onSortChange, onOrderChange }: SortSelectProps) {
    const orderDisabled = sortValue === 'best-match';

    return (
        <div style={{...SELECT_STYLE, flexWrap: 'wrap'}}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                Sort by
                <select
                    value={sortValue}
                    onChange={(e) => onSortChange(e.target.value as SortValue)}
                >
                    <option value="best-match">Best Match</option>
                    <option value="stars">Stars</option>
                    <option value="forks">Forks</option>
                    <option value="help-wanted-issues">Help Wanted Issues</option>
                    <option value="updated">Recently Updated</option>
                </select>
            </label>
            <label style={{ ...SELECT_STYLE, opacity: orderDisabled ? 0.65 : 1}}>
                Order
                <select
                    value={orderValue}
                    onChange={(e) => onOrderChange(e.target.value as OrderValue)}
                    disabled={orderDisabled}
                >
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                </select>
            </label>
        </div>
    )
}

export default SortSelect;