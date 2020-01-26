/* Zewolucjonizować gramatykę (funkcjia dopasowania):
    - generacja populacji początkowej (genotyp, fenotyp)
    - populacja początkowa
    - funkcja dopasowania
    - mutacja
    - selekcja
    - krzyżowanie

    najlepiej w tablicy punkty (reguły gramatyki generująacej dany kształt)
    Nie trzeba pilnować poprawności gramatyki.
*/


let objects = new Array(20);
for (let i = 0; i < 20; i++) {
    objects[i] = new Array(20);
}

$(document).ready(function () {

    for (let i = 0; i < 20; i++) {
        $('.container').append(`<div id="${i}" class="item-wrapper"></div`);
        let wrapper = $(`#${i}`);
        for (let j = 0; j < 20; j++) {
            objects[i][j] = { isSVG: 0, rotate: 1 };
            wrapper.append(`<div id="${i}-${j}" class="item"></div>`);
        }
    }

    objects[10][10] = { isSVG: 1, rotate: 0 };
    $('#10-10').addClass('selected');
    updateDOM(objects);

    drawRandom();

    $('.item').on('click', function () {
        if (this.childNodes.length > 0) {
            $('.item').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    $('#left .top').on('click', {sideCoordinates: '30', isLeft: false, objects: objects}, addElement);
    $('#left .bottom').on('click', {sideCoordinates: '30', isLeft: true, objects: objects}, addElement);

    $('#up .side-left').on('click', {sideCoordinates: '01', isLeft: true, objects: objects}, addElement);
    $('#up .side-right').on('click', {sideCoordinates: '01', isLeft: false, objects: objects}, addElement);

    $('#right .top').on('click', {sideCoordinates: '12', isLeft: true, objects: objects}, addElement);
    $('#right .bottom').on('click', {sideCoordinates: '12', isLeft: false, objects: objects}, addElement);

    $('#down .side-left').on('click', {sideCoordinates: '23', isLeft: true, objects: objects}, addElement);
    $('#down .side-right').on('click', {sideCoordinates: '23', isLeft: false, objects: objects}, addElement);

    $('#delete').on('click', clearDrawing);
});