/**
 * Created by cyw on 16/8/21.
 */
/**
 * @author chen
 * @description 图片懒加载
 * 使用方法：
 * var lr = new LazyLoad();
 * lr.init();
 */
;(function () {

  function LazyLoad() {
  }

  var download_count = 0;
  var ele_obj = [];


  LazyLoad.prototype = {
    init: function () {   //放一些初始化的方法
      this.initElementMap();
      this.lazy();
      this.slowLoad();
    },
    getPosition: {
      /*
       获取窗口的高度
       document.documentElement.clientHeight    IE/CH支持
       document.body.client    通过body元素获取内容的尺寸
       */
      /*获取当前元素相对于窗口顶部的距离*/
      /*
       获取元素属性
       elemnt.offsetWidth
       elemnt.offsetHeight
       仅IE5不支持，放心使用吧
       offsetHeight  可以获取元素的高度尺寸，包括：height + padding[top,bottom] + bottom[top,bottom]
       element.offsetTop  //获取元素与其偏移参考父元素顶部的间隔距离  可以获取元素距其上一级的偏移参考父元素顶部的距离。包括：margin[top] + top
       element.offsetLeft  //获取元素与其偏移参考父元素左边的间隔距离
       */
      /*官方解释
       * document.compatMode等于BackCompat时，浏览器客户区宽度是document.body.clientWidth；
       * document.compatMode等于CSS1Compat时，浏览器客户区宽度是document.documentElement.clientWidth。
       * */

      /*
      * 返回窗口可视高度*/
      Viewport: function () {
        if (document.compatMode == "BackCompat") {
          var Height = document.body.clientHeight;
        } else {
          var Height = document.documentElement.clientHeight;
        }
        return Height;
      },
      /*
      * 获取滚动的距离*/
      ScrollTop: function () {
        if (document.compatMode == "BackCompat") {
          var elementScrollTop = document.body.scrollTop;

        } else {
          var elementScrollTop = document.documentElement.scrollTop == 0 ? document.body.scrollTop:document.documentElement.scrollTop;

        }
        return elementScrollTop;
      },
      /*返回元素到可视窗口上边的距离*/
      ElementViewTop: function (ele) {
        if (ele) {
          /*
          * 获取元素的offsetTop*/
          var actualTop = ele.offsetTop;
          /*
          * 获取元素的有定位的父级元素*/
          var current = ele.offsetParent;
          /*只要有父级元素就循环把他们的offsetTop叠加，得到元素到document文档的最上的距离*/
          while (current !== null) {
            actualTop += current.offsetTop;
            current = current.offsetParent;
          }
          /*元素到最上沿的距离 - 滚动距离 得到 元素到现在可视窗口上沿高度*/
          return actualTop - this.ScrollTop();
        }
      }
    },

    //从所有相关元素中找出需要延时加载的元素
    initElementMap: function () {
      var el = document.getElementsByTagName('img');
      for (var j = 0, len2 = el.length; j < len2; j++) {
        //判断当前的img是否加载过了，或者有lazy_src标志  [未完成]
        if (typeof (el[j].getAttribute("lazy_src"))) {
          ele_obj.push(el[j]);
          download_count++;
        }
      }
    },
    //防止多次加载
    lazy: function () {
      if (!download_count) return;
      var innerHeight = this.getPosition.Viewport();
      for (var i = 0, len = ele_obj.length; i < len; i++) {
        var t_index = this.getPosition.ElementViewTop(ele_obj[i]); //得到图片相对document的距上距离
        if (t_index  < innerHeight) {
          ele_obj[i].src = ele_obj[i].getAttribute("lazy-src");
          delete ele_obj[i];
          download_count--;
        }
      }
    },
    //延迟加载,提高用户体验
    slowLoad: function () {
      window.onscroll = window.onload = function () {
        setTimeout(function () {
          LazyLoad.prototype.lazy();
        }, 1000)
      }
    }
  };

  window.LazyLoad = LazyLoad;
})();
