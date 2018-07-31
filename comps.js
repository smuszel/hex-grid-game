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

        this.innerHTML = `
            <hex-tile-background></hex-tile-background>
            <hex-tile-border></hex-tile-border>
            <hex-tile-dropzone></hex-tile-dropzone>
        `

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

class UnitExample extends HTMLElement {
    constructor() {
        super();
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

class HexTileBackground extends HTMLElement {
    constructor() {
        super();
    }
}

class HexTileBorder extends HTMLElement {
    constructor() {
        super();
    }
}

class HexTileDropzone extends HTMLElement {
    constructor() {
        super();
    }
}

customElements.define('hex-grid', HexGrid);

customElements.define('hex-tile', HexTile);
customElements.define('hex-background', HexTileBackground);
customElements.define('hex-border', HexTileBorder);
customElements.define('hex-dropzone', HexTileDropzone);

customElements.define('unit-example', UnitExample);

