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

exports.run = function (sql, param) {
    return new Promise((resolve, reject) => {
        try {
            db.run(sql, param, (error) => error ? reject(error) : resolve());
        } catch (e) {
            reject(e);
        }
    });
};

exports.get = function (sql, param) {
    return new Promise((resolve, reject) => {
        try {
            db.get(sql, param, (error, row) => error ? reject(error) : resolve(row));
        } catch (e) {
            reject(e);
        }
    });
};

exports.all = function (sql, param) {
    return new Promise((resolve, reject) => {
        try {
            db.all(sql, param, (error, rows) => error ? reject(error) : resolve(rows));
        } catch (e) {
            reject(e);
        }
    });
};

exports.each = function (sql, param, fn) {
    return new Promise((resolve, reject) => {
        try {
            db.each(sql, param, fn, (error, rows) => error ? reject(error) : resolve(rows));
        } catch (e) {
            reject(e);
        }
    });
};

exports.getFavorites = async function () {
    return await exports.all(`SELECT a.* FROM Favorites f JOIN Anime a ON a.Id = f.AnimeId`);
}

exports.getHistory = async function () {
    return await exports.all(`SELECT a.* FROM History f JOIN Anime a ON a.Id = f.AnimeId`);
}

exports.isFavorite = async function (id) {
    return await exports.get(`SELECT * FROM Favorites WHERE AnimeId = ?`, id).then(x => !!x);
}