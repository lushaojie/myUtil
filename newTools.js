// 使用 'a.b.c' 字符串 访问某个对象 就是用字符串路径来访问对象成员
function getValueByPath( obj, path ){
    let paths = path.split( '.' );
    let res = obj;
    let prop = null;
    while( prop = paths.shift() ){
        res = res[prop];
    }
    return res;
}

// 对象继承 es5 - 圣杯模式
function inherit(Target, origin){
    function F(){};
    F.prototype = origin.prototype;
    Target.prototype = new F();
    Target.prototype.constuctor = Target; // 更正目标 对象 构造函数
    Target.prototype.uber = origin.prototype; // 标识 目标对象 正在继承的原型
}

// 对象深度克隆
function deepClone(origin, target){
    target = target || {};
    var toStr = Object.prototype.toString,
        arrStr = '[object Array]';

    for (const k in origin) {
        if (origin.hasOwnProperty(k)) { // 排除原型上的属性
            var v = origin[k];
            if(typeof(v) == 'object' && v !== null){
				
                target[k] = toStr.call(v) == arrStr ? [] : {};

                deepClone(v, target[k]);

            }else{
                target[k] = v;
            }
        }
    }

    return target;
}

// 求一个字符串的字节长度
function retBytes(str){
	var len = str.length,
		num = len;
	for(var i = 0; i < len; i++){
		if(str.charCodeAt(i) > 255){
			num++;
		}
	}
	return num;
}

// 手写冒泡排序
function sortByBubble(arr){
    var leng = arr.length -1;
    for(var i = 0; i < leng; i++){
        for(var j = 0; j < leng -i; j++){
            if(arr[j] > arr[j + 1]){
                var tem = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = tem;
            }
        }
    }
}

// 手写 数组反转函数
function arrReverse(arr){
    var leng = arr.length - 1,
        forNum = leng / 2;
    for(var i = 0; i < forNum; i++){
        var tem = arr[i];
        arr[i] = arr[leng - i];
        arr[leng - i] = tem;
    }
}

// 防抖函数 : 一个需要频繁触发的函数，在规定时间内，只让最后一次生效，（只生效一次）
function debounce(fn, delay){
		
    var timer = null;
    return function(){
        // var t = this; // 矫正this
        clearTimeout(timer);
        timer = setTimeout(function(){
            // fn.call(t); // 矫正this
            fn();
        }, delay);
    }
}
// Js 超大整数相加的解决方案
function sumBigNumber(a, b) {
    var res = '',
        temp = 0;
    a = a.split('');
    b = b.split('');
    while (a.length || b.length || temp) {
        temp += ~~a.pop() + ~~b.pop();
        res = (temp % 10) + res;
        temp = temp > 9;
    }
    return res.replace(/^0+/, '');
}