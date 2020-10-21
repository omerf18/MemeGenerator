'use script'

function initGallery() {
    showGallery();
    renderAllGallery();
}

function initEditor(meme) {
    let canvas = getCanvas();
    let ctx = getCtx();
    canvas.addEventListener('mousedown', setPaintingOn);
    canvas.addEventListener('mouseup', setPaintingOff);
    canvas.addEventListener('mousemove', onCanvasInteraction);
    // canvas.addEventListener("touchstart",setPaintingOn);
    // canvas.addEventListener("touchend", setPaintingOff);
    // canvas.addEventListener("touchmove", onCanvasInteraction);
    let memeImg = getCanvasImg(meme);
    let img = new Image();
    img.src = memeImg;
    img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        ctx.fillStyle = meme.lines[0].color;
        ctx.font = meme.lines[0].size + 'px ' + meme.lines[0].font;
        ctx.fillText(meme.lines[0].txt, 250, 50);
    };
}

function onAddText () {
    const text = document.querySelector('#text').value;
    addText(text);
}

function onCanvasInteraction(ev) {
    canvasInteraction(ev);
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