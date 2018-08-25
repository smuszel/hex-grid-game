export default class UnitPlayer extends HTMLElement {
    private _x;
    private _y;

    constructor() {
        super();
    }

    connectedCallback() {
        this.x = this.getAttribute('x');
        this.y = this.getAttribute('y');

        this.addEventListener('click', () => console.log('abc'));
        this.classList.add('centered');
        this.draggifySelf();
    }

    draggifySelf() {
        const dragMove = (ev: DragEvent) => {
            this.classList.add('dragged');
            this.style.setProperty('--pageXDrag', `${ev.pageX}px`);
            this.style.setProperty('--pageYDrag', `${ev.pageY}px`);
        }
        
        const dragStart = (ev: DragEvent) => {
            // this.style.setProperty('--xxx', `${ev.pageX}px`);
            // this.style.setProperty('--yyy', `${ev.pageY}px`);
            // this.classList.add('dragged');

            this.parentElement.addEventListener('mousemove', dragMove)
            this.parentElement.addEventListener('mouseleave', dragAbort)
            this.parentElement.addEventListener('mouseup', dragAbort)
        }

        const dragEnd = ev => {
            dragAbort();
        }

        const dragAbort = () => {
            console.log('abort');
            this.classList.remove('dragged');
            this.parentElement.removeEventListener('mousemove', dragMove);
            this.parentElement.removeEventListener('mouseleave', dragAbort);
            this.parentElement.removeEventListener('mouseup', dragAbort);
        }

        this.addEventListener('mousedown', dragStart);
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


// const draggify = reference => target => {
//     let originX, originY;

//     dragMove = ev => {
//         const x = ev.pageX - originX;
//         const y = ev.pageY - originY;
//         target.style.setProperty('--dragOffsetLeft', x);
//         target.style.setProperty('--dragOffsetTop', y);
//     }

//     dragStart = ev => {
//         console.log('start');
//         target.classList.add('dragged');
//         originX = ev.pageX;
//         originY = ev.pageY;

//         reference.addEventListener('mousemove', dragMove)
//         reference.addEventListener('mouseleave', dragAbort)
//         reference.addEventListener('mousedown', )
//     }

//     dragEnd = ev => {
//         dragAbort();
//     }

//     dragAbort = () => {
//         console.log('end');
//         target.classList.remove('dragged');
//         reference.removeEventListener('mousemove', dragMove);
//         reference.removeEventListener('mouseleave', dragAbort);

//         originX = undefined;
//         originY = undefined;
//         target.style.setProperty('--dragOffsetLeft', 0);
//         target.style.setProperty('--dragOffsetTop', 0);
//     }

//     reference.addEventListener('mousedown', dragStart);
// }