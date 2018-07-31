class HexTileContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.width = 80;
        this.height = this.width * 2 / Math.sqrt(3);
        this.appendChild(document.createElement('hex-tile'));
        this.appendChild(document.createElement('hex-unit'));
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <div>
                <slot></slot>
            </div>
        `
        this.stylize();
    }

    stylize() {
        const sign = z => z % 2 == 0 ? (-1) : 1;

        const paddingX = this.width * 1 / 3.7;
        const offsetX = this.width * 1 / 4 * sign(this.y);
        const positionX = this.x * this.width;
        const borderX = 0;

        const positionY = this.y * this.height;
        const offsetY = this.y * this.height * 1 / 4;
        const borderY = 0;

        const top = positionY - offsetY + borderY;
        const left = positionX + offsetX + paddingX + borderX;

        const style = {
            width: this.width + 'px',
            height: this.height + 'px',
            position: 'absolute',
            top: top + 'px',
            left: left + 'px',
        }

        Object.entries(style).forEach(([k, v]) => this.shadowRoot.firstElementChild.style.setProperty(k, v));
    }

    get x() {
        return this.getAttribute('x');
    }

    get y() {
        return this.getAttribute('y');
    }
}

class HexTile extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.width = 80;
        this.height = this.width * 2 / Math.sqrt(3);
        this.fill = '#2d2';
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <svg viewbox="0 0 17.32050807568877 20">
                <path d="M8.660254037844386 0L17.32050807568877 5L17.32050807568877 15L8.660254037844386 20L0 15L0 5Z"></path>
            </svg>
        `
        this.stylize();
    }

    stylize() {
        const style = {
            position: 'absolute',
            fill: this.fill
        }

        Object.entries(style).forEach(([k, v]) => this.shadowRoot.firstElementChild.style.setProperty(k, v));
    }
}

class HexUnit extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.width = 80;
        this.height = this.width * 2 / Math.sqrt(3);
        this.fill = '#32e';
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <svg viewbox="0 0 17.32050807568877 20">
                <path d="M8.660254037844386 0L17.32050807568877 5L17.32050807568877 15L8.660254037844386 20L0 15L0 5Z"></path>
            </svg>
        `
        this.stylize();
    }

    select() {
        this.fill = '#2a5';
        this.stylize();
    }
    
    deselect() {
        this.fill = '#32e';
        this.stylize();
    }

    stylize() {
        const style = {
            transform: 'scale(0.7)',
            position: 'absolute',
            fill: this.fill
        }

        Object.entries(style).forEach(([k, v]) => this.shadowRoot.firstElementChild.style.setProperty(k, v));
    }
}

const createHexTileContainer = ([x, y]) => {
    const el = document.createElement('hex-tile-container');
    el.setAttribute('x', x);
    el.setAttribute('y', y);
    return el;
}

class HexGrid extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const tiles = this.arr.map(createHexTileContainer);
        tiles.forEach(t => this.appendChild(t));

        this.stylize();

        this.shadowRoot.innerHTML = `
            <slot></slot>
        `

        const f = e => {
            this.selected && this.selected.deselect();
            this.selected = e.target;
            this.selected.select();
        };

        this.addEventListener('click', f);
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

    get arr() {
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

        const permuted = permuteCoords(this.x, this.y);
        return permuted;
    }

    get x() {
        return Number.parseInt(this.getAttribute('x'));
    }

    get y() {
        return Number.parseInt(this.getAttribute('y'));
    }
}

customElements.define('hex-grid', HexGrid);
customElements.define('hex-tile-container', HexTileContainer);
customElements.define('hex-tile', HexTile);
customElements.define('hex-unit', HexUnit);