const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = 1850;
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

let coords = [
    "40.513702706212136,-74.25094856333888",
    "40.5135274739092,-74.2513117378893",
    "40.51771494709943,-74.24053885524668",
    "40.51623771913662,-74.24320531415461",
    "40.51617782223656,-74.24331595714288",
    "40.51612228335202,-74.24343043668422",
    "40.51607124532244,-74.24354845834176",
    "40.516024839411244,-74.24366971857096",
    "40.51598318496835,-74.24379390550006",
    "40.51591651444413,-74.24399206493895",
    "40.51583136896361,-74.24432768613734",
    "40.51575287533209,-74.24466607958949",
    "40.515681086035265,-74.24500701901573",
    "40.515616049075724,-74.24535027643637",
    "40.51558491012518,-74.24547594680593",
    "40.515543731012855,-74.245642010213",
    "40.515420870864205,-74.24612293661905",
    "40.51529318054604,-74.24660169711586",
    "40.51516068227985,-74.24707820839866",
    "40.51502339912371,-74.2475523875555",
    "40.51500277137253,-74.2476394344419",
    "40.51498587195015,-74.2477278502982",
    "40.51497275321327,-74.24781736119905",
    "40.5149589415877,-74.24791587928073",
    "40.51494043995584,-74.24801306788119",
    "40.51491732121488,-74.24810854407434",
    "40.514889676453585,-74.2482019316821",
    "40.514857614593275,-74.24829286275681",
    "40.51478910243419,-74.24848411786576",
    "40.51452763420728,-74.24919086045232",
    "40.51448000219159,-74.24931318683461",
    "40.51442845903059,-74.24943276022246",
    "40.51428335459162,-74.2497594147286",
    "40.51404393733051,-74.25028768254116",
    "40.51375322985245,-74.2508438528998",
];

// coords.forEach(coord => {
//     console.log(
//         parseFloat(coord.split(',')[0].substring(4).substring(0,4)),
//         parseFloat(coord.split(',')[1].substring(4).substring(0,4))
//     );
// })

function drawLinesFromObject(coordObject) {
    for (const key in coordObject) {
        if (coordObject.hasOwnProperty(key)) {
            const lines = coordObject[key];

            for(let i = 1; i < lines.length; i++) {
                let splited_prev_coords = lines[i - 1].split(',')
                let splited_cur_coords = lines[i].split(',')

                drawLine(parseFloat(splited_prev_coords[0]), parseFloat(splited_prev_coords[1]), parseFloat(splited_cur_coords[0]), parseFloat(splited_cur_coords[1]));
            }
        }
    }
}

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

const scale = 10000;
const origin = {
    x: -2153700,
    y: 678100
}

function drawDotsFromObject(coordObject) {
    for(let i = 0; i < coordObject.length; i++) {
        let splited_cur_coords = coordObject[i].split(',')

        let coordinate = jingle(parseFloat(splited_cur_coords[1]), parseFloat(splited_cur_coords[0]));

        context.fillRect(coordinate[0], coordinate[1], 5, 5);
    }
}

function jingle(x, y) {
    console.log(canvas.height);
    return [
        x * canvas.width / 360 + canvas.width / 2,
        y * canvas.height / 180 + canvas.height / 2,
    ];
}

drawDotsFromObject(coords);
