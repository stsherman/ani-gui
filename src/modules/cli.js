const { spawn } = require('child_process');

exports.search = function (query) {
    return new Promise((resolve, reject) => {
        try {
            if (!query) {
                resolve([]);
                return;
            }
            const child = spawn('ani-cli', ['-Q', query]);
            child.stdout.on('data', (data) => {
                const result = new TextDecoder().decode(data)
                    .split('\n')
                    .filter(x => x)
                    .map(x => {
                        const parts = x.split(',');
                        return { id: parts[0], name: parts[1], image: parts[2] };
                    });
                resolve(result);
                child.kill();
            });
            child.stderr.on('data', (data) => {
                reject(data);
                child.kill();
            });
            child.on('error', (data) => {
                reject(data);
                child.kill();
            });
            child.on('exit', () => resolve([]));
        } catch (e) {
            reject(e);
        }
    });
};