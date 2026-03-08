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

export type GithubErrorResponse = {
    message?: string;
}