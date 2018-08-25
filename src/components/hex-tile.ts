export default class HexTile extends HTMLElement {
    private _x;
    private _y;

    constructor() {
        super();
    }

    connectedCallback() {
        this.x = this.getAttribute('x');
        this.y = this.getAttribute('y');

        this.addEventListener('click', () => console.log(this._x, this._y))
    }

    get x() {
        return this._x;
    }

    set x(v) {
        this.style.setProperty('--x', v);
        this._x = v;
    }

    get y() {
        return this._y;
    }

    set y(v) {
        // tslint:disable
        const sgn = (z: string) => parseInt(z) % 2 === 0 ? 0 : 1;

        this.style.setProperty('--y', v);
        this.style.setProperty('--sign', sgn(v) + '');
        this._y = v;
    }
}