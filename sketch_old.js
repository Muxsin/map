const settings = {
    scale: 1,
    origin: {
        x: -180,
        y: -90,
    },
    area: {
        width: 1300,
        height: 825,
    },
    style: {
        background_color: 240
    }
}

const pins = [];

let json = null;

function setup() {
    createCanvas(settings.area.width, settings.area.height);
}

function draw() {
    background(settings.style.background_color);

    drawData(json);
}

function drawData(json) {
    circle(
        ((180 + -74.16725508334979) * settings.area.width * settings.scale) / 360,
        ((90 + 40.54257525478097) * settings.area.height * settings.scale) / 180,
        50 * settings.scale);
}

function mouseClicked() {
    console.log(
        (mouseX * 360 / settings.scale / settings.area.width) + settings.origin.x,
        (mouseY * 180 / settings.scale / settings.area.height) + settings.origin.y
    );
}

function mouseDragged(event) {
    settings.origin.x -= event.movementX / settings.scale;
    settings.origin.y -= event.movementY / settings.scale;
}

function mouseWheel(event) {
    // console.log(
    //     ((mouseX * 360 / settings.scale / settings.area.width) + settings.origin.x) - (360 / settings.scale / 2),
    //     ((mouseY * 180 / settings.scale / settings.area.height) + settings.origin.y) - (180 / settings.scale / 2)
    // );

    let mouseX_pos = (mouseX * 360 / settings.scale / settings.area.width) + settings.origin.x;
    let mouseY_pos = (mouseY * 360 / settings.scale / settings.area.height) + settings.origin.y;

    if (event.delta > 0) {
        settings.scale /= 2;
        settings.origin.x = mouseX_pos - (360 / settings.scale / 2);
        settings.origin.y = mouseY_pos - (180 / settings.scale / 2);
    } else if (event.delta < 0) {
        settings.scale *= 2;
        settings.origin.x = mouseX_pos - (360 / settings.scale / 2);
        settings.origin.y = mouseY_pos - (180 / settings.scale / 2);
    }
}

// TODO
function shouldHighlight() {
    return false;
}

// TODO
function getDistance() {
    return 100;
}

let MULTILINESTRING = "MULTILINESTRING ((\
    -73.8586268225073 40.9001355654965, \
    -73.85861181024539 40.90012974258792), (\
    -73.85861181024539 40.90012974258792, \
    -73.85780289628592 40.89981599003261), (\
    -73.85780289628592 40.89981599003261, -73.85699713081578 40.899503580105225), (-73.85699713081578 40.899503580105225, -73.85619318252682 40.89918797006852), (-73.85619318252682 40.89918797006852, -73.8553866249815 40.89887621331628), (-73.8553866249815 40.89887621331628, -73.85429882761572 40.898449654555904, -73.854297298002 40.89844906370817), (-73.854297298002 40.89844906370817, -73.85343375740602 40.89811538004769), (-73.85343375740602 40.89811538004769, -73.85261600475545 40.89781183086894))";

function parseGeoData() {
    return [
        {
            longitude: -73.8586268225073,
            latitude: 40.9001355654965,
        },
        {
            longitude: -73.85861181024539,
            latitude: 40.90012974258792,
        },
        {
            longitude: -73.85861181024539,
            latitude: 40.90012974258792,
        },
        {
            longitude: -73.85780289628592,
            latitude: 40.89981599003261,
        },
        //...
    ];
}

// TODO
function drawStreet() {

}

// TODO (apply origin and scale) For one vertex
function normalizeVertex(x, y) {
    return {
        x: 1,
        y: 2,
    };
}


function handleClick(x, y) {

}

function convertGeoPoint(longitude, latitude) {
    return {
        x: 1,
        y: 2,
    }
}
