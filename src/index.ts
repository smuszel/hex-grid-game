import { start } from './game/start';
import HexGrid from './components/hex-grid';
import HexTile from './components/hex-tile';
import UnitEadible from './components/unit-eadible';
import UnitEnemy from './components/unit-enemy';
import UnitPlayer from './components/unit-player';

import './index.scss';

customElements.define('hex-grid', HexGrid);
customElements.define('hex-tile', HexTile);
customElements.define('unit-eadible', UnitEadible);
customElements.define('unit-enemy', UnitEnemy);
customElements.define('unit-player', UnitPlayer);

document.body.querySelector('#root').innerHTML = `
    <hex-grid at="10" sizeX="10" sizeY="10"></hex-grid>
`;

start();