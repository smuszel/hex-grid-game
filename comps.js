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
    const currentlySelected = Store.instance.selected;

    if (currentlySelected === element) {
        deselect(element);
        Store.instance.selected = undefined;
    } else if (currentlySelected) {
        deselect(currentlySelected);
        select(element)
        Store.instance.selected = element;
    } else {
        select(element);
        Store.instance.selected = element;
    }
}

class HexTile extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.selectable = true;
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <svg viewbox="0 0 17.32050807568877 20">
                <path d="M8.660254037844386 0L17.32050807568877 5L17.32050807568877 15L8.660254037844386 20L0 15L0 5Z"></path>
            </svg>
        `

        this.stylize(this.state);
        this.addEventListener('click', () => requestSelection(this));
    }
    
    stylize(state) {
        const {
            width,
            x,
            y,
            fill,
            scale,
            selected
        } = state;

        const height = width * 2 / Math.sqrt(3);

        const sign = z => z % 2 == 0 ? (-1) : 1;

        const paddingX = width * 1 / 3.7;
        const offsetX = width * 1 / 4 * sign(y);
        const positionX = x * width;
        const borderX = 0;

        const positionY = y * height;
        const offsetY = y * height * 1 / 4;
        const borderY = 0;

        const top = positionY - offsetY + borderY;
        const left = positionX + offsetX + paddingX + borderX;

        const fill2 = selected
            ? '#d3e'
            : fill;
            

        const style = {
            width: width + 'px',
            height: height + 'px',
            top: top + 'px',
            left: left + 'px',
            position: 'absolute',
            fill: fill2,
            transform: `scale(${scale})`
        }

        const fst = this.shadowRoot.firstElementChild;
        Object.entries(style).forEach(([k, v]) => fst.style.setProperty(k, v));
    }

    get state() {
        return this._state;
    }

    set state(x) {
        this._state = { ...this._state, ...x };

        if (this.isConnected) {
            this.stylize(this._state);
        }
    }
}

class HexGrid extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.stylize();

        this.shadowRoot.innerHTML = `
            <slot></slot>
        `
    }

    stylize() {
        const style = {
            width: '1000px',
            height: '800px',
            background: '#ded',
            position: 'relative',
            contain: 'content'
        }

        Object.entries(style).forEach(([k, v]) => this.style.setProperty(k, v));
    }
}

customElements.define('hex-grid', HexGrid);
customElements.define('hex-tile', HexTile);

