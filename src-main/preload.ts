import { contextBridge } from "electron";
import {getFavorites, getHistory} from "./modules/database";
import GogoAnimeScraper from "./modules/scrapers/gogoanime";
import './extensions/NodeList';
import './extensions/Element';

class Backend implements Api {
    getFavorites = async () => await getFavorites();
    getHistory = async () => await getHistory();
    search = async (keyword: string | undefined, page?: number) => await GogoAnimeScraper.search(keyword, page);
    getDetails = async (id: string | undefined) => await GogoAnimeScraper.getDetails(id);
}

contextBridge.exposeInMainWorld(
    'api',
    new Backend()
);