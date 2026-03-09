export type Repo = {
    id: number;
    full_name: string;
    html_url: string;
    description: string | null;
    stargazers_count: number;
}

export type SearchReposResponse = {
    items: Repo[];
    total_count: number;
}

export type RepoContributorsResponse = Contributor[];

export type GithubErrorResponse = {
    message?: string;
}

export type SortValue = 'best-match' | 'stars' | 'forks' | 'help-wanted-issues' | 'updated';

export type OrderValue = 'desc' | 'asc';

export type Contributor = {
    login: string;
    avatar_url: string;
    html_url: string;
    contributions: number;
}