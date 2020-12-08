var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var h = canvas.height = 500;
var w = canvas.width = 600;
ctx.translate(w / 2, h / 2);

const k = 200;
const dt = 1 / 60;
const m = 1500;
const bob = {
    phi: Math.PI * 0.2,
    v: 2.5,
    a: 4,
    r: 10
};

function drawPendulum() {
    ctx.beginPath()
    ctx.arc(bob.x, bob.y, bob.r, 0, 2 * Math.PI)
    ctx.fill()
    ctx.moveTo(0, 0)
    ctx.lineTo(bob.x, bob.y)
    ctx.stroke()
}


let p = setInterval(function update()) {
    bob.a = -(k / m) * Math.sin(bob.phi);
    bob.phi += bob.v * dt;
    bob.v += bob.a * dt;
    ball.x += ball.v * dt;

    // расчет координат
    bob.x = Math.sin(bob.phi) * L;
    bob.y = Math.cos(bob.phi) * L;
}, 10)


(function draw(dt) {
    update();
    ctx.clearRect(-w / 2, -h / 2, w, h)
    drawPendulum()
    requestAnimationFrame(draw);
})();
canvas {
    display: block;
    margin: 0 auto;
    padding: 0;
}