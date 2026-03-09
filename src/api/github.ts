import type { SearchReposResponse, GithubErrorResponse, SortValue, OrderValue, RepoContributorsResponse } from '../types/github';

type SearchReposParams = {
    query: string;
    signal?: AbortSignal;
    page: number;
    sort: SortValue;
    order: OrderValue;
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

async function fetchGithubJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(url, { signal });

  if (!res.ok) {
    const message = await tryParseGithubErrorMessage(res);
    throw new Error(`GitHub API Error: ${res.status} ${message ?? res.statusText}`);
  }

  return (await res.json()) as T;
}


export async function searchRepos({ query, signal, page, sort, order }: SearchReposParams): Promise<SearchReposResponse> {
    const params = new URLSearchParams({
        q: query,
        per_page: String(PAGE_SIZE),
        page: String(page),
    });

    if (sort !== 'best-match') {
        params.set('sort', sort);
        params.set('order', order);
    }

    return fetchGithubJson<SearchReposResponse>(`${API_BASE}/search/repositories?${params}`, signal);
}

export async function getRepoContributors(repoName: string, signal: AbortSignal): Promise<RepoContributorsResponse> {
    return fetchGithubJson<RepoContributorsResponse>(`${API_BASE}/repos/${repoName}/contributors`, signal);
}