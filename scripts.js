const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width= 1850;
canvas.height = 825;

function handleClick(e) {
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;

    console.log(`Clicked at: (${x.toFixed(2)}, ${y.toFixed(2)})`);
}

canvas.addEventListener('click', handleClick);

function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
}

function drawLinesFromObject(coordObject) {
    for (const key in coordObject) {
        if (coordObject.hasOwnProperty(key)) {
            const lines = coordObject[key];
            lines.forEach(line => {
                drawLine(line.x1, line.y1, line.x2, line.y2);
            });
        }
    }
}

let coordinates = {
    'Rudaki': [
        [1, 2],
        [5, 2],
        [7, 2],
        [98, 2],
    ],
    'Somoni': [
        [3, 62],
        [6, 5],
        [13, 25],
        [16, 23],
    ],
};

function calcHypotenuse(x1, y1, x2, y2){
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function findNearestStreet(x, y, coordinates) {
    const streets = [];

    for (const [key, value] of Object.entries(coordinates)) {
        for (let i = 0; i < value.length; i++) {
            const distance = calcHypotenuse(x, y, value[i][0], value[i][1]);
            streets.push({ name: key, distance });
        }
    }

    streets.sort((a, b) => a.distance - b.distance);

    return streets[0];
}
