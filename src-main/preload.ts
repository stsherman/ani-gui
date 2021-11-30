import { contextBridge } from "electron";
import {getFavorites, getHistory} from "./modules/database";

contextBridge.exposeInMainWorld(
    'api',
    {
        getFavorites: async () => await getFavorites(),
        getHistory: async () => await getHistory(),
        // search: async (query) => await scraper.search(query),
    }
);