// 根据 id 、类名、标签名查找元素
function $(param, obj){
	obj = obj || document;
	if (param.indexOf("#") === 0) // 根据 id 查找元素
		return document.getElementById(param.substring(1));
	
	if (param.indexOf(".") === 0)  // 根据 className 查找元素
		return getByClass(param.substring(1), obj);
	
	return obj.getElementsByTagName(param); // 根据标签名查找元素
}

// 根据类名查找元素
function getByClass(className, obj) {
	obj = obj || document;
	if (obj.getElementsByClassName) // 支持使用 getElementsByClassName 方法
		return obj.getElementsByClassName(className);
		
	/* 不支持 getElementsByClassName 时 */
	var result = []; // 保存所有找到的元素
	// 根据标签*将所有元素获取到
	var tags = obj.getElementsByTagName("*");
	// 遍历所有的标签
	for (var i = 0, len = tags.length; i < len; i++) {
		// 获取当前遍历到的标签所使用的所有 class 类名
		var classNames = tags[i].className.split(" ");
		// 循环遍历所有的 class 类名
		for (var j = 0, l = classNames.length; j < l; j++) {
			if (className === classNames[j]) { // 当前元素使用过参数中的类名
				result.push(tags[i]); // 将当前元素添加到结果集数组中
				break;
			}
		}
	}
	
	// 返回找到的元素数组
	return result;
}

// 获取指定元素的指定CSS样式属性值
// element:元素对象
// attr:属性名（字符串）
function getStyle(element, attr) {	
	return element.currentStyle ? element.currentStyle[attr] : getComputedStyle(element)[attr];
}

// 保存 cookie 信息
function setCookie(key, value, options) {
	// 基本 key=value
	var cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value);
	// 有配置可选参数：expires=?; path=?; domain=?; secure
	if (options){
		// 失效时间
		if (typeof options.expires === "number"){
			var days = options.expires;
			options.expires = new Date();
			options.expires.setDate(options.expires.getDate() + days);
		}	
		if (options.expires){
			cookie += "; expires=" + options.expires.toUTCString();
		}
		// 路径
		if (options.path)
			cookie += "; path=" + options.path;
		// 域名
		if (options.domain)
			cookie += "; domain=" + options.domain;
		// secure
		if (options.isSecure)
			cookie += "; secure";
	}
	// 保存
	document.cookie = cookie;
}

// 获取 cookie 
function getCookie(key) {
	var cookies = document.cookie.split("; ");
	for (var i = 0, len = cookies.length; i < len; i++) {
		var parts = cookies[i].split("=");
		var cookieName = decodeURIComponent(parts.shift());
		if (cookieName === key) {
			var cookieValue = parts.join("=");
			return decodeURIComponent(cookieValue);
		}
	}
	
	return null;
}

// 删除 cookie
function removeCookie(key) {
	setCookie(key, "", {"expires":-1});
}

/* ajax */
// success ---- 函数，用于处理响应成功后的数据
function ajax(method, url, param, success){
	var xhr = new XMLHttpRequest();
	xhr.open(method, url, true);
	if (method.toLowerCase() == "post") {
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	}
	xhr.send(param);
	xhr.onreadystatechange = function(){
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				var txt = xhr.responseText;
				
				success && success(txt); // 如果有传递 success 函数，则调用该函数，传递 txt 参数
			}
		}
	}
}

// 缓冲运动
function animates(element, target, fn) {
	clearInterval(element.timer);
	element.timer = setInterval(function(){					
		var clear = true; // 标记是否取消计时器  true:取消  false:不取消
	
		// 遍历 target 对象的各属性
		for (var attr in target) { // attr 是 target 对象中属性的名字
			// 得到运动前的当前值						
			var currentStyle = parseInt(attr === "opacity" ? getStyle(element, attr) * 100 : getStyle(element, attr)) || 0;						
			if (currentStyle === target[attr]){ // 当前遍历到的属性运动到达终点，则继续下一个属性的运动
				continue;
			}						
			clear = false; // 修改标记
			// 计算运动速度
			var speed = (target[attr] - currentStyle) / 8;
			// 取整
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			// 设置运动后的属性值
			element.style[attr] = attr === "opacity" ? (currentStyle + speed) / 100 : (currentStyle + speed) + "px";
			if (attr === "opacity")
				element.style.filter = "alpha(opacity="+ (currentStyle + speed) +")";
		}	

		// 根据标记判断是否取消计时器
		if (clear) {
			clearInterval(element.timer);
			fn && fn(); // 动画完成后，如果还有要执行的函数，则调用执行该函数
		}
	}, 30);
}

// 线性运动
function animate(element,target,speed,fn){
			clearInterval(element.timer);
			speed = speed || 600;
			// 存放各属性初始值 css 值 ，可运动的区间大小值 ,运动初始时间
			var init = {}, range = {},start = +new Date();
			// 遍历 target 对象 ，将 init 与 range 对象初始化
			for (var attr in target) {
				var currStyle = getStyle(element,attr);
 				init[attr] = (attr === "opacity" ? parseFloat(currStyle) : parseInt(currStyle)) || 0;
				range[attr] = target[attr] - init[attr]; 
 			} 
 			element.timer = setInterval(function(){
 				// 计算已经运动了的时间长
				var elapse = Math.min(+new Date() - start,speed);
				// 设置运动后的各属性
				for (var attr in target) {
					var result = (range[attr] / speed * elapse + init[attr]);
					element.style[attr] = result + (attr === "opacity" ? "" : "px");
					if(attr === "opacity")
						element.style.filter = "alpha(opacity="+ parseInt(result * 100) +")"; 
				}
				// 判断是否停止计时器
				if(elapse === speed){
					clearInterval(element.timer);
					fn && fn();
				}
								
 			},30);
		}	





//格式
var _type = function () {
  return Object.prototype.toString.call(arguments[0]);
},
  Tool = {
    isType: function (type) {
      var that = this;
      return function (obj) {
        return _type(obj) === type;
      };
    },
    _TypeEnum: {
      bool: _type(true),
      Null: _type(null),
      array: _type([]),
      string: _type(""),
      object: _type({}),
      number: _type(1),
      function: _type(function () { }),
      Undefined: _type(undefined)
    },
    init: function () {
      var TypeEnum = this._TypeEnum,
        that = this;
      for (var attr in TypeEnum) {
        this[
          "is" +
          attr.replace(/\b(\w)|\s(\w)/g, function (m) {
            return m.toUpperCase();
          })
        ] = (function (pattr) {
          return that.isType(TypeEnum[pattr]);
        })(attr);
      }
    },
    json2str: function (obj) {
      var str = [];
      if (this.isObject(obj)) {
        str.push("{");
        var _str = []
        for (var attr in obj) {
          _str.push('"' + attr + '":'+this.json2str(obj[attr]));
        }
        str.push(_str.join(','))
        str.push("}");
      } else if (this.isArray(obj)) {
        str.push("[");
        var _astr = [];
        for (var i = 0, len = obj.length; i < len; i++) {
          _astr.push(this.json2str(obj[i]));
        }
        str.push(_astr.join(","));
        str.push("]");
      } else if (this.isUndefined(obj)) {
        str.push("undefined");
      } else if (this.isString(obj)) {
        str.push('"' + obj + '"');
      } else if (this.isNull(obj)) {
        str.push("null");
      } else if (obj.toString && this.isFunction(obj.toString)) {
        str.push(obj.toString());
      } else str.push(obj);
      return str.join("");
    }
  };
Tool.init();


  function scientificToNumber(num) {
            var str = num.toString();
            var reg = /^(\d+)(\.\d+)?(e)([\-|\+])(\d+)$/;
            var arr, len,
                zero = '';
            var intPart = "",
                floatPart = "";
            debugger;
            if (!reg.test(str)) {
                return num;
            } else {
                arr = reg.exec(str);
                floatPart = arr[2].slice(1);
                intPart = arr[1] + floatPart;
                len = Math.abs(arr[5]);

                if (arr[4] == "-") {
                    for (var i = 0; i < len - 1; i++) {
                        zero += '0';
                    }
                    return '0.' + zero + intPart;
                } else {
                    for (var i = 0; i < len - floatPart.length; i++) {
                        zero += '0';
                    }
                    return intPart + zero;
                }

            }
        }



        //颜色转换 colorRGB2Hex('rgb(255,255,255)')
        function colorRGB2Hex(color) {
            var rgb = color.split(',');
            var r = parseInt(rgb[0].split('(')[1]);
            var g = parseInt(rgb[1]);
            var b = parseInt(rgb[2].split(')')[0]);

            var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
            return hex;
        }




    //基类继承
    var Class = function Class() {}
	Class.extend = function(prop) {
	    var _super = this.prototype
	    initializing = true
	    var prototype = new this()
	    initializing = false
	    for (var name in prop) {
	        prototype[name] =
	            typeof prop[name] === 'function' && typeof _super[name] === 'function' && fnTest.test(prop[name])
	                ? (function(name, fn) {
	                      return function() {
	                          var tmp = this._super
	                          this._super = _super[name]
	                          var ret = fn.apply(this, arguments)
	                          this._super = tmp
	                          return ret
	                      }
	                  })(name, prop[name])
	                : prop[name]
	    }
	    function Class() {
	        if (!initializing && this.init) this.init.apply(this, arguments)
	    }
	    Class.prototype = prototype
	    Class.prototype.constructor = Class
	    /* eslint-disable no-caller */
	    Class.extend = arguments.callee
	    Class.mixin = mixin
	    return Class
	}

	//两小数相加精度处理
	mathAdd(v1, v2) {
        var r1, r2, m
        try {
            r1 = v1.toString().split('.')[1].length
        } catch (e) {
            r1 = 0
        }
        try {
            r2 = v2.toString().split('.')[1].length
        } catch (e) {
            r2 = 0
        }
        m = Math.pow(10, Math.max(r1, r2))
        return (this.mathMul(v1, m) + this.mathMul(v2, m)) / m
        // return (v1 * m + v2 * m) / m
    }
    //两小数相乘精度处理
    mathMul(v1, v2) {
        var m = 0,
            s1 = _.isNumber(v1) ? v1.toString() : '0',
            s2 = _.isNumber(v2) ? v2.toString() : '0'
        try {
            m += s1.split('.')[1].length
        } catch (e) {}
        try {
            m += s2.split('.')[1].length
        } catch (e) {}
        return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m)
    }


//事件格式转化
Date.prototype.Format = function(fmt){
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
};

//数组扁平化
var flatArr=arr=>arr.reduce((old,cur)=>old.concat(Array.isArray(cur)?flatArr(cur):cur),[])

//表单提交下载文件
$form(url, params) {
	let form = document.createElement("form");
	form.action = url;
	form.method = "post";
	// form.target = "downLoadIframe";
	form.target = "_blank";
	form.acceptCharset = "UTF-8";
	form.enctype = "application/x-www-form-urlencoded";
	form.style.height = "0px";
	form.style.width = "0px";
	form.style.display = "none";
	for (let key in params) {
		let input = document.createElement("input");
		input.name = key;
		input.value = params[key];
		form.appendChild(input);
	}
	// var downLoadIframe = document.getElementById("downLoadIframe");
	// if (!downLoadIframe) {
	//   downLoadIframe = document.createElement("iframe");
	//   downLoadIframe.id = "downLoadIframe";
	//   downLoadIframe.name = "downLoadIframe";
	// }
	// document.body.appendChild(downLoadIframe);
	// downLoadIframe.contentDocument.body.append(form);
	// form.submit();
	// downLoadIframe.contentDocument.body.removeChild(form);
	document.body.appendChild(form);
	form.submit();
	document.body.removeChild(form);
}
