export const buildSrcSet = (sources: Array<[string | undefined, string]>) =>
    sources
        .filter(([src]) => !!src)
        .map(([src, dpr]) => `${src} ${dpr}`)
        .join(', ');
