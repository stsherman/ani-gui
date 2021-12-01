import {Statement} from "sqlite3";

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('ani-viewer.sqlite');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS Anime(
           id                   TEXT    PRIMARY KEY NOT NULL,
           displayName          TEXT    NOT NULL,
           imageUrl             TEXT    NOT NULL,
           description          TEXT
        );
    `);
    db.run(`
        CREATE TABLE IF NOT EXISTS Favorites(
            animeId              TEXT    NOT NULL
        );
    `);
    db.run(`
        CREATE TABLE IF NOT EXISTS History(
           animeId              TEXT    NOT NULL,
           episode              INT     NOT NULL
        );
    `);
});

function seed() {
    db.serialize(() => {
        db.run(`DELETE FROM Anime`);
        db.run(`DELETE FROM Favorites`);
        db.serialize(() => {
            db.run(`
            INSERT INTO Anime VALUES ('one-piece', 'One Piece', 'https://gogocdn.net/images/anime/One-piece.jpg', 'One Piece is a story about  Monkey D. Luffy, who wants to become a sea-robber. In a world mystical, there have a mystical fruit whom eat will have a special power but also have greatest weakness. Monkey ate Gum-Gum Fruit which gave him a strange power but he can NEVER swim. And this weakness made his dream become a sea – robber to find ultimate treasure is difficult.\\nOne Piece is a story about  Monkey D. Luffy, who wants to become a sea-robber. In a world mystical, there have a mystical fruit whom eat will have a special power but also have greatest weakness. Monkey ate Gum-Gum Fruit which gave him a strange power but he can NEVER swim. And this weakness made his dream become a sea – robber to find ultimate treasure is difficult. But along his ways, he meet himself many members to help. Together, they sail the Seven Seas of adventure in search of the elusive treasure “One Piece.”')
        `);
            db.run(`
            INSERT INTO Favorites VALUES ('one-piece')
        `)
        });
    });
}
seed();

export function run(sql: string, ...param: any[]): Promise<void> {
    return new Promise((resolve, reject) => {
        try {
            db.run(sql, param, (error: Error | null) => error ? reject(error) : resolve(void(0)));
        } catch (e) {
            reject(e);
        }
    });
}

export function get<T>(sql: string, ...param: any[]): Promise<T> {
    return new Promise((resolve, reject) => {
        try {
            db.get(sql, param, (error: Error | null, row: T) => error ? reject(error) : resolve(row));
        } catch (e) {
            reject(e);
        }
    });
}

export function all<T>(sql: string, ...param: any[]): Promise<T[]> {
    return new Promise((resolve, reject) => {
        try {
            db.all(sql, param, (error: Error | null, rows: T[]) => error ? reject(error) : resolve(rows));
        } catch (e) {
            reject(e);
        }
    });
}

export function each<T>(sql: string, param: any, callback?: (this: Statement, err: Error | null, row: T) => void): Promise<T[]> {
    return new Promise((resolve, reject) => {
        try {
            db.each(sql, param, callback, (error: Error | null, rows: T[]) => error ? reject(error) : resolve(rows));
        } catch (e) {
            reject(e);
        }
    });
}

export async function getFavorites(): Promise<Anime[]> {
    return await all<Anime>(`SELECT a.* FROM Favorites f JOIN anime a ON a.id = f.AnimeId`);
}

export async function getHistory(): Promise<Anime[]> {
    return await all<Anime>(`SELECT a.* FROM History f JOIN anime a ON a.id = f.AnimeId`);
}

export async function isFavorite(id: string): Promise<boolean> {
    return await get<boolean>(`SELECT * FROM Favorites WHERE animeId = ?`, id).then(x => !!x);
}