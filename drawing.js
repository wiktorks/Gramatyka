let mySVG = `<svg height="100" width="100">
<path d="M 0 100 C 50 100, 100 50, 100 0" stroke="black" fill="transparent" />
<path d="M 0 90 C 45 90, 90 45, 90 0" stroke="black" fill="transparent" />
<path d="M 0 80 C 40 80, 80 40, 80 0" stroke="black" fill="transparent" />
<path d="M 0 70 C 35 70, 70 35, 70 0" stroke="black" fill="transparent" />
<path d="M 0 60 C 30 60, 60 30, 60 0" stroke="black" fill="transparent" />
<path d="M 0 50 C 25 50, 50 25, 50 0" stroke="black" fill="transparent" />
<path d="M 0 40 C 20 40, 40 20, 40 0" stroke="black" fill="transparent" />
<path d="M 0 30 C 15 30, 30 15, 30 0" stroke="black" fill="transparent" />
<path d="M 0 20 C 10 20, 20 10, 20 0" stroke="black" fill="transparent" />
<path d="M 0 10 C 5 10, 10 5, 10 0" stroke="black" fill="transparent" />
</svg>`;

// let objects = new Array(20);

function addElement(event) {
    let sideCoordinates = event.data.sideCoordinates;
    let isLeft = event.data.isLeft;
    let currentObject = $(".selected");
    let [row, column] = currentObject.attr("id").split("-");
    let objects = event.data.objects;
    let newRow = row,
        newColumn = column,
        newRotate;

    switch (sideCoordinates) {
        case "01":
            newRow--;
            newRotate = isLeft ? 3 : 2;
            break;

        case "12":
            newColumn++;
            newRotate = isLeft ? 0 : 3;
            break;

        case "23":
            newRow++;
            newRotate = isLeft ? 0 : 1;
            break;

        case "30":
            newColumn--;
            newRotate = isLeft ? 2 : 1;
            break;
    }

    if (objects[newRow][newColumn].isSVG === 0) {
        objects[newRow][newColumn] = { isSVG: 1, rotate: newRotate };
        updateDOM(objects);
        currentObject.removeClass("selected");
        $(`#${newRow}-${newColumn}`).addClass("selected");
    }
}

function drawRandom() {
    let figureArray = generateRandomShape();
    drawImage(figureArray, objects);
    getRating(figureArray, objects);
}

function clearDrawing() {
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
            objects[i][j] = { isSVG: 0, rotate: 0 };
        }
    }
    objects[10][10] = { isSVG: 1, rotate: 0 };
    $("#10-10").addClass("selected");
    updateDOM(objects);
}

function updateDOM(objects) {
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
            let cell = $(`#${i}-${j}`);
            if (objects[i][j].isSVG !== 0) {
                cell.html(mySVG);
                cell.children()
                    .first()
                    .attr("transform", `rotate(${objects[i][j].rotate * 90})`);
            } else {
                cell.empty();
            }
        }
    }
}

function drawBestImage() {
    let bestNum = document.getElementById("best").value;
    document.getElementById("rate").value = best[bestNum-1].rating;
    drawImage(best[bestNum-1].individual, objects);
}