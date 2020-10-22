'use script'

function initGallery() {
    renderAllGallery();
    showGallery();
}

function initMyMemes() {
    renderMyMemes();
    showGallery();
}

function initEditor(meme) {
    getSavedMemes();
    setCurrMeme();
    let memeImg = getCanvasImg(meme);
    let canvas = getCanvas();
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, false);
    let ctx = getCtx();
    let img = new Image();
    img.src = memeImg;
    img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    };
}

function renderCanvas() {
    let meme = getMeme();
    let canvas = getCanvas();
    let ctx = getCtx();
    let img = new Image();
    img.src = meme.url;
    img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        if (meme.lines) {
            meme.lines.forEach(line => {
                ctx.textBaseline = 'middle';
                ctx.textAlign = 'center';
                ctx.fillStyle = line.fillStyle;
                ctx.strokeStyle = line.strokeStyle;
                ctx.lineWidth = 100;
                ctx.font = line.size + 'px ' + line.font;
                ctx.fillText(line.txt, canvas.width / 2, line.y);
            });
        }
    }
}

function onSaveMemeToStorage() {
    saveMemeToStorage();
}

function onPickFillStyle(color) {
    fillStyle(color);
}

function onPickStrokeStyle(color) {
    strokeStyle(color);
}

function onSwitchLines() {
    switchLines();
}

function onDeleteText() {
    deleteText();
}

function onInputChange(text) {
    applyInputChange(text);
    renderCanvas();
}

function onSetFontSize(newFontSize) {
    setFontSize(newFontSize);
}

function onAddText() {
    let elInput = document.querySelector('#text');
    if (elInput.value === '') return;
    addText(elInput.value, true);
    document.querySelector('#text').value = '';
}

function onSelectImg(imgId) {
    let meme = getUserMeme(imgId);
    initEditor(meme);
    showCanvas();
}

function renderAllGallery() {
    const imgs = getImgs();
    const elGridContainer = document.querySelector('.grid-container');
    let strHTML = '';
    imgs.forEach(img => {
        strHTML +=
            `
        <div class="btn"> <img class="grid-item" id="img-${img.id}" onclick="onSelectImg('${img.id}')" src="${img.url}" > </div>
          `
    });
    elGridContainer.innerHTML = strHTML;
}

function renderMyMemes() {
    const imgs = loadSavedMemes();
    const elGridContainer = document.querySelector('.grid-container');
    let strHTML = '';
    imgs.forEach(img => {
        strHTML +=
            `
        <div class="btn"> <img class="grid-item" id="img-${img.id}" onclick="onSelectImg('${img.id}')" src="${img.url}" > </div>
          `
    });
    elGridContainer.innerHTML = strHTML;
}

function renderBy(filterType) {
    const elGridContainer = document.querySelector('.grid-container');
    const imgs = getImgs();
    let filterBy = [filterType];
    res = imgs.filter(({ keywords }) =>
        filterBy.every(key => keywords.includes(key)));
    let strHTML = '';
    res.forEach(img => {
        strHTML +=
            `
            <div class="btn"> <img class="grid-item" id="img-${img.id}" onclick="onSelectImg('${img.id}')" src="${img.url}" > </div>
              `
    });
    elGridContainer.innerHTML = strHTML;
    showGallery();
}