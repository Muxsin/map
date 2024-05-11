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
