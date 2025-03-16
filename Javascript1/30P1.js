// Brady Jones 03/16/2025
/* Original creator: https://javascript30.com/
 *
 * New elements:
 * Math object methods (https://www.w3schools.com/js/js_math.asp) 
 * input event (https://www.w3schools.com/jsref/dom_obj_event.asp)
 * Template Literal & string interpolation (https://www.w3schools.com/js/js_string_templates.asp)
 */
const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
ctx.strokeStlye = "#000000";
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

const backgroundPreview = document.getElementById("backgroundPreview");
const backgroundConfirm = document.getElementById("backgroundConfirm");
const background = document.getElementById("backgroundInput");

const inkPreview = document.getElementById("inkPreview");
const inkConfirm = document.getElementById("inkConfirm");
const ink = document.getElementById("inkInput");

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function draw(e) {
    if (!isDrawing) return;
    ctx.beginPath();

    // start from
    ctx.moveTo(lastX, lastY);
    // go to
    ctx.lineTo(e.offsetX, e.offsetY);

    // increase stroke width parallel to cursor speed
    let difference = Math.abs(lastX - e.offsetX) + Math.abs(lastY - e.offsetY);
    ctx.lineWidth = Math.min(difference * 2, 75);

    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

background.addEventListener('input', () => 
    backgroundPreview.style.backgroundColor = `#${background.value}`);
background.addEventListener('keydown', function (event) {
    if (event.code == "Enter") {
        canvas.style.backgroundColor = `#${background.value}`;
    }
});
backgroundConfirm.addEventListener('click', () =>
    canvas.style.backgroundColor = `#${background.value}`);

ink.addEventListener('input', () =>
    inkPreview.style.backgroundColor = `#${ink.value}`);
ink.addEventListener('keydown', function (event) {
    if (event.code == "Enter") {
        ctx.strokeStyle = `#${ink.value}`;
    }
});
inkConfirm.addEventListener('click', () => ctx.strokeStyle = `#${ink.value}`);