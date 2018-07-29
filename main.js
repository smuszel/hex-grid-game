const gridStats = {
    width: 10,
    height: 10,

    hexWidth: 80,
    hexHeight: 92.37604307034013,
    hexBorder: 2
}

const compose = (...fns) => fns.reduce(
    (f, g) => (...args) => f(g(...args)));

const repeat2 = (f, xs, ys) => {
    const result = [];
    for (let x of xs) {
        for (let y of ys) {
            result.push(f(x, y))
        }
    }

    return result;
}

const appendRoot = x => {
    document.querySelector('#root').appendChild(x);
    return x;
};

const popTemplate = () => {
    const root = document.querySelector('#root');
    const clone = root.firstElementChild.cloneNode(true);
    root.removeChild(root.firstElementChild);

    return clone;
}

const createTileContainerFromTemplate = template => (x, y) => {
    const templateClone = template.cloneNode(true);
    templateClone.setAttribute('x', x);
    templateClone.setAttribute('y', y);

    return templateClone;
}

const addClickLog = tileContainer => {
    tileContainer.addEventListener('click', e => console.log(e.target.getAttribute('x'), e.target.getAttribute('y')))
    tileContainer.addEventListener('click', e => e.target.setAttribute('style', 'fill: #da4;'));
    return tileContainer;
}

const translate = tileContainer => {
    x = tileContainer.getAttribute('x');
    y = tileContainer.getAttribute('y');
    const sign = z => z % 2 == 0 ? (-1) : 1;

    const paddingX = gridStats.hexWidth * 1 / 6.6;
    const offsetX = gridStats.hexWidth * 1 / 4 * sign(y);
    const positionX = x * gridStats.hexWidth;
    const borderX = x * gridStats.hexBorder;
    
    const positionY = y * gridStats.hexHeight;
    const offsetY = y * gridStats.hexHeight * 1 / 4;
    const borderY = y * gridStats.hexBorder;

    const dx = positionX + offsetX + paddingX + borderX;
    const dy = positionY - offsetY + borderY;

    tileContainer.setAttribute('style', `top: ${dy}px; left: ${dx}px`)
    return tileContainer;
}

const initializeSkeleton = () => {
    const xs = [...Array(gridStats.width).keys()];
    const ys = [...Array(gridStats.height).keys()];
    const createTileContainer = createTileContainerFromTemplate(popTemplate());

    const f = compose(translate, addClickLog, appendRoot, createTileContainer);
    repeat2(f, xs, ys);
}

const main = () => {
    initializeSkeleton();
}; main();



// // Instantiate new Snap.svg
// var paper = Snap.select('#svg');

// $(document).ready(function () {
//     // sudo make me hexagons
//     hexArr([5, 5], 50, 5);
// });


// /*
//  * Draw single hexagon and apply style if needed
//  *
//  * @coord - array, `x` and `y` point
//  * @radius - object, style your hexagon
//  */
// var drawHex = function (coord, style) {
//     style = style || {};

//     paper.polyline(coord).attr(style);
// };


// /*
//  * Calculate coordinates for one HEX-(a)-gone xD
//  *
//  * @center - array
//  * @radius - radius of the virtual wrapping circle
//  */
// var calculateHex = function (center, radius) {

//     var x = center[0],
//         y = center[1];

//     // some 3rd grade math :)
//     var h = (radius * Math.sqrt(3)) / 2;

//     // All corner points of the hexagon
//     return [
//         [x - radius / 2, y + h],
//         [x + radius / 2, y + h],
//         [x + radius, y],
//         [x + radius / 2, y - h],
//         [x - radius / 2, y - h],
//         [x - radius, y],
//         [x - radius / 2, y + h]
//     ];
// };

// /*
//  * Creates a bunch of predefined points for a grid
//  *
//  * @size - horizontal (times) vertical
//  * @radius - radius of a single virtual wrapping circle
//  */
// /* var hexArr = function (size, radius, gap) {

// 	// Horizontal array
// 	for (var i = 0; i < size[1]; i++) {

// 		// Offset every second row
// 		// var offsetX = 0, //i%2 == 0 ? 0 : radius * 1.5,
// 		// 		offsetY = gap * i;
		
// 		// Vertical array
// 		for (var j = 0; j < size[0]; j++) {
			
// 			let x = (offsetX + j * radius*3) + radius,
// 					y = i *  + radius
			
// 			// Calculate single object
// 			var hex = calculateHex([x,y], radius);
			
// 			// Let's be artistic and cross our fingers that this work :)
// 			drawHex(hex);

// 		}
// 	}
// }; */

// let hexArr = (size, radius, gap) => {
//     for (let i = 0; i < size[0]; i++) {
//         for (let j = 0; j < size[1]; j++) {
//             let h = (radius * Math.sqrt(3)) / 2,
//                 x = (radius + gap) * 2 * i,
//                 y = (radius - (radius - h) + gap) * 2 * j;

//             y = i % 2 === 0 ? y : radius * j;
//             //x = i%2 === 0 ? x : (x) + h;



//             let hex = calculateHex([x, y], radius);
//             drawHex(hex);
//         }
//     }
// }

