#问题收集
##1 
  q:页面高度在奇数时模糊
  a:在使用tranlateY时，页面整体内容就会模糊
##2
  Q:页面轮播器，第二个页面含有input框且自动聚焦，导致内容会有偏移
  A:input框focus时，会调用srollIntoView（猜测），导致内容偏移
