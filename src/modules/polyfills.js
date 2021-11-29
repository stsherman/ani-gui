exports.map = function (list, func) {
    if (typeof list.map === "function")
        return list.map(func);
    const mapped = [];
    for (let i = 0; i < list.length; i++) {
        mapped.push(func(list[i], i, list));
    }
    return mapped;
}

exports.forEach = function (list, func) {
    if (typeof list.forEach === "function") {
        list.forEach(func);
        return;
    }
    for (let i = 0; i < list.length; i++) {
        func(list[i], i, list);
    }
}