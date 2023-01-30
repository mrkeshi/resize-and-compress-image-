class ImageResize {
    divInputFile = document.querySelector('.input-file') as HTMLElement
    inputFile = this.divInputFile.querySelector('input') as HTMLInputElement
    img = document.querySelector('#img') as HTMLImageElement
    widthInput = document.querySelector('.width input') as HTMLInputElement
    heightInput = document.querySelector('.height input') as HTMLInputElement
    ratio = document.getElementById('ratio') as HTMLInputElement
    ratioValue: number = 0
    wrap=document.querySelector('.wrap') as HTMLElement
    quality = document.getElementById('reduce') as HTMLInputElement
    downloadbtn = document.querySelector('.btnresize')
    constructor() {

        this.divInputFile.addEventListener('click', () => this.inputFile.click())
        this.inputFile.addEventListener('change', (e) => {
            this.loadFile(e)
        })
        this.downloadbtn?.addEventListener('click', () =>
            this.resize()
        )
    }
    loadFile(e: any) {
        let file = (e.target.files[0])
        if (!file) return
        this.img.src = URL.createObjectURL(file)
        this.img.addEventListener('load', () => {
            this.divInputFile.classList.add('active')
            this.wrap.classList.add('active')
            this.heightInput.value = String(this.img.naturalHeight)
            this.widthInput.value = String(this.img.naturalWidth)
            this.ratioValue = this.img.naturalWidth / this.img.naturalHeight
            this.widthInput.addEventListener('keyup', () => {
                console.log(this.ratio.checked)
                let height = this.ratio.checked ? Number(this.widthInput.value) / this.ratioValue : Number(this.heightInput.value)
                this.heightInput.value = String(Math.floor(height))
            })
            this.heightInput.addEventListener('keyup', () => {
                let width = this.ratio.checked ? Number(this.heightInput.value) * this.ratioValue : Number(this.widthInput.value)
                this.widthInput.value = String(Math.floor(width))
            })
        })

    }

    resize() {
        const canavs = document.createElement('canvas')
        const a:any = document.createElement('a')
        const ctx = canavs.getContext('2d')
        let imageQ=this.quality.checked ? 0.7 :1.0
        canavs.width = Number(this.widthInput.value)
        canavs.height = Number(this.heightInput.value)
        ctx?.drawImage(this.img, 0, 0, canavs.width, canavs.height)

        a.href=canavs.toDataURL('image/jpeg',imageQ)
        a.download=new Date().getTime()
        a.click()
    }
}
new ImageResize()
