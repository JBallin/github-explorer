import { useEffect, useState } from 'react';
import type { Repo } from '../types/github';
import { searchRepos } from '../api/github';

type GithubSearchState = {
    repos: Repo[];
    loading: boolean;
    error: Error | null;
}

const initialState: GithubSearchState = {
    repos: [],
    loading: false,
    error: null
}

const useGithubSearch = (query: string) => {
    const [state, setState] = useState(initialState);
    
    useEffect(() => {
        if (!query) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setState(initialState);
            return;
        }

        const controller = new AbortController();

        const run = async () => {
            setState(prev => ({
                ...prev,
                loading: true,
                error: null
            }));
            try {
                const result = await searchRepos(query, controller.signal)
                
                setState({
                    repos: result.items,
                    loading: false,
                    error: null
                })
            } catch (e) {
                if (controller.signal.aborted) return;

                setState({
                    repos: [],
                    loading: false,
                    error: e instanceof Error ? e : new Error('Unknown error')
                });
            }
        };

        void run();

        return () => controller.abort();
    }, [query])

    return state;
}

export default useGithubSearch