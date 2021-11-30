const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('ani-viewer.sqlite');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS Anime(
           Id                   TEXT    PRIMARY KEY NOT NULL,
           DisplayName          TEXT    NOT NULL,
           ImageUrl             TEXT    NOT NULL,
           Description          TEXT
        );
    `);
    db.run(`
        CREATE TABLE IF NOT EXISTS Favorites(
           AnimeId              TEXT    NOT NULL
        );
    `);
    db.run(`
        CREATE TABLE IF NOT EXISTS History(
           AnimeId              TEXT    NOT NULL,
           Episode              INT     NOT NULL
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

export function run(sql: string, param?: any) {
    return new Promise((resolve, reject) => {
        try {
            db.run(sql, param, (error: any) => error ? reject(error) : resolve(void(0)));
        } catch (e) {
            reject(e);
        }
    });
}

export function get<T>(sql: string, param?: any) {
    return new Promise((resolve, reject) => {
        try {
            db.get(sql, param, (error: any, row: T) => error ? reject(error) : resolve(row));
        } catch (e) {
            reject(e);
        }
    });
}

export function all<T>(sql: string, param?: any) {
    return new Promise((resolve, reject) => {
        try {
            db.all(sql, param, (error: any, rows: Array<T>) => error ? reject(error) : resolve(rows));
        } catch (e) {
            reject(e);
        }
    });
}

export function each<T>(sql: string, param?: any, fn?: (error: any, row: T) => void) {
    return new Promise((resolve, reject) => {
        try {
            db.each(sql, param, fn, (error: any, rows: Array<T>) => error ? reject(error) : resolve(rows));
        } catch (e) {
            reject(e);
        }
    });
}

export async function getFavorites () {
    return await all<FavoritesModal>(`SELECT a.* FROM Favorites f JOIN Anime a ON a.Id = f.AnimeId`);
}

export async function getHistory() {
    return await all<HistoryModal>(`SELECT a.* FROM History f JOIN Anime a ON a.Id = f.AnimeId`);
}

export async function isFavorite(id: string) {
    return await get<FavoritesModal>(`SELECT * FROM Favorites WHERE AnimeId = ?`, id)
        .then(x => !!x);
}
