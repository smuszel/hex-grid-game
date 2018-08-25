import UnitPlayer from 'components/unit-player';
import HexGrid from 'components/hex-grid';

export const start = () => {
    const hexGrid = document.querySelector('hex-grid') as HexGrid;
    const player = document.createElement('unit-player') as UnitPlayer;

    player.setAttribute('x', '3');
    player.setAttribute('y', '5');

    hexGrid.appendChild(player);
}