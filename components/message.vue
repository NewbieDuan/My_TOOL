<template>
  <transition name="el-fade-in">
    <div :class="['ospc-toast',type]" v-show="visiable">
      <span :class="['ospc-toast-icon',iconMap[type]]"></span>
      <span class="ospc-toast-text">{{text}}</span>
    </div>
  </transition>
</template>
<script>
import html2canvas from "html2canvas";
export default {
  name: "message",
  props: {
    text: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "info" //success,warning,error,info
    },
    value: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 1500
    }
  },
  data() {
    return {
      visiable: false,
      iconMap: {
        success: "el-icon-success",
        warning: "el-icon-warning",
        error: "el-icon-error",
        info: "el-icon-info"
      }
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue) {
        if (!newValue) {
          return;
        }
        this.visiable = true;
        this.show();
      }
    }
  },
  methods: {
    show() {
      if (this.duration > 0) {
        this.$emit("input", false);
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.close();
        }, this.duration);
      }
    },
    close() {
      this.visiable = false;
    }
  }
};
</script>
<style lang="scss">
.ospc-toast {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  margin: auto;
  padding: 10px 15px 10px 12px;
  border-width: 1px;
  border-style: solid;
  box-sizing: border-box;
  text-align: left;
  border-radius: 4px;
  z-index: 100;
  display: flex;
  align-items: center;
  min-width: 130px;
  .ospc-toast-icon {
    margin-right: 10px;
    font-size: 16px;
    vertical-align: baseline;
  }
  .ospc-toast-text {
    white-space: nowrap;
    font-size: 12px;
  }
}
.ospc-toast.info {
  border-color: #ebeef5;
  background-color: #edf2fc;
  color: #909399;
}
.ospc-toast.success {
  background-color: #f0f9eb;
  border-color: #e1f3d8;
  color: #67c23a;
}
.ospc-toast.warning {
  background-color: #fdf6ec;
  border-color: #faecd8;
  color: #e6a23c;
}
.ospc-toast.error {
  background-color: #fef0f0;
  border-color: #fde2e2;
  color: #f56c6c;
}
</style>
