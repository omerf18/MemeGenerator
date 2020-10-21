'use strict'

console.log('canvas');

const gCanvas = document.getElementById('my-canvas');
const gCtx = getCtx();
let gMeme = {};
let gIsPainting = false;

function addLineToCanvas(line) {
    gCtx.fillStyle = line.color;
    gCtx.font = line.size + 'px ' + line.font;
    gCtx.fillText(line.txt, 300, 100);
}

function addText(text) {
    let newLine = {
        txt: text,
        size: 20,
        font: 'Impact',
        align: 'left',
        color: 'blue'
    }
    gMeme.lines.push(newLine);
    addLineToCanvas(newLine);
}

function showGallery() {
    document.querySelector('.gallery').style.display = 'block';
    document.querySelector('.editor').style.display = 'none';
}

function showCanvas() {
    document.querySelector('.gallery').style.display = 'none';
    document.querySelector('.editor').style.display = 'block';
}

function getUserMeme(imgId) {
    const imgs = getImgs();
    let meme = {};
    let selectedImgIdx = imgs.findIndex(function (img) {
        return img.id === imgId;
    });
    meme.id = imgs[selectedImgIdx].id;
    meme.url = imgs[selectedImgIdx].url;
    meme.lines = [
        {
            txt: 'Enter text here',
            size: 20,
            font: 'Impact',
            align: 'left',
            color: 'blue'
        }
    ]
    gMeme = meme;
    return meme;
}


function getCanvasImg(meme) {
    return meme.url;
}

function getCurrMeme() {
    return gCurrMeme;
}

function getCanvas() {
    const canvas = gCanvas;
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, false);
    return canvas;
}

function canvasInteraction(ev) {
    const { offsetX, offsetY } = ev;
    const { clientX, clientY } = ev;
}

function setPaintingOn(ev) {
    gIsPainting = true;
    canvasInteraction(ev);
}

function setPaintingOff() {
    gIsPainting = false;
}

function resizeCanvas() {
    const canvas = gCanvas;
    if (window.innerWidth > 780) {
        canvas.width = window.innerWidth * 60 / 100;
        canvas.height = (window.innerHeight * 90) / 100;
    } else {
        canvas.width = window.innerWidth * 80 / 100;
        canvas.height = (window.innerHeight * 90) / 100;
    }
}

function getCtx() {
    return gCanvas.getContext('2d');
}

