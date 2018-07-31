
const genRange = n => [...Array(n).keys()];

const permuteCoords = (x, y) => {
    const res = [];
    for (let xx of genRange(x)) {
        for (let yy of genRange(y)) {
            res.push([xx, yy]);
        }
    }
    
    return res;
}

const createHexTile = ([x, y]) => {
    const el = document.createElement('hex-tile');

    el.state = {
        x,
        y,
        fill: '#23e',
        width: 80,
        scale: 1
    }

    return el;
}

const createHexUnit = ([x, y]) => {
    const el = document.createElement('hex-tile');

    el.state = {
        x,
        y,
        fill: '#ad6',
        width: 80,
        scale: 0.7
    }
    
    return el;
}

const main = () => {
    const hexGrid = document.querySelector('hex-grid');
    const { sizex, sizey } = hexGrid.attributes;
    const [x, y] = [sizex, sizey].map(z => Number.parseInt(z.value));
    const coords = permuteCoords(x, y);
    coords.map(createHexTile).forEach(t => hexGrid.appendChild(t));
    hexGrid.appendChild(createHexUnit([3, 3]));
}; main();