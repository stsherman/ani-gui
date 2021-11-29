const { URL, URLSearchParams } = require('url');
const { map, forEach } = require('./polyfills');

async function get(url, params) {
    const _url = new URL(url);
    if (params && Object.keys(params).length) {
        const _params = new URLSearchParams(Object.keys(params).map(key => [key, params[key]]));
        _url.search = _params.toString();
    }
    return await fetch(_url.href);
}

function range(start, end) {
    if (end === undefined || start === undefined || end < start)
        throw 'End must be greater than Start';
    return new Array(1 + end - start).map((value, index) => index + start);
}

function matchAll(string, regex) {
    return [...string.matchAll(regex)]
        .map(x => x.groups || { ...range(1, x.length - 1).map(i => x[i]) })
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

// exports.search = async function (query) {
//     if (!query) return [];
//     const regex = /<a href="category\/(?<id>[^"]*)"[^(]*\("(?<image>[^"]*)[^\/]*\/div>(?<name>[^<]*)/gm;
//     return await get('https://ajax.gogo-load.com/site/loadAjaxSearch', { 'keyword': query })
//         .then(x => x.json())
//         .then(x => matchAll(x.content, regex))
// }

exports.search = async function (query) {
    if (!query) return [];
    return await get('https://gogoanime.wiki/search.html', { 'keyword': query })
        .then(x => x.text())
        .then(x => {
            const doc = document.createElement('template');
            doc.innerHTML = x;
            return map(doc.content.querySelectorAll('.items li'), li => {
               const image = li.querySelector('img').src;
               const link = li.querySelector('.name a');
               const name = link.innerText;
               const id = link.href.substring(link.href.lastIndexOf('/') + 1);
               return { image, name, id };
            });
        })
}

// exports.details = async function (id) {
//     const headerRegex = /<img src="(?<image>[^"]*)">[^>]*>(?<title>[^<]*)/gm;
//     // TODO: figure out how to get multiple values for text (ie. genre)
//     const detailRegex = /<p class="type"><span>(?<type>[^:]*):[^>]*>\s*(<a[^>]*>)?(?<text>[^<]*)/gm;
//     const episodeRegex = /ep_start[^\d]*(?<start>\d+)[^e]*ep_end[^\d]*(?<end>\d+)/gm;
//     return await get(`https://gogoanime.wiki/category/${id}`)
//         .then(x => x.text())
//         .then(x => ({
//             ...matchAll(x, headerRegex).first(),
//             ...matchAll(x, detailRegex)
//                 .reduce((acc, value) => ({ ...acc, [value.type.toLowerCase()]: value.text}), {}),
//             episodes: matchAll(x, episodeRegex)
//                 .transform(arr => [Math.max(1, Number(arr.first().start)), Number(arr.last().end)]),
//          }));
// }

exports.details = async function (id) {
    return await get(`https://gogoanime.wiki/category/${id}`)
        .then(x => x.text())
        .then(x => {
            const doc = document.createElement('template');
            doc.innerHTML = x;
            const details = {};
            const info = doc.content.querySelector('.anime_info_body_bg');
            details.image = info.querySelector('img').src;
            details.title = info.querySelector('h1').innerText;
            forEach(info.querySelectorAll('.type'), p => {
                const parts = p.textContent.split(':');
                details[parts.shift().toLowerCase()] = parts.join(':').trim();
            });
            details.episodes = map(doc.content.querySelectorAll('#episode_page li'),
                    li => li.textContent.trim());
            return details;
        });
}