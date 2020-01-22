function unique(figureArray, x, y) {
    for(item of figureArray) {
        console.log(item);
        if(typeof item !== 'undefined' && item.x == x && item.y == y)
            return false;
    }
    return true;
}

function generateRandomShape() {
    let figureSize = 20;

    let figureArray = new Array(figureSize);
    figureArray[0] = { x: 10, y: 10, angle: 0 };

    let currentObject = 0;
    let iter = 1;
    while (iter < figureSize) {
        // debugger;
        let x = figureArray[currentObject].x;
        let y = figureArray[currentObject].y;

        for (let i = 0; i < 4; i++) {
            if (myRandom(2) > 0) {
                let angle = myRandom(4);
                switch (i) {
                    case 0:
                        if (y + 1 < 20 && unique(figureArray, x, y+1)) {
                            figureArray[iter] = { x: x, y: y + 1, angle: angle };
                            iter++;
                        }
                        break;

                    case 1:
                        if (x + 1 < 20 && unique(figureArray, x+1, y)) {
                            figureArray[iter] = { x: x + 1, y: y, angle: angle };
                            iter++;
                        }
                        break;

                    case 2:
                        if (y - 1 >= 0 && unique(figureArray, x, y-1)) {
                            figureArray[iter] = { x: x, y: y - 1, angle: angle };
                            iter++;
                        }
                        break;

                    case 3:
                        if (x - 1 >= 0 && unique(figureArray, x-1, y)) {
                            figureArray[iter] = { x: x - 1, y: y, angle: angle };
                            iter++;
                        }
                        break;
                }
            }
        }
        if(typeof figureArray[currentObject + 1] !== 'undefined') currentObject++;
    }

    return figureArray;
}

function drawImage(figureArray, objects) {
    figureArray.forEach(element => {
        objects[element.x][element.y] = {isSVG: 1, rotate: element.angle};
    });
    updateDOM(objects);
}

function myRandom(limit) {
    return Math.floor(Math.random() * limit);
}

// let figureArray = new Array(5);
// let figure = {x: 10, y: 10, angle: 0};
// figureArray[0] = Object.assign({}, figure);
// console.log(figureArray[0])
// figure.x = 23;
// console.log(figureArray[0])

// let figureArray = new Array(20);
//     figureArray[0] = { x: 10, y: 10, angle: 0 };
//     console.log(figureArray[1]);