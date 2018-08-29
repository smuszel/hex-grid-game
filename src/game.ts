import UnitPlayer from 'components/unit-player';
import HexGrid from 'components/hex-grid';
import { move } from './tools/move';
import { invokeRepeatedly } from './tools/invokeRepeatedly';
import { randomizeInt } from './tools/randomizeInt';
import UnitEdible from './components/unit-edible';

export const game = () => {
    let gameIsOver = false;
    const loopBaseInterval = 2000;
    const maxEdiblesPercent = 0.6;
    const ediblesSpawnedBase = 4;

    const hexGrid = document.querySelector('hex-grid') as HexGrid;
    const player = document.querySelector('unit-player') as UnitPlayer;


    const spawnSomeEdibles = () => {
        const spawn = () => {
            const instance = UnitEdible.construct().appendTo(hexGrid);
            instance.setAttribute('life', '1');
            const coordinates = hexGrid.randomVacantCoords;
            instance.setAttribute('x', `${coordinates[0]}`);
            instance.setAttribute('y', `${coordinates[1]}`);
        };

        const n = randomizeInt(ediblesSpawnedBase);

        invokeRepeatedly(spawn, n);
    }
    
    const gameOver = () => {
        gameIsOver = true;
        document.body.innerHTML = 'game over';
    }

    const gameStart = () => {
        move(player, hexGrid.randomVacantCoords);
        // hexGrid.addEventListener('movement', spawnSomeEdibles);
        gameLoop();
    }

    const gameLoop = () => {
        if (gameIsOver) {
            return
        } else {
            turnRoutine();
            setTimeout(gameLoop, randomizeInt(loopBaseInterval));
        }
    }

    const turnRoutine = () => {
        const currentEdiblesPercent = (hexGrid.ediblesCount / hexGrid.totalSize);
        const ediblesOverflow = currentEdiblesPercent > maxEdiblesPercent;
        
        if (ediblesOverflow) {
            gameOver();
        } else {
            spawnSomeEdibles();
        }
    }

    return gameStart;
}


// const cssPointerPosition = () => {

    // const moveHandler = ev => {
    //     console.log('aa');
    //     document.body.style.setProperty('--mouseX', `${ev.pageX}px`);
    //     document.body.style.setProperty('--mouseY', `${ev.pageY}px`);
    // }

    // const upHandler = ev => {
    //     document.body.style.setProperty('--mouseX', `${ev.pageX}px`);
    //     document.body.style.setProperty('--mouseY', `${ev.pageY}px`);
    //     abort()
    // }
    
    // const downHandler = ev => {
    //     document.body.style.setProperty('--mouseX', `${ev.pageX}px`);
    //     document.body.style.setProperty('--mouseY', `${ev.pageY}px`);
    //     document.body.addEventListener('mousemove', moveHandler);
    // }
    
    // const abort = () => {
    //     document.body.removeEventListener('mousemove', moveHandler);
    // }

    // document.body.addEventListener('mousedown', downHandler);
    // document.body.addEventListener('mouseup', upHandler);
    // document.body.addEventListener('mouseleave', abort);
// }

function maybeMonad(target, propName, descriptor) {
    const original = descriptor.value;

    const f = (gen, val?) => {
        const state = gen.next(val);

        if (state.done) {
            return state.value;
        } else if (state.value == null) {
            return null
        } else {
            return f(gen, state.value);
        }
    }
    
    descriptor.value = function (...args) {
        const g = original.apply(this, args);
        const res = f(g);

        return res;
    }

    return descriptor;
}

class Example {

    @maybeMonad
    *unstableComputation(arg) {
        const x = yield arg.foo;
        console.log('I have passed!', x);

        return x;
    }
}

const exp = () => {
    const ex = new Example();
    
    const obj1 = { foo: 1 };
    const obj2 = { bar: 2 };

    ex.unstableComputation(obj1);
    ex.unstableComputation(obj2);
}
