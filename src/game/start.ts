import UnitPlayer from 'components/unit-player';
import HexGrid from 'components/hex-grid';
import UnitEadible from 'components/unit-eadible';

export const start = () => {
    greet();
    cssPointerPosition();

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
}

const cssPointerPosition = () => {

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
}

const greet = () => {
    // console.log('hello');
}
