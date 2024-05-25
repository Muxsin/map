let s = 410.18627024600187;
let ds = 1.2;
let ox = -74.38765942050578;
let oy = 40.93079715295632;

let data = [];

fetch("./ny.json")
    .then((response) => response.json())
    .then((json) => {
        data = json["data"];
    });

function normalize(x, y) {
    let wppg = width / (360 / s);
    let hppg = height / (180 / s);
    let nx = x - ox;
    let ny = oy - y;

    return [nx * wppg, ny * hppg];
}

function mouseWheel(event) {
    console.log(event.clientX);
    let wgpp = 360 / s / width;
    let hgpp = 180 / s / height;

    let nmx = ox + event.clientX * wgpp;
    let nmy = oy - event.clientY * hgpp;

    if (event.delta < 0) {
        s *= ds;
    }

    if (event.delta > 0) {
        s /= ds;
    }

    ox = nmx - 360 / s / 2;
    oy = nmy + 180 / s / 2;

    redraw();
}

function mouseDragged(event) {
    let wgpp = 360 / s / width;
    let hgpp = 180 / s / height;

    let dx = event.movementX * wgpp;
    let dy = event.movementY * hgpp;

    ox -= dx;
    oy += dy;

    redraw();
}

function setup() {
    createCanvas(1440, 720);
    noStroke();
}

function draw() {
    background(240);
    drawData();
    noLoop();
}

function drawData() {
    data.forEach((elem) => {
        let coord = geoConvert(elem[8]);
        let result = [normalize(coord[0]["longitude"], coord[0]["latitude"])];

        for (let i = 1; i < coord.length - 1; i++) {
            let coord1 = normalize(coord[i]["longitude"], coord[i]["latitude"]);
            if (calcDistance(result[result.length - 1], coord1) < 2) {
                continue;
            }

            result.push(coord1);
        }

        result.push(
            normalize(
                coord[coord.length - 1]["longitude"],
                coord[coord.length - 1]["latitude"]
            )
        );

        beginShape();

        result.forEach(coord => {
            vertex(coord[0], coord[1]);
        })

        endShape();
        stroke(0);
        strokeWeight(2);
    });
}

function geoConvert(input) {
    const regex = /(-?\d+\.\d+ \d+\.\d+)/g;

    let match;
    const coordinates = [];

    while ((match = regex.exec(input)) !== null) {
        obj = {
            longitude: Number(match[0].split(" ")[0]),
            latitude: Number(match[0].split(" ")[1]),
        };
        coordinates.push(obj);
    }

    return coordinates;
}

function calcDistance(xy1, xy2) {
    return Math.sqrt(Math.pow(xy2[0] - xy1[0], 2) + Math.pow(xy2[1] - xy1[1], 2));
}
