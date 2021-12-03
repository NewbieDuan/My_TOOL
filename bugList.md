# 问题收集
## 问题1 
  #### Q:页面高度在奇数时模糊
  #### A:在使用tranlateY时，页面整体内容就会模糊
## 问题2
  #### Q:页面轮播器，第二个页面含有input框且自动聚焦，导致内容会有偏移
  #### A:input框focus时，会调用srollIntoView（猜测），导致内容偏移
## 问题3
  #### Q:移动端webview下拉刷新会与页面的滚动冲突
  #### A:前端让其document.body.scrollTop不为0
## 问题4
  #### Q:vue-router报错：Error in render: "RangeError: Maximum call stack size exceeded"
  #### A:router中的router-link标签中的tos属性只能是路由中的值，不然就会报错
 
