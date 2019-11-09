window.onload = function () {
  //搜索框
  search();
  //轮播图
  banner();
  //倒计时
  downTime()
};
var search = function () {
  //获取搜索框
  var searchBox = document.querySelector('.jd_search_box');
  var bannerBox = document.querySelector('.jd_banner');
  var height = bannerBox.offsetHeight;
  var opacity = 0.85;
  window.onscroll = function () {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (height > scrollTop) {
      opacity = 0.85 * (scrollTop / height)
    } else {
      opacity = 0.85
    }
    searchBox.style.backgroundColor = 'rgba(201,21,35,' + opacity + ')'
  }
}
var banner = function () {
  //获取元素
  var bannerBox = document.querySelector('.jd_banner');
  //获取轮播图元素
  var ulBox = bannerBox.querySelector('ul:first-child')
  //获取轮播图的宽度
  var boxW = bannerBox.offsetWidth;
  //获取点盒子
  var pointBox = bannerBox.querySelector('ul:last-child');
  //获取点盒子的所有元素
  var liList = pointBox.querySelectorAll('li')
  //删除过渡
  var removeTransition = function () {
    ulBox.style.transition = 'none';
    ulBox.style.webkitTransition = 'none';
  }
  //添加过渡
  var addTransition = function () {
    ulBox.style.transition = 'all 0.2s';
    ulBox.style.webkitTransition = 'all 0.2s';
  }
  //位移
  var setTranslate = function (translateX) {
    ulBox.style.transform = 'translateX(' + translateX + 'px)';
    ulBox.style.webkitTransform = 'translateX(' + translateX + 'px)';
  }
  var index = 1;
  var timer = setInterval(function () {
    index++;
    //过渡
    addTransition();
    //位移
    setTranslate(-index * boxW);
  }, 3000)
  ulBox.addEventListener('transitionend', function () {
    if (index >= 9) {
      index = 1;
      removeTransition();
      setTranslate(-index * boxW);
    } else if (index <= 0) {
      index = 8;
      removeTransition();
      setTranslate(-index * boxW)
    }
    setPointBox();
  })
  var setPointBox = function () {
    for (var i = 0; i < liList.length; i++) {
      liList[i].classList.remove('current');
    }
    liList[index - 1].classList.add('current');
  }
  //滑动事件
  var startX = 0;//手指滑动的初始值
  var distance = 0;//滑动的距离(初始值)
  var isMove = false;//是否可以移动
  bannerBox.addEventListener('touchstart', function (e) {
    clearInterval(timer)
    startX = e.touches[0].clientX;
  })
  bannerBox.addEventListener('touchmove', function (e) {
    var moveX = e.touches[0].clientX;
    distance = moveX - startX;
    //过渡
    addTransition()
    //位移
    var translateX = -index * boxW + distance;
    setTranslate(translateX);
    isMove = true;//有滑动的行为
  })
  bannerBox.addEventListener('touchend', function ( ) {
    if(isMove){
      if(Math.abs(distance) < boxW/3){
        addTransition()
        setTranslate(-index*boxW)
      }else{
        if(distance<0){
          index++;
        }else{
          index--;
        }
        addTransition()
        setTranslate(-index*boxW)
      }
    }
    timer = setInterval(function () {
      index++;
      //过渡
      addTransition();
      //位移
      setTranslate(-index * boxW);
    }, 3000)
    startX = 0;//手指滑动的初始值
    distance = 0;//滑动的距离(初始值)
    isMove = false;//是否可以移动
  })
}
var downTime = function(){
  var time = 60 * 60 * 24;
  var timer = setInterval(function(){
    time--;
    var hours = Math.floor(time/3600);
    var minutes = Math.floor(time%3600/60);
    var seconds = time%60;
    var sk_times = document.querySelector('.sk_time');
    var spans = sk_times.querySelectorAll('span');
    spans[0].innerHTML = Math.floor(hours/10);
    spans[1].innerHTML = hours%10;

    spans[3].innerHTML = Math.floor(minutes/10);;
    spans[4].innerHTML = minutes%10;

    spans[6].innerHTML = Math.floor(seconds/10);;
    spans[7].innerHTML = seconds%10;
    if(time<=0){
      clearInterval(timer);
    }
  },1000)
}