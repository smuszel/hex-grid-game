import UnitPlayer from 'components/unit-player';
import HexGrid from 'components/hex-grid';
import UnitEadible from 'components/unit-eadible';

export const start = () => {
    const hexGrid = document.querySelector('hex-grid') as HexGrid;
    const player = document.createElement('unit-player') as UnitPlayer;

    const e1 = document.createElement('unit-eadible') as UnitEadible;
    const e2 = document.createElement('unit-eadible') as UnitEadible;
    const e3 = document.createElement('unit-eadible') as UnitEadible;

    player.setAttribute('x', '3');
    player.setAttribute('y', '5');

    e1.setAttribute('x', '1');
    e1.setAttribute('y', '1');
    e1.setAttribute('life', '1');
    
    e2.setAttribute('x', '2');
    e2.setAttribute('y', '2');
    e2.setAttribute('life', '1');
    
    e3.setAttribute('x', '3');
    e3.setAttribute('y', '4');
    e3.setAttribute('life', '1');
    
    hexGrid.appendChild(player);
    hexGrid.appendChild(e1);
    hexGrid.appendChild(e2);
    hexGrid.appendChild(e3);

    let opt: MutationObserverInit

    opt = {
        // childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['x', 'y']
    };

    const ob = new MutationObserver(console.log);
    ob.observe(document.querySelector('hex-grid'), opt);
    console.log(ob);
}
