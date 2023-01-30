"use strict";
class ImageResize {
    constructor() {
        var _a;
        this.divInputFile = document.querySelector('.input-file');
        this.inputFile = this.divInputFile.querySelector('input');
        this.img = document.querySelector('#img');
        this.widthInput = document.querySelector('.width input');
        this.heightInput = document.querySelector('.height input');
        this.ratio = document.getElementById('ratio');
        this.ratioValue = 0;
        this.wrap = document.querySelector('.wrap');
        this.quality = document.getElementById('reduce');
        this.downloadbtn = document.querySelector('.btnresize');
        this.divInputFile.addEventListener('click', () => this.inputFile.click());
        this.inputFile.addEventListener('change', (e) => {
            this.loadFile(e);
        });
        (_a = this.downloadbtn) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => this.resize());
    }
    loadFile(e) {
        let file = (e.target.files[0]);
        if (!file)
            return;
        this.img.src = URL.createObjectURL(file);
        this.img.addEventListener('load', () => {
            this.divInputFile.classList.add('active');
            this.wrap.classList.add('active');
            this.heightInput.value = String(this.img.naturalHeight);
            this.widthInput.value = String(this.img.naturalWidth);
            this.ratioValue = this.img.naturalWidth / this.img.naturalHeight;
            this.widthInput.addEventListener('keyup', () => {
                console.log(this.ratio.checked);
                let height = this.ratio.checked ? Number(this.widthInput.value) / this.ratioValue : Number(this.heightInput.value);
                this.heightInput.value = String(Math.floor(height));
            });
            this.heightInput.addEventListener('keyup', () => {
                let width = this.ratio.checked ? Number(this.heightInput.value) * this.ratioValue : Number(this.widthInput.value);
                this.widthInput.value = String(Math.floor(width));
            });
        });
    }
    resize() {
        const canavs = document.createElement('canvas');
        const a = document.createElement('a');
        const ctx = canavs.getContext('2d');
        let imageQ = this.quality.checked ? 0.7 : 1.0;
        canavs.width = Number(this.widthInput.value);
        canavs.height = Number(this.heightInput.value);
        ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(this.img, 0, 0, canavs.width, canavs.height);
        a.href = canavs.toDataURL('image/jpeg', imageQ);
        a.download = new Date().getTime();
        a.click();
    }
}
new ImageResize();
