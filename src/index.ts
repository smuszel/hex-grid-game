import { game } from './game';
import HexGrid from './components/hex-grid';
import HexTile from './components/hex-tile';
import UnitEdible from './components/unit-edible';
import UnitPlayer from './components/unit-player';

import './index.scss';

customElements.define('hex-grid', HexGrid);
customElements.define('hex-tile', HexTile);
customElements.define('unit-edible', UnitEdible);
customElements.define('unit-player', UnitPlayer);

game()();