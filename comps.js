const deselect = elem => {
    if (elem) {
        elem.state = { selected: false };
    }
}

const select = elem => {
    if (elem) {
        elem.state = { selected: true };
    }
}

class Store {
    static get instance() {
        if (!this._instance) {
            this._instance = new Store();
        }

        return this._instance;
    }

    constructor() {
        this.selected = undefined;
    }
}

const requestSelection = element => {
    // const currentlySelected = Store.instance.selected;

    // if (currentlySelected === element) {
    //     deselect(element);
    //     Store.instance.selected = undefined;
    // } else if (currentlySelected) {
    //     deselect(currentlySelected);
    //     select(element)
    //     Store.instance.selected = element;
    // } else {
    //     select(element);
    //     Store.instance.selected = element;
    // }

    console.log(element.x, element.y)
}

class HexTile extends HTMLElement {
    constructor() {
        super();
        this.selectable = true;
    }

    connectedCallback() {

        this.addEventListener('click', () => requestSelection(this));
    }

    get x() {
        return this._x;
    }

    set x(v) {
        setTimeout(() => {
            this.style.setProperty('--x', v);
            this._x = v;
        }, 0);
    }

    get y() {
        return this._y;
    }

    set y(v) {
        const sgn = z => z % 2 == 0 ? 1 : (-1);

        setTimeout(() => {
            this.style.setProperty('--y', v);
            this.style.setProperty('--sign', sgn(v));
            this._y = v;
        }, 0);
    }
}

class HexGrid extends HTMLElement {
    constructor() {
        super();
    }
}

customElements.define('hex-grid', HexGrid);
customElements.define('hex-tile', HexTile);

