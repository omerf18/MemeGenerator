'use script'

function initGallery() {
    selectNavItem(0);
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
                ctx.font = line.size + 'px ' + line.font;
                ctx.strokeStyle = line.strokeStyle;
                ctx.lineWidth = 5;
                ctx.strokeText(line.txt, canvas.width / 2, line.y);
                ctx.fillStyle = line.fillStyle;
                ctx.fillText(line.txt, canvas.width / 2, line.y);

            });
        }
    }
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderCanvas);
}


function onSaveMemeToStorage() {
    saveMemeToStorage();
}

function onPickFillStyle(color) {
    fillStyle(color);
    renderCanvas();
}

function onPickStrokeStyle(color) {
    strokeStyle(color);
    renderCanvas();
}

function onSwitchLines() {
    switchLines();
    renderCanvas();
}

function onDeleteText() {
    deleteText();
    renderCanvas();
}

function onInputChange(text) {
    applyInputChange(text);
    renderCanvas();
}

function onSetFontSize(newFontSize) {
    setFontSize(newFontSize);
    renderCanvas();
}

function downloadImg(elLink) {
    let imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}

function onSetFontStyle() {
    setFontStyle()
    renderCanvas();
}

function onAddText() {
    let elInput = document.querySelector('#text');
    if (elInput.value === '') return;
    addText(elInput.value, true);
    document.querySelector('#text').value = '';
    renderCanvas();
}

function onSelectImg(imgId) {
    let meme = getUserMeme(imgId);
    initEditor(meme);
    showCanvas();
}

function showGallery() {
    document.querySelector('.gallery').style.display = 'block';
    document.querySelector('.editor').style.display = 'none';
}

function showCanvas() {
    document.querySelector('.gallery').style.display = 'none';
    document.querySelector('.editor').style.display = 'block';
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

function onSelectMeme(memeId) {
    setCurrMeme();
    const memes = loadSavedMemes();
    const meme = memes.find(({ id }) => id === memeId);
    setGmeme(meme);
    let canvas = getCanvas();
    resizeCanvas();
    renderCanvas();
    window.addEventListener('resize', resizeCanvas, false);
    let ctx = getCtx();
    let img = new Image();
    img.src = meme.content;
    img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    };
    showCanvas();
}

function onDeleteMyMeme(memeId) {
    deleteMyMeme(memeId);
    renderMyMemes();
}

function renderMyMemes() {
    const memes = loadSavedMemes();
    const elGridContainer = document.querySelector('.grid-container');
    let strHTML = '';
    memes.forEach(meme => {
        strHTML +=
            `
        <div class="relative"> <img class="saved-meme-img grid-item" id="img-${meme.id}" src="${meme.content}" > 
        <div class="saved-memes-opts flex">
         <button class="saved-memes-share saved-memes-btn btn" onclick="onSelectMeme('${meme.id}')"> Edit </button>
         <button class="saved-memes-delete saved-memes-btn btn" onclick="onDeleteMyMeme('${meme.id}')"> Delete </button> 
        </div>
        </div>
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