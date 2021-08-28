const {createCanvas} = require("canvas");
const fs = require('fs').promises;

const oldFs = require('fs');
let dir = './output';
!oldFs.existsSync(dir) && oldFs.mkdirSync(dir);

const width = 600;
const height = 600;

function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * max);
}

function getRandom(min, max) {
    let rand = Math.random()
    return min + (rand * max);
}

function point(x, y, canvas) {
    canvas.beginPath();
    canvas.arc(x, y, 5, 0, 2 * Math.PI, true);
    canvas.fill();
}

async function drawOne(format, iterations) {

    const canvas = createCanvas(width, height, format);

    const context = canvas.getContext("2d");

    context.fillStyle = `rgb(${0},${0},${0})`;
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < iterations; i++) {
        context.fillStyle = `rgb(${getRandomInt(0, 255)},${getRandomInt(0, 255)},${getRandomInt(0, 255)})`;
        point(getRandomInt(0, width), getRandomInt(0, height), context);
    }

    return canvas.toBuffer();

}

async function main() {

    let format = 'png';
    // let format = 'svg'

    for (let index = 0; index < 100; index++) {
        let buffer = await drawOne(format, getRandomInt(5, 100));
        await fs.writeFile(`./output/image${index++}.` + format, buffer);
    }
}

(async () => {
    await main();
})();