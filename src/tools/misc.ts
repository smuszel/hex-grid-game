export const compose = (...fns) => fns.reduce(
    (f, g) => (...args) => f(g(...args)));

export const range = n => {
    if (typeof n === 'string') {
        return [...Array(parseInt(n)).keys()]
    } else {
        return [...Array(n).keys()]
    }
};

export const permuteCoords = (x, y) => {
    const res = [];
    for (const xx of range(x)) {
        for (const yy of range(y)) {
            res.push([xx, yy]);
        }
    }

    return res;
}