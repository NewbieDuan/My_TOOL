<template>
    <div class="canvas-image">
        <div class="canvas-area">
            <canvas id="canvas" class="canvasStyle" width="700" height="500"></canvas>
            <canvas id="canvas-helper" class="canvasStyle" width="700" height="500"></canvas>
        </div>
        <div class="operate-area">
            <span :class="{ 'x-icon-action-keep-side': true, actived: drawType === 'rect' }" @click="changeDrawType('rect')" title="矩形框"></span>
            <span :class="{ 'x-icon-action-edit': true, actived: drawType === 'line' }" @click="changeDrawType('line')" title="线条"></span>
            <span class="x-icon-action-delete" @click="clearAll" title="清楚全部"></span>
            <span class="x-icon-action-Import1" @click="download" title="下载"></span>
        </div>
    </div>
</template>
<script>
import './canvasImage.scss';
let startPos = null;
let endPos = null;
export default XComponent({
    props: ['imgUrl'],
    data: {
        drawType: ''
    },
    watch: {
        imgUrl(newVal) {
            this.init();
        }
    },
    mounted() {
        // this.init();
    },
    methods: {
        init() {
            this.canvas = document.getElementById('canvas');
            this.canvasHelper = document.getElementById('canvas-helper');
            this.ctx = this.canvas.getContext('2d');
            this.ctxHelper = this.canvasHelper.getContext('2d');
            this.drawBgImg();
            this.bind();
        },
        bind() {
            this.canvasHelper.addEventListener(
                'mousedown',
                (e) => {
                    startPos = { X: e.offsetX, Y: e.offsetY };
                    if (!this.drawType) {
                        return;
                    }
                    document.addEventListener('mousemove', this.mousemove, false);
                    document.addEventListener('mouseup', this.mouseup, false);
                },
                false
            );
        },
        changeDrawType(type) {
            this.drawType = this.drawType === type ? '' : type;
        },
        clearAll() {
            let ctx = this.ctx;
            ctx.clearRect(0, 0, ctx.width, ctx.height);
            ctx.drawImage(this.img, 0, 0, ctx.width, ctx.height);
        },
        mousemove(e) {
            if (this.drawType === 'rect') {
                let ctxHelper = this.ctxHelper;
                ctxHelper.clearRect(0, 0, ctxHelper.width, ctxHelper.height);
                this.drawRect(ctxHelper, startPos, { X: e.offsetX, Y: e.offsetY });
            } else if (this.drawType === 'line') {
                let ctx = this.ctx;
                let endPop = { X: e.offsetX, Y: e.offsetY };
                this.drawLine(ctx, startPos, endPop);
                startPos = endPop;
            }
        },
        mouseup(e) {
            let ctx = this.ctx;
            let ctxHelper = this.ctxHelper;
            ctxHelper.clearRect(0, 0, ctxHelper.width, ctxHelper.height);
            this.drawRect(ctx, startPos, { X: e.offsetX, Y: e.offsetY });
            startPos = null;
            document.removeEventListener('mousemove', this.mousemove);
            document.removeEventListener('mouseup', this.mouseup);
        },
        download() {
            var base64Img = this.canvas.toDataURL('image/png');
            let link = document.createElement('a');
            link.href = base64Img;
            link.download = '图片_' + Date.now();
            link.click();
        },
        getImgFile(){
            var base64Img = this.canvas.toDataURL('image/png');
            return this.base64ToFile(base64Img);
        },
        base64ToFile(base64Data) {
            let arr = base64Data.split(','),
                fileType = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                l = bstr.length,
                u8Arr = new Uint8Array(l);

            while (l--) {
                u8Arr[l] = bstr.charCodeAt(l);
            }
            return new File([u8Arr], '图片_' + Date.now(), { type: fileType });
        },

        drawBgImg() {
            let img = document.createElement('img');
            img.src = this.imgUrl;
            this.img = img;
            img.onload = () => {
                let scale1 = 700 / img.width;
                let scale2 = 420 / img.height;
                let scale = scale1 < scale2 ? scale1 : scale2;
                this.ctx.width = img.width * scale;
                this.ctx.height = img.height * scale;
                this.ctxHelper.width = img.width * scale;
                this.ctxHelper.height = img.height * scale;
                this.canvas.width = img.width * scale;
                this.canvas.height = img.height * scale;
                this.canvasHelper.width = img.width * scale;
                this.canvasHelper.height = img.height * scale;
                this.ctx.drawImage(img, 0, 0, this.ctx.width, this.ctx.height);
            };
        },
        drawRect(ctx, start, end) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            // ctx.fillStyle="transparent"
            ctx.strokeStyle = 'red'; // 红色路径
            ctx.moveTo(start.X, start.Y);
            ctx.lineTo(start.X, end.Y);
            ctx.lineTo(end.X, end.Y);
            ctx.lineTo(end.X, start.Y);
            ctx.closePath();
            ctx.stroke();
        },
        drawLine(ctx, start, end) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'red'; // 红色路径
            ctx.moveTo(start.X, start.Y);
            ctx.lineTo(end.X, end.Y);
            ctx.closePath();
            ctx.stroke();
        }
    }
});
</script>