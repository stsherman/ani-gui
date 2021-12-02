import { URL, URLSearchParams } from 'url';

export async function get(url: string, params?: { [key: string]: string }) {
    const _url = new URL(url);
    if (params && Object.keys(params).length) {
        const _params = new URLSearchParams(Object.keys(params).map(key => [key, params[key]]) as Iterable<[string, string]>);
        _url.search = _params.toString();
    }
    return await fetch(_url.href);
}
