import { permuteCoords } from '../tools/allTools';

export default class HexGrid extends HTMLElement {
    private _sizeX;
    private _sizeY;

    constructor() {
        super();
    }

    connectedCallback() {
        this.sizeX = this.getAttribute('sizex');
        this.sizeY = this.getAttribute('sizey');

        this.render();
    }

    render() {
        const tile = ([x, y]) => `<hex-tile x=${x} y=${y}></hex-tile>`;
        const z = permuteCoords(this.sizeX, this.sizeY).map(tile);
        
        this.innerHTML = z.join('')
    }

    queryIndex([x, y]) {
        const h = tile => tile.x === x && tile.y === y;
        const res = Object.values(this.childNodes).find(h);

        return res;
    }

    set sizeX(value) {
        this.style.setProperty('--sizeX', value);
        this._sizeX = value;
    }

    get sizeX() {
        return this._sizeX
    }

    set sizeY(value) {
        this.style.setProperty('--sizeY', value)
        this._sizeY = value;
    }

    get sizeY() {
        return this._sizeY;
    }
}