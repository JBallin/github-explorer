import type { SortValue } from '../types/github';

type SortSelectProps = {
    value: SortValue;
    onChange: (sort: SortValue) => void;
}

function SortSelect({ value, onChange }: SortSelectProps) {
    return (
        <>
            <label>
                Sort by
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value as SortValue)}
                    style={{ marginLeft: 8 }}
                >
                    <option value="best-match">Best Match</option>
                    <option value="stars">Stars</option>
                    <option value="forks">Forks</option>
                    <option value="help-wanted-issues">Help Wanted Issues</option>
                    <option value="updated">Recently Updated</option>
                </select>
            </label>
        </>
    )
}

export default SortSelect;