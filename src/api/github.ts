import type { SearchReposResponse, GithubErrorResponse, SortValue } from '../types/github';

type SearchReposParams = {
    query: string;
    signal?: AbortSignal;
    page: number;
    sort: SortValue;
}

export const PAGE_SIZE = 5;
export const RESULTS_LIMIT = 1000;

const API_BASE = 'https://api.github.com';

async function tryParseGithubErrorMessage(res: Response): Promise<string | undefined> {
    try {
        const err = (await res.json()) as GithubErrorResponse;
        return err.message;
    } catch {
        return undefined;
    }
}

export async function searchRepos({ query, signal, page, sort }: SearchReposParams): Promise<SearchReposResponse> {
    const res = await fetch(
        `${API_BASE}/search/repositories?q=${encodeURIComponent(query)}&per_page=${PAGE_SIZE}&page=${page}&sort=${sort}`,
        { signal }
    )

    if (!res.ok) {
        const message = await tryParseGithubErrorMessage(res);
        throw new Error(`GitHub API Error: ${res.status} ${message ?? res.statusText}`)
    }

    return (await res.json()) as SearchReposResponse;
}
