const ctx = document.getElementById("canvas").getContext("2d");
const canvas = document.getElementById("lifeBoard");
let radius = 0.5;

const canvasSize = 1018;
const canvasWidth = 1920;
let noOfParticles = 1;
let startTime = 0;
let animationFrame;
let partials = [];
let scale = 1;
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function createParticles() {
    partials = [];
    for (let i = 0; i < noOfParticles; i++) {
        partials.push(getParticleWithPosition())
    }

}
function getParticleWithPosition() {
    return {
        x: getRandom(canvasWidth),
        y: getRandom(canvasSize),
        vx: 0,
        vy: 0,
        color: showRandomColor.checked ? getRandomColor() : particleColor.value
    }

}

function getRandom(value) {
    return Math.round(Math.random() * value);
}

function getDistance(p1, p2) {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}

function update(time) {
    if (!showPath.checked) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvasWidth, canvasSize);
    }
    // ctx.scale(scale, scale)
    const pForce = parseInt(pForceValue.value) || 0;
    const nForce = parseInt(nForceValue.value) || 0;
    const nDistance = parseInt(nForceDistance.value) || 0;
    for (let j = 0; j < partials.length; j++) {
        for (let i = 0; i < partials.length; i++) {
            if (i !== j) {
                const distance = getDistance(partials[j], partials[i]);
                const force = distance < nDistance ? -nForce : pForce
                let v = force / distance ** 2;

                partials[j].vx += v * (partials[i].x - partials[j].x);
                partials[j].vy += v * (partials[i].y - partials[j].y);
            }

        }
        partials[j].x += partials[j].vx * (((time - startTime) / 1000) || 1);
        partials[j].y += partials[j].vy * (((time - startTime) / 1000) || 1);

        ctx.fillStyle = partials[j].color;
        ctx.fillRect(partials[j].x, partials[j].y, radius, radius);
    }
    startTime = time;
    animationFrame = requestAnimationFrame(update);
}

function start() {
    if (animationFrame) {
        cancelAnimationFrame(animationFrame);
    }
    if (showPath.checked) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvasWidth, canvasSize);
    }

    radius = parseFloat(particleRadius.value);
    noOfParticles = parseInt(particlesNo.value);
    createParticles();
    update();
}

start();
// document.addEventListener("wheel", (e) => {
//     console.log(scale, e.deltaY);
//     if(e.deltaY < 0) {
//         scale+=0.1
//     }else {
//         scale-=0.1
//     }
// })