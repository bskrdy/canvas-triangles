let canvas, ctx, dragging = false, dragStartPosition, snapshot;
const colors = ['red', 'green', 'blue', 'purple', 'brown', '#064420', '#9FE6A0', '#CC9B6D', '#23049D', '#C67ACE', '#FF2626', '#0F52BA', '#64C9CF', '#FFB740', '#512D6D', '#FFF338', '#D9DD6B', '#C2B8A3', '#BF1363'];

//Initial Function
function init() {
    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');

    // Canvas size
    ctx.canvas.width = 0.8 * window.innerWidth;
    ctx.canvas.height = 0.6 * window.innerHeight;

    // Events
    canvas.addEventListener('mousedown', dragStart, false);
    canvas.addEventListener('mousemove', drag, false);
    canvas.addEventListener('mouseup', dragStop, false);

    //Clear
    document.querySelector('button').addEventListener('click', function () {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }, false);
}

//Origin location
function getCoordinates(e) {
    let x = e.clientX - canvas.getBoundingClientRect().left,
        y = e.clientY - canvas.getBoundingClientRect().top;

    return { x: x, y: y };
}

//Object Initialization
function initCondition(e) {
    let position = getCoordinates(e);
    let triangle = new Triangle(position);
    triangle.draw(ctx);
}

function dragStart(e) {
    dragging = true;
    dragStartPosition = getCoordinates(e);
    ctx.fillStyle = `${colors[Math.floor(Math.random() * colors.length)]}`;
}

function drag(e) {
    if (dragging === true)
        initCondition(e);
}

function dragStop(e) {
    dragging = false;
    initCondition(e);
}

// Triangle class
class Triangle {
    constructor(position) {
        this.position = position;
    }
    draw(ctx) {
        let coordinates = [],
            posX = dragStartPosition.x - this.position.x,
            posY = dragStartPosition.y - this.position.y,
            radius = Math.sqrt(Math.pow(posX, 2) + Math.pow(posY, 2)),
            angle = Math.PI / 2,
            i = 0;

        for (i = 0; i < 3; i++) {
            coordinates.push({ x: dragStartPosition.x + radius * Math.cos(angle), y: dragStartPosition.y - radius * Math.sin(angle) });
            angle += (2 * Math.PI) / 3;
        }

        ctx.beginPath();
        ctx.moveTo(coordinates[0].x, coordinates[0].y);
        for (i = 1; i < 3; i++) {
            ctx.lineTo(coordinates[i].x, coordinates[i].y);
        }
        ctx.closePath();
        ctx.fill();
    }
}

window.addEventListener('load', init, false);
