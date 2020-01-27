function unique(figureArray, x, y) {
    for (item of figureArray) {
        if (typeof item !== "undefined" && item.x == x && item.y == y)
            return false;
    }
    return true;
}

function myRandom(limit) {
    return Math.floor(Math.random() * limit);
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
                        if (y + 1 < 20 && unique(figureArray, x, y + 1)) {
                            figureArray[iter] = {
                                x: x,
                                y: y + 1,
                                angle: angle
                            };
                            iter++;
                        }
                        break;

                    case 1:
                        if (x + 1 < 20 && unique(figureArray, x + 1, y)) {
                            figureArray[iter] = {
                                x: x + 1,
                                y: y,
                                angle: angle
                            };
                            iter++;
                        }
                        break;

                    case 2:
                        if (y - 1 >= 0 && unique(figureArray, x, y - 1)) {
                            figureArray[iter] = {
                                x: x,
                                y: y - 1,
                                angle: angle
                            };
                            iter++;
                        }
                        break;

                    case 3:
                        if (x - 1 >= 0 && unique(figureArray, x - 1, y)) {
                            figureArray[iter] = {
                                x: x - 1,
                                y: y,
                                angle: angle
                            };
                            iter++;
                        }
                        break;
                }
            }
        }
        if (typeof figureArray[currentObject + 1] !== "undefined")
            currentObject++;
    }

    return figureArray;
}

function getRating(figure, objects) {
    let totalConnections = 0;
    let goodConnections = 0;

    for (item of figure) {
        // debugger;
        if (item.y - 1 >= 0 && objects[item.x][item.y - 1].isSVG == 1) {
            // x i y są na odwrót gdy się wyświetlają na stronie.
            totalConnections++;
            if (
                (item.angle == 0 || item.angle == 3) &&
                (objects[item.x][item.y - 1].rotate == 1 ||
                    objects[item.x][item.y - 1].rotate == 2)
            )
                goodConnections++;
        }
        if (item.x + 1 < 20 && objects[item.x + 1][item.y].isSVG == 1) {
            totalConnections++;
            if (
                (item.angle == 3 || item.angle == 2) &&
                (objects[item.x + 1][item.y].rotate == 0 ||
                    objects[item.x + 1][item.y].rotate == 1)
            )
                goodConnections++;
        }
        if (item.y + 1 < 20 && objects[item.x][item.y + 1].isSVG == 1) {
            totalConnections++;
            if (
                (item.angle == 1 || item.angle == 2) &&
                (objects[item.x][item.y + 1].rotate == 0 ||
                    objects[item.x][item.y + 1].rotate == 3)
            )
                goodConnections++;
        }
        if (item.x - 1 > 0 && objects[item.x - 1][item.y].isSVG == 1) {
            totalConnections++;
            if (
                (item.angle == 0 || item.angle == 1) &&
                (objects[item.x - 1][item.y].rotate == 3 ||
                    objects[item.x - 1][item.y].rotate == 2)
            )
                goodConnections++;
        }
    }
    return goodConnections / totalConnections;
}

function initGenetarion(population) {
    for (let i = 0; i < 20; i++) {
        let individual = generateRandomShape();
        individual.forEach(element => {
            objects[element.x][element.y] = { isSVG: 1, rotate: element.angle };
        });

        population[i] = {
            individual: individual,
            rating: getRating(individual, objects)
        };
    }
}

function drawImage(figureArray, objects) {
    clearDrawing();
    figureArray.forEach(element => {
        objects[element.x][element.y] = { isSVG: 1, rotate: element.angle };
    });
    updateDOM(objects);
}

function simulation() {
    if (evolIteration === 0) {
        initGenetarion(population);
    } else {
        population = [...best];
        let increment = 1;
        let iter = 0;

        for (let i = 0; i < 15; i++) {
            if (i >= 8) {
                increment = 2;
            } else if (i > 13) {
                increment = 3;
            }

            let figure;
            if (i % 2 === 0) {
                figure = best[iter].individual
                    .slice(0, best[iter].individual.length / 2)
                    .concat(
                        best[iter + increment].individual.slice(
                            best[iter + increment].individual.length / 2,
                            best[iter + increment].individual.length
                        )
                    );
            } else {
                figure = best[iter].individual
                    .slice(
                        best[iter].individual.length / 2,
                        best[iter].individual.length
                    )
                    .concat(
                        best[iter + increment].individual.slice(
                            0,
                            best[iter + increment].individual.length / 2
                        )
                    );
                iter = (iter + 1) % 5;
            }

            population.push({
                individual: figure,
                rating: getRating(figure, objects)
            });
        }
    }

    population.sort((a, b) => {
        return a.rating > b.rating;
    });

    for (let i = 0; i < 5; i++) {
        best[i] = population.pop();
        best[i].individual.sort((a, b) => {
            return a.y > b.y;
        });
    }

    evolIteration++;
}
