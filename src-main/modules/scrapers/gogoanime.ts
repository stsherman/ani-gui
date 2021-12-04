import {get} from "../http";

export namespace GogoAnimeScraper {
    export async function getDetails(id: string | undefined): Promise<GetDetailsResponse> {
        return !id ? {} as GetDetailsResponse : await get(`https://gogoanime.wiki/category/${id}`)
            .then(x => x.text())
            .then(x => {
                const doc = document.createElement('template');
                doc.innerHTML = x;
                const info = doc.content.querySelectorRequired('.anime_info_body_bg');
                return {
                    image: info.querySelectorRequired<HTMLImageElement>('img').src,
                    title: info.querySelectorRequired<HTMLHeadingElement>('h1').innerText,
                    ...info.querySelectorAll<HTMLParagraphElement>('.type').reduce((acc: Partial<GetDetailsResponse>, value: HTMLParagraphElement) => {
                        const parts = value.textContent?.split(':');
                        let key = parts?.shift()?.toLowerCase();
                        key = key === 'plot summary' ? 'description' : key;
                        if (key && parts) {
                            return { ...acc, [key]: parts.join(':').trim()}
                        }
                        return acc;
                    }, {} as Partial<GetDetailsResponse>),
                    episodes: doc.content.querySelectorAll<HTMLLIElement>('#episode_page li')
                        .map((li: HTMLLIElement) => li.textContent?.trim())
                } as GetDetailsResponse;
            });
    }

    export async function search(keyword: string | undefined, page?: number): Promise<SearchResponse> {
        if (!keyword || keyword.length < 2) return { searchResults: [], currentPage: 0 };
        return await get('https://gogoanime.wiki/search.html', {keyword, page: `${page || 1}`})
            .then(x => x.text())
            .then(x => {
                const doc = document.createElement('template');
                doc.innerHTML = x;
                const paginationElements = doc.content.querySelectorAll<HTMLLIElement>('ul.pagination-list li');
                const currentPageIndex = paginationElements.findIndex<HTMLLIElement>((li) => li.classList.contains('selected'));
                const currentPage = Number(paginationElements[currentPageIndex].textContent);
                const previousPage = currentPageIndex > 0 ? Number(paginationElements[currentPageIndex - 1].textContent) : undefined;
                const nextPage = currentPageIndex < paginationElements.length - 1 ? Number(paginationElements[currentPageIndex + 1].textContent) : undefined;
                return {
                    currentPage: currentPage,
                    previousPage: previousPage,
                    nextPage: nextPage,
                    searchResults: doc.content.querySelectorAll<HTMLLIElement>('.items li').map((li: HTMLLIElement) => {
                        const link = li.querySelectorRequired<HTMLAnchorElement>('.name a');
                        return {
                            id: link.href.substring(link.href.lastIndexOf('/') + 1),
                            image: li.querySelectorRequired<HTMLImageElement>('img').src,
                            name: link.innerText,
                        };
                    })
                };
            })
    }
}

export default GogoAnimeScraper;