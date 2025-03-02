// script.js

const canvas = document.getElementById("faceCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let binaryParticles = [];
let otpDigits = [];
const otpSpeed = 2; // Speed of OTP flow

// Initialize Binary Particles
function createBinaryParticles() {
    const numParticles = 100;
    for (let i = 0; i < numParticles; i++) {
        binaryParticles.push({
            x: canvas.width / 2 + (Math.random() * 100 - 50),
            y: canvas.height / 2 + (Math.random() * 100 - 50),
            dx: (Math.random() - 0.5) * 2,
            dy: (Math.random() - 0.5) * 2,
            bit: Math.random() > 0.5 ? "0" : "1",
        });
    }
}

// Update & Draw Binary Particles
function updateBinaryParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "lime";
    ctx.font = "20px monospace";

    binaryParticles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;

        // Collision with boundaries
        if (p.x <= canvas.width / 2 - 50 || p.x >= canvas.width / 2 + 50) p.dx *= -1;
        if (p.y <= canvas.height / 2 - 50 || p.y >= canvas.height / 2 + 50) p.dy *= -1;

        ctx.fillText(p.bit, p.x, p.y);
    });

    requestAnimationFrame(updateBinaryParticles);
}

// OTP Background Flow Effect
function generateOTP() {
    otpDigits = [];
    for (let i = 0; i < 200; i++) {
        otpDigits.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            value: Math.floor(100000 + Math.random() * 900000),
        });
    }
}

// Move OTP Digits Down
function updateOTP() {
    const otpCanvas = document.getElementById("otpCanvas");
    const otpCtx = otpCanvas.getContext("2d");
    otpCanvas.width = window.innerWidth;
    otpCanvas.height = window.innerHeight;

    otpCtx.clearRect(0, 0, otpCanvas.width, otpCanvas.height);
    otpCtx.fillStyle = "cyan";
    otpCtx.font = "15px monospace";

    otpDigits.forEach((otp) => {
        otp.y += otpSpeed;
        if (otp.y > otpCanvas.height) otp.y = -50; // Reset OTP to top

        otpCtx.fillText(otp.value, otp.x, otp.y);
    });

    requestAnimationFrame(updateOTP);
}

// Initialize Everything
createBinaryParticles();
generateOTP();
updateBinaryParticles();
updateOTP();

// Play/Pause Background Music
document.getElementById("play-music-btn").addEventListener("click", function () {
    let music = document.getElementById("bg-music");
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
});
