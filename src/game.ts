import UnitPlayer from 'components/unit-player';
import HexGrid from 'components/hex-grid';
import { move } from './tools/move';
import { invokeRepeatedly } from './tools/invokeRepeatedly';
import { randomizeInt } from './tools/randomizeInt';
import UnitEdible from './components/unit-edible';

export const game = () => {
    let gameIsOver = false;
    const edibleRemovalBaseInterval = 20000;
    const loopBaseInterval = 2000;
    const maxEdiblesPercent = 0.6;
    const ediblesSpawnedBase = 4;

    const hexGrid = document.querySelector('hex-grid') as HexGrid;
    const player = document.querySelector('unit-player') as UnitPlayer;

    const spawnSomeEdibles = () => {
        const spawn = () => {
            const instance = UnitEdible.construct().appendTo(hexGrid);
            instance.setAttribute('life', '2');
            const coordinates = hexGrid.randomVacantCoords;
            instance.setAttribute('x', `${coordinates[0]}`);
            instance.setAttribute('y', `${coordinates[1]}`);

            setTimeout(() => instance.spoil(), edibleRemovalBaseInterval);
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
        hexGrid.addEventListener('movement', subtractPlayerLife);
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

    const subtractPlayerLife = () => {
        const currentLife = parseInt(player.getAttribute('life'));
        
        if (currentLife === 1) {
            gameOver();
        } else {
            player.setAttribute('life', `${currentLife - 1}`);
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