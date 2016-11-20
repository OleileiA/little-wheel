/*
* obj是你想要在他身上添加滚动事件的目标(在他身上滚轮触发事件)
* callback接受upDown参数，为true说明是向上滑动，false向下。
* */
function myWheel(obj,callBack){
		if(window.navigator.userAgent.toLowerCase().indexOf('firefox') != -1){
			obj.addEventListener('DOMMouseScroll',fn1);
		}else{
			obj.addEventListener('mousewheel',fn1);
		}
		function fn1(ev){
			var upDown = 0;
			upDown = ev.wheelDelta?(ev.wheelDelta>0?true:false):(ev.detail < 0?true:false);
			callBack && typeof callBack === 'function' && callBack(upDown);
		}
	}