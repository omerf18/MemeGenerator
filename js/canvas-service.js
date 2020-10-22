'use strict'

console.log('canvas');
const SAVED_MEMES_KEY = 'SAVED_MEMES';
const gCanvas = document.getElementById('my-canvas');
const gCtx = getCtx();
let gSavedMemes = [];
let gMeme = {};
let gCurrLineIdx = 0;
let gCurrTextSize = 20;
let gCurrTextY = 10;
let gFillStyleColor = '#FFFFFF';
let gStrokeStyleColor = '#000000';

function addText(text, isNewTxtAdded) {
    console.log('BEFORE', gMeme);
    let newLine = {
        txt: text,
        size: gCurrTextSize,
        font: 'Impact',
        align: 'left',
        fillStyle: gFillStyleColor,
        strokeStyle: gStrokeStyleColor,
        x: 320,
        y: gCanvas.height * gCurrTextY / 100,
        selectedLineIdx: (gMeme.lines.length === 1) ? 0 : gCurrLineIdx
    }
    gMeme.lines[gCurrLineIdx] = newLine;
    if (isNewTxtAdded) {
        gCurrLineIdx = gMeme.lines.length;
        document.querySelector('#text').value = '';
        gCurrTextY += 10;
    }
    renderCanvas();
}

function saveMemeToStorage() {
    gSavedMemes.push(gMeme)
    saveToStorage(SAVED_MEMES_KEY, gSavedMemes);
}

function fillStyle(color) {
    gFillStyleColor = color;
    gMeme.lines[gCurrLineIdx].fillStyle = color;
    renderCanvas();
}

function strokeStyle(color) {
    gStrokeStyleColor = color;
    gMeme.lines[gCurrLineIdx].strokeStyle = color;
    renderCanvas();
}

function applyInputChange(text) {
    addText(text, false);
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
            txt: 'text',
            size: 20,
            font: 'Impact',
            align: 'left',
            color: 'blue',
            x: 320,
            y: 80,
            selectedLineIdx: 0
        }
    ];
    gMeme = meme;
    return meme;
}

function switchLines() {
    gCurrTextY += 10;
    if (gCurrTextY === 100) gCurrTextY = 10;
    gMeme.lines[gCurrLineIdx].y = gCanvas.height * gCurrTextY / 100;
    renderCanvas();
}

function setFontSize(newFontSize) {
    if (newFontSize === 'size-dec') {
        gCurrTextSize -= 2;
    } else {
        gCurrTextSize += 2;
    }
    gMeme.lines[gCurrLineIdx].size = gCurrTextSize;
    renderCanvas();
}

function setCurrMeme() {
    gCurrTextSize = 20;
    gCurrTextY = 10;
    gCurrLineIdx = 0;
    gFillStyleColor = '#FFFFFF';
    gStrokeStyleColor = '#000000';
}

function getCanvasImg(meme) {
    return meme.url;
}

function getCurrMeme() {
    return gCurrMeme;
}

function getCanvas() {
    return gCanvas;
}

function deleteText() {
    gMeme.lines.pop();
    gCurrLineIdx = gMeme.lines.length;
    renderCanvas();
}

function resizeCanvas() {
    const canvas = gCanvas;
    if (window.innerWidth > 780) {
        canvas.width = window.innerWidth * 60 / 100;
        canvas.height = (window.innerHeight * 86) / 100;
    } else {
        canvas.width = window.innerWidth * 90 / 100;
        canvas.height = (window.innerHeight * 55) / 100;
    }
    renderCanvas();
}

function getCtx() {
    return gCanvas.getContext('2d');
}

function loadSavedMemes() {
    return loadFromStorage(SAVED_MEMES_KEY);
}

function getSavedMemes() {
    let myMemes = loadFromStorage(SAVED_MEMES_KEY);
    if (!myMemes || !myMemes.length) {
        myMemes = [];
    }
    gSavedMemes = myMemes;
    saveToStorage(SAVED_MEMES_KEY, gSavedMemes);
}

function getMeme() {
    return gMeme;
}