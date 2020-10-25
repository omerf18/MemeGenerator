'use strict'

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
let gCurrFontStyle = 'Impact';
let gSelectedNavItemIdx = 0;

function setGmeme(meme) {
    gMeme = meme;
}

function addText(text, isNewTxtAdded) {
    let newLine = {
        txt: text,
        size: gCurrTextSize,
        font: gCurrFontStyle,
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

    gMeme.content = gCanvas.toDataURL('image/jpeg');
}

function deleteMyMeme(memeId) {
    let savedMemes = loadFromStorage(SAVED_MEMES_KEY);
    const currMemeIdx = savedMemes.findIndex(savedMeme => savedMeme.id === memeId);
    savedMemes.splice(currMemeIdx, 1);
    gSavedMemes = savedMemes;
    saveToStorage(SAVED_MEMES_KEY, gSavedMemes)
}

function saveMemeToStorage() {
    gSavedMemes.push(gMeme);
    saveToStorage(SAVED_MEMES_KEY, gSavedMemes);
}

function fillStyle(color) {
    gFillStyleColor = color;
    gMeme.lines[gCurrLineIdx].fillStyle = color;
}

function strokeStyle(color) {
    gStrokeStyleColor = color;
    gMeme.lines[gCurrLineIdx].strokeStyle = color;
}

function applyInputChange(text) {
    addText(text, false);
}

function getUserMeme(imgId) {
    const imgs = getImgs();
    let meme = {};
    let selectedImgIdx = imgs.findIndex(function (img) {
        return img.id === imgId;
    });
    meme.id = imgs[selectedImgIdx].id;
    meme.url = imgs[selectedImgIdx].url;
    meme.content = gCanvas.toDataURL('image/jpeg');
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
}

function setFontStyle() {
    if (gCurrFontStyle === 'Impact') gCurrFontStyle = 'Lucida Console';
    else if (gCurrFontStyle === 'Lucida Console') gCurrFontStyle = 'Times New Roman';
    else if (gCurrFontStyle === 'Times New Roman') gCurrFontStyle = 'Comic Sans MS';
    else gCurrFontStyle = 'Impact';
    gMeme.lines[gCurrLineIdx].font = gCurrFontStyle;
}

function setFontSize(newFontSize) {
    if (newFontSize === 'size-dec') {
        gCurrTextSize -= 2;
    } else {
        gCurrTextSize += 2;
    }
    gMeme.lines[gCurrLineIdx].size = gCurrTextSize;
}

function setCurrMeme() {
    gCurrTextSize = 20;
    gCurrTextY = 10;
    gCurrLineIdx = 0;
    gFillStyleColor = '#FFFFFF';
    gStrokeStyleColor = '#000000';
    gCurrFontStyle = 'Impact';
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

function selectNavItem(idx) {
    let navItems = document.querySelectorAll('.nav-item');
    navItems[gSelectedNavItemIdx].classList.remove('nav-item-active');
    navItems[idx].classList.add('nav-item-active');
    gSelectedNavItemIdx = idx;
}

function toggleSideNav() {
    let sideNav = document.querySelector('.side-nav');
    sideNav.classList.toggle('show-side-nav');
}