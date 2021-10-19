<style lang="scss" scoped>
.toast__component {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  font-family: PingFangSC-Medium, PingFang SC;
  z-index: 9999;
  
  .toast__component-mask {
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0;
    left: 0;
    top: 0;
    z-index: 9998;
  }
  .toast__component-content {
    max-width: 300px;
    min-width: 100px;
    border-radius: 4px;
    padding: 16px 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.85);
    z-index: 9999;
    box-sizing: border-box;
    .content {
      font-size: 14px;
      font-weight: 500;
      color: #fff;
      line-height: 24px;
      text-align: center;
      word-wrap: break-word;
    }
  }
}
</style>

<template>
  <transition>
    <div class="toast__component" v-show="visiable">
      <div class="toast__component-content">
        <div class="content">{{message}}</div>
      </div>
      <div class="toast__component-mask" @click="maskClick"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "toast",
  props: {
    message: {
      type: String,
      default: ""
    },
    visiable: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 0
    }
  },
  data: function() {
    return {
      msg: "hello world!"
    };
  },
  watch: {
    visiable(newValue) {
      let that = this;
      if (newValue && this.duration > 0) {
        this.show();
      }
    }
  },
  methods: {
    show() {
      if (this.duration > 0) {
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.close();
        }, this.duration);
      }
    },
    maskClick() {
      this.close();
    },
    close() {
      this.$emit("input", false);
    }
  }
};
</script>
