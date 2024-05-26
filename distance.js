document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('myCanvas');
    canvas.width = 1850;
    canvas.height = 825;
    const ctx = canvas.getContext('2d');

    const segments = [
        {start: {x: 100, y: 200}, end: {x: 300, y: 400}},
        {start: {x: 500, y: 600}, end: {x: 700, y: 800}},
    ];

    function drawSegment(segment, isClosest = false) {
        ctx.beginPath();
        ctx.moveTo(segment.start.x, segment.start.y);
        ctx.lineTo(segment.end.x, segment.end.y);
        ctx.strokeStyle = isClosest? 'blue' : '#000';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    function findClosestPoint(segment, P) {
        const A = segment.start;
        const B = segment.end;
        const AB = {x: B.x - A.x, y: B.y - A.y};
        const AP = {x: P.x - A.x, y: P.y - A.y};

        const lengthAB = Math.sqrt(AB.x * AB.x + AB.y * AB.y);
        const normalizedAB = {x: AB.x / lengthAB, y: AB.y / lengthAB};

        const projection = AP.x * normalizedAB.x + AP.y * normalizedAB.y;
        
        if (projection < 0) {
            return A;
        } else if (projection > lengthAB) {
            return B;
        } else {
            const closestPoint = {
                x: A.x + projection * normalizedAB.x,
                y: A.y + projection * normalizedAB.y
            };
            return closestPoint;
        }
    }

    function calculateDistance(point1, point2) {
        return Math.sqrt(Math.pow(point2.y - point1.y, 2) + Math.pow(point2.x - point1.x, 2));
    }

    function handleClick(e) {
        const x = e.clientX - canvas.offsetLeft;
        const y = e.clientY - canvas.offsetTop;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let minDistance = Infinity;
        let closestSegmentIndex = -1;
        segments.forEach((segment, index) => {
            const closestPoint = findClosestPoint(segment, {x, y});
            const distance = calculateDistance({x, y}, closestPoint);

            if (distance < minDistance) {
                minDistance = distance;
                closestSegmentIndex = index;
            }

            drawSegment(segment);
        });

        if (closestSegmentIndex!== -1) {
            const closestSegment = segments[closestSegmentIndex];
            drawSegment(closestSegment, true);
        }

        segments.forEach((segment, index) => {
            const closestPoint = findClosestPoint(segment, {x, y});
            const distance = calculateDistance({x, y}, closestPoint);
            console.log(`Distance to closest point on segment (${segment.start.x}, ${segment.start.y}) to (${segment.end.x}, ${segment.end.y}): ${distance.toFixed(2)}`);
        });
    }

    segments.forEach(segment => {
        drawSegment(segment);
    });

    canvas.addEventListener('click', handleClick);
});
