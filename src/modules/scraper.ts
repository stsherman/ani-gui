import { URL, URLSearchParams } from 'url';
import { map, forEach } from './polyfills';

async function get(url: string, params?: any) {
    const _url = new URL(url);
    if (params && Object.keys(params).length) {
        const _params = new URLSearchParams(Object.keys(params).map(key => [key, params[key]]) as Iterable<[string, string]>);
        _url.search = _params.toString();
    }
    return await fetch(_url.href);
}

Array.prototype.transform = function (mutator) {
    return mutator(this);
}

Array.prototype.first = function (predicate) {
    if (!this || !this.length) return undefined;
    if (typeof predicate !== "function") return this[0];
    return this.find(predicate);
}

Array.prototype.last = function (predicate) {
    if (!this || !this.length) return undefined;
    if (typeof predicate !== "function") return this[this.length - 1];
    return this.reverse().find(predicate);
}

export async function search(query: string) {
    if (!query) return [];
    return await get('https://gogoanime.wiki/search.html', { 'keyword': query })
        .then(x => x.text())
        .then(x => {
            const doc = document.createElement('template');
            doc.innerHTML = x;
            return map(doc.content.querySelectorAll('.items li'), (li: HTMLLIElement) => {
                const image = li.querySelector<HTMLImageElement>('img').src;
                const link = li.querySelector<HTMLAnchorElement>('.name a');
                const name = link.innerText;
                const id = link.href.substring(link.href.lastIndexOf('/') + 1);
                return { image, name, id };
            });
        })
}

export async function details(id: string) {
    return await get(`https://gogoanime.wiki/category/${id}`)
        .then(x => x.text())
        .then(x => {
            const doc = document.createElement('template');
            doc.innerHTML = x;
            const details: Partial<DetailsModal> = {};
            const info = doc.content.querySelector('.anime_info_body_bg');
            details.image = info.querySelector('img').src;
            details.title = info.querySelector('h1').innerText;
            forEach(info.querySelectorAll('.type'), (p: HTMLParagraphElement) => {
                const parts = p.textContent.split(':');
                // @ts-ignore
                details[parts.shift().toLowerCase()] = parts.join(':').trim();
            });
            details.episodes = map(doc.content.querySelectorAll('#episode_page li'),
                (li: HTMLLIElement) => li.textContent.trim());
            return details;
        });
}