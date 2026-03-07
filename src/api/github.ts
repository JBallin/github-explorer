import type { SearchReposResponse } from '../types/github';

type SearchReposParams = {
    query: string;
    signal?: AbortSignal;
    page: number;
}

export const PAGE_SIZE = 5;

const API_BASE = 'https://api.github.com';

export async function searchRepos({ query, signal, page }: SearchReposParams): Promise<SearchReposResponse> {
    const res = await fetch(
        `${API_BASE}/search/repositories?q=${encodeURIComponent(query)}&per_page=${PAGE_SIZE}&page=${page}`,
        { signal }
    )

    if (!res.ok) throw new Error(`GitHub API Error: ${res.status} ${res.statusText}`);

    const data: SearchReposResponse = await res.json();

    return data;
}