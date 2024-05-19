const settings = {
    scale: 1,
    origin: {
        x: 0,
        y: 0,
    },
    area: {
        width: 1300,
        height: 825,
    },
    style: {
        background_color: 240
    }
}

let json = [
    {
        longitude: -73.8586268225073,
        latitude: 40.9001355654965,
    },
    {
        longitude: -73.85861181024539,
        latitude: 40.90012974258792,
    },
    {
        longitude: -73.85780289628592,
        latitude: 40.89981599003261,
    },
    {
        longitude: -73.85780289628592,
        latitude: 41.89981599003261,
    },
    {
        longitude: -73.85780289628592,
        latitude: 43.89981599003261,
    },
    {
        longitude: -74.85780289628592,
        latitude: 43.89981599003261,
    },
    {
        longitude: -75.85780289628592,
        latitude: 43.89981599003261,
    },
];

function setup() {
    createCanvas(settings.area.width, settings.area.height);
}

function draw() {
    background(settings.style.background_color);

    drawData(json);

    noLoop();
}

function drawData(json) {
    for(let i = 0; i < json.length - 1; i++) {
        let posX1 = (((180 + json[i].longitude) * settings.area.width) / 360) * settings.scale + settings.origin.x;
        let posY1 = (((90 + json[i].latitude) * settings.area.height) / 180) * settings.scale + settings.origin.y;

        let posX2 = (((180 + json[i + 1].longitude) * settings.area.width) / 360) * settings.scale + settings.origin.x;
        let posY2 = (((90 + json[i + 1].latitude) * settings.area.height) / 180)  * settings.scale + settings.origin.y;

        strokeWeight(2 * settings.scale);

        line(posX1, posY1, posX2, posY2);
    }

    circle(100 * settings.scale + settings.origin.x, 100 * settings.scale + settings.origin.y, 30 * settings.scale);
}

function mouseClicked() {
    let posX = (mouseX * 360) / settings.area.width - 180;
    let posY = (mouseY * 180) / settings.area.height - 90;
}

function mouseDragged(event) {
    settings.origin.x += event.movementX;
    settings.origin.y += event.movementY;

    redraw();
}

function mouseWheel(event) {
    console.log(event);
    if (event.delta < 0) {
        settings.scale *= 1.5;
    } else if (event.delta > 0) {
        settings.scale /= 1.5;
    }

    redraw();
}
