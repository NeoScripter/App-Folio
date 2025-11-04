import { getXSRFTokenFromCookie, initCsrf } from '@/api/auth';
import { useReducer } from 'preact/hooks';

type ValidationErrors = Record<string, string[]>;

interface FetchOptions {
    url: string;
    method?: string;
    payload?: unknown;
    onSuccess?: (data: any) => void;
    onError?: () => void;
}

interface State {
    data: any;
    loading: boolean;
    errors: ValidationErrors | null;
}

type Action =
    | { type: 'FETCH_START' }
    | { type: 'FETCH_SUCCESS'; payload: any }
    | { type: 'FETCH_ERROR'; payload: ValidationErrors | null }
    | { type: 'RESET' };

const initialState: State = {
    data: null,
    loading: false,
    errors: null,
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, loading: true, errors: null };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, data: action.payload };
        case 'FETCH_ERROR':
            return { ...state, loading: false, errors: action.payload };
        case 'RESET':
            return initialState;
        default:
            throw new Error('Unexpected action type');
    }
}

export function useFetch() {
    const [state, dispatch] = useReducer(reducer, initialState);

    async function fetchData({
        url,
        method = 'GET',
        payload,
        onSuccess,
        onError,
    }: FetchOptions) {
        dispatch({ type: 'FETCH_START' });

        try {
            const headers: Record<string, string> = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            };

            if (method !== 'GET' && method !== 'HEAD') {
                await initCsrf();
                const xsrf = getXSRFTokenFromCookie();
                if (xsrf) headers['X-XSRF-TOKEN'] = xsrf;
            }

            const res = await fetch(url, {
                method,
                headers,
                credentials: 'include',
                body: payload ? JSON.stringify(payload) : undefined,
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                if (res.status === 422 && data.errors) {
                    dispatch({ type: 'FETCH_ERROR', payload: data.errors });
                } else {
                    throw new Error(data.message || res.statusText);
                }
                onError?.();
                return;
            }

            dispatch({ type: 'FETCH_SUCCESS', payload: data });
            onSuccess?.(data);
        } catch (err) {
            console.error(err);
            dispatch({ type: 'FETCH_ERROR', payload: null });
            onError?.();
        }
    }

    return {
        ...state,
        fetchData,
        reset: () => dispatch({ type: 'RESET' }),
    };
}
