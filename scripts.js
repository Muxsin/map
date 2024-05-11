const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width= 500;
canvas.height = 500;

function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
}
