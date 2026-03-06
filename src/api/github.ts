import type { SearchReposResponse } from '../types/github';

const API_BASE = 'https://api.github.com';

export async function searchRepos(
    query: string,
    signal?: AbortSignal
): Promise<SearchReposResponse> {
    const res = await fetch(
        `${API_BASE}/search/repositories?q=${encodeURIComponent(query)}`,
        { signal }
    )

    if (!res.ok) throw new Error(`GitHub API Error: ${res.status} ${res.statusText}`);

    const data: SearchReposResponse = await res.json();

    return data;
}