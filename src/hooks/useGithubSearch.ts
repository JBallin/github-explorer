import { useEffect, useState } from 'react';
import type { Repo, SortValue } from '../types/github';
import { searchRepos } from '../api/github';

type GithubSearchState = {
    repos: Repo[];
    loading: boolean;
    error: Error | null;
    totalResults: number;
}

type UseGithubSearchParams = {
    query: string;
    page: number;
    sort: SortValue;
}

const initialState: GithubSearchState = Object.freeze({
    repos: [],
    loading: false,
    error: null,
    totalResults: 0
});

const useGithubSearch = ({ query, page, sort }: UseGithubSearchParams) => {
    const [state, setState] = useState(initialState);
    
    useEffect(() => {
        if (!query) {
            setState(initialState);
            return;
        }

        const controller = new AbortController();

        setState(prev => ({
            ...prev,
            loading: true,
            error: null
        }));

        const run = async () => {
            try {
                const result = await searchRepos({ query, signal: controller.signal, page, sort })
                
                setState({
                    repos: result.items,
                    loading: false,
                    error: null,
                    totalResults: result.total_count
                })
            } catch (e) {
                if (controller.signal.aborted) return;

                setState(prev => ({
                    ...prev,
                    loading: false,
                    error: e instanceof Error ? e : new Error('Unknown error'),
                }));
            }
        };

        void run();

        return () => controller.abort();
    }, [query, page, sort])

    return state;
}

export default useGithubSearch