type SearchProps = {
    query: string;
    onQueryChange: (value: string) => void;
}

function Search({ query, onQueryChange }: SearchProps) {
    return (
        <>
            <label htmlFor="repo-search" style={{ display: "block", marginBottom: 8 }}>
                Search
            </label>

            <input
                id="repo-search"
                onChange={e => onQueryChange(e.target.value)}
                placeholder='Search GitHub repos'
                value={query}
                autoComplete="off"
                spellCheck={false}
                autoFocus
                style={{
                    display: "block",
                    width: "97%",
                    padding: 10,
                    marginTop: 6,
                }}
            />
        </>
    )
}

export default Search;