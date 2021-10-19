<template>
    <div ref="fileupload" class="fileupload">
        <span class="x-icon-action-Import1 upload-icon"></span>
        <span class="upload-txt">点击或将文件拖拽到这里上传</span>
        <input not-cabinx-tag class="upload-input" type="file" @change="fileChange" />
    </div>
</template>
<script>
import "./dragUploader.scss";

export default {
    data(){
        return{}
    },
    mounted(){
        this.bind();
    },
    methods:{
        bind() {
            const fileuploadDom = this.$el;
            fileuploadDom.addEventListener('dragenter', (e) => {
                e.preventDefault();
                
            });
            fileuploadDom.addEventListener('dragleave', (e) => {
                this.clearDragStyle(fileuploadDom);
            });
            fileuploadDom.addEventListener('dragover', (e) => {
                e.preventDefault();
                this.setDragStyle(fileuploadDom);
            });
            fileuploadDom.addEventListener('drop', (e) => {
                e.preventDefault();
                this.clearDragStyle(fileuploadDom);
                this.uploadFile(e.dataTransfer.files[0]);
            });
        },
        setDragStyle(fileuploadDom) {
            fileuploadDom.style.borderColor = 'gray';
            fileuploadDom.style.backgroundColor = 'rgba(0,0,0,0.05)';
            fileuploadDom.children[1].innerText = '松开上传';
        },
        clearDragStyle(fileuploadDom) {
            fileuploadDom.style.borderColor = '#3f96f7';
            fileuploadDom.style.backgroundColor = '#fff';
            fileuploadDom.children[1].innerText = '点击或将文件拖拽到这里上传';
        },
        fileChange(e){
            this.uploadFile(e.target.files[0]);
        },
        uploadFile(files){
            this.$emit('change',files)
        },
    }
}
</script>