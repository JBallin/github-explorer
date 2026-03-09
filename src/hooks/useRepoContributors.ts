import { useEffect, useState } from 'react';
import { getRepoContributors } from '../api/github';
import type { Contributor } from '../types/github';

const useRepoContributors = (repoName: string) => {
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(false);
    const [contributors, setContributors] = useState<Contributor[] | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        const run = async () => {
            try {
                setLoading(true);
                const result = await getRepoContributors(repoName, controller.signal)

                setContributors(result);
                setLoading(false);
                setError(null);
            } catch (e) {
                if (controller.signal.aborted) return;

                setLoading(false)
                setError(e instanceof Error ? e : new Error('Unknown error'))
            }
        }

        void run();
        
        return () => controller.abort();
    }, [repoName])

    return { contributors, loading, error };
}

export default useRepoContributors;