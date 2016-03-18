var app = app || {};

/*-- html5-template
====================================================== */
app.template = function(){};


/* Landscape */
app.template.Landscape = function(){};
app.template.Landscape.init= function(){
    var Landscape = new mo.Landscape({
        pic: 'js/motion/landscape.png',
        picZoom: 3,
        mode:'portrait',//portrait,landscape
        prefix:'Shine'
    });
};

/* pageslide swiper */
app.template.swiper = function(){};
app.template.swiper.mySwiper = {};
app.template.swiper.init = function(){
    this.bind();
};
app.template.swiper.bind = function(){
    $(".swiper-container").css("display", "block");

    app.template.swiper.mySwiper = new Swiper ('.swiper-container', {
        speed:500,
        lazyLoading : true,
        lazyLoadingInPrevNext : true,
        // direction : 'vertical',
        onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
            swiperAnimateCache(swiper); //隐藏动画元素
            swiperAnimate(swiper); //初始化完成开始动画

            app.template.swiper.on_pageslideend(0);
        },
        onSlideChangeStart: function(swiper){
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画

            app.template.swiper.on_pageslideend(swiper.activeIndex);
            app.template.swiper.mySwiper.lockSwipes();
        }
    });

    app.template.swiper.lock();
};
app.template.swiper.lock = function(){
    app.template.swiper.mySwiper.lockSwipes();
};
app.template.swiper.on_pageslideend = function(index){};

app.template.swiper.next = function(){
    app.template.swiper.mySwiper.unlockSwipes();
    app.template.swiper.mySwiper.slideNext();
    app.template.swiper.mySwiper.lockSwipes();
};

app.template.swiper.prev = function(){
    app.template.swiper.mySwiper.unlockSwipes();
    app.template.swiper.mySwiper.slidePrev();
    app.template.swiper.mySwiper.lockSwipes();
};

app.template.swiper.to = function(index){
    app.template.swiper.mySwiper.unlockSwipes();
    app.template.swiper.mySwiper.slideTo(index);
    app.template.swiper.mySwiper.lockSwipes();
};


app.template.touch = function(){};

app.template.touch.eventlistener_handler = function(e){

    //e.stopPropagation();  // 阻止事件传递
    e.preventDefault();     // 阻止浏览器默认动作(网页滚动)
};

app.template.touch.init = function(){

    // fastclick
    FastClick.attach(document.body);

   document.body.addEventListener("touchmove", app.template.touch.eventlistener_handler, false);

    // $("body").on("doubleTap longTap swipeLeft swipeRight", function(e){
    //     // e.stopPropagation();  // 阻止事件传递
    //     // e.preventDefault();   // 阻止浏览器默认动作(网页滚动)
    //     return false;
    // });
};


app.template.data = {};
app.template.data.add = function(key, value){
    app.template.data[key] = value;
};
app.template.data.get = function(key){
    return app.template.data[key];
};

/*-- tools
====================================================== */
app.tools = function(){};
app.tools.random = function(n, m){
    var c = m-n+1;  
    return Math.floor(Math.random() * c + n);
};

app.tools.getpageurlwithoutparam = function(){
    var url = window.location.href;
    return url.substring(0, url.indexOf("?"));
};

app.tools.getbaseurl = function(){
    var url = window.location.href;
    return url.substring(0, url.lastIndexOf("/") + 1);
};

app.tools.gotourl = function(url){
    window.location.href = url;
};

app.tools.geturlparam = function(param){
    var reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) 
        return unescape(r[2]);
    else
        return undefined;
};

app.tools.substr = function(str, len){
    if(str.length > len)
        str = str.substring(0, len) + "...";

    return str;
};

app.tools.platform = function(){};
app.tools.platform.os = "";
app.tools.platform.debug = ""; // 强制开始指定os模式
app.tools.platform.init = function(){
    var u = navigator.userAgent;

    app.debug.console("userAgent:" + u);

    if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1)
        app.tools.platform.os = "android";
    else if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/))
        app.tools.platform.os = "ios";

    if(app.tools.platform.debug == "ios")
        app.tools.platform.os = "ios";
    else if(app.tools.platform.debug == "android")
        app.tools.platform.os = "android";
};

/*-- debug
====================================================== */
app.debug = function(){};
app.debug.enable = false;
app.debug.maxline = 5;
app.debug.linecount = 0;
app.debug.console = function(str){
    if(app.debug.enable)
    {
        app.debug.linecount ++;

        if($("#debug").length > 0)
        {
            if(app.debug.linecount > app.debug.maxline)
            {
                app.debug.linecount = 0;
                $("#debug").html("<br/> #" + str);
            }
            else
                $("#debug").append("<br/> #" + str);
        }else
        {
            $("body").append("<div id='debug' class='debug'></div>");
            $("#debug").append("<br/> #" + str);
        }
    }
};


/*-- audio player
====================================================== */
app.audio = function(){};
app.audio.player = undefined;
app.audio.status = "";
app.audio.init = function(){
    app.audio.player = $("#audio-player");

    $(".audio-icon").on("touchend", function(){
        if(app.audio.player[0].paused)
        {
            app.audio.play();
            $(".audio-icon").removeClass("audio-icon-stop");
        }
        else
        {
            app.audio.pause();
            $(".audio-icon").addClass("audio-icon-stop");
        }
    });
};


app.audio.show = function(){
    $(".audio-icon").css({"display": "block"});
    $(".audio-icon").addClass("audio-icon-animation");
    app.audio.play();
};

app.audio.play = function(){
    $(".audio-icon").removeClass("audio-icon-stop");
    app.audio.player[0].play();
    if(!app.audio.player[0].paused)
        app.audio.status = "play";
};

app.audio.pause = function(){
    app.audio.status = "pause";
    app.audio.player[0].pause();
};

app.audio.pause_bysystem = function(){
    app.audio.status = "pause_bysystem";
    app.audio.player[0].pause();
};

app.audio.stop = function(){
    app.audio.player.attr("src", "");
    app.audio.player[0].load();
};

app.audio.changesong = function(src){
    app.audio.player.attr("src", src);
    app.audio.player[0].load();

    if(app.audio.status == "play")
       app.audio.play(); 
};

/*-- p1
====================================================== */
app.p1 = function(){};
app.p1.init = function(){
    app.wx.sharecontent_update();
};
app.p1.bind_touch_event = function(){
    $(".p1 .btn-query").on("touchend", function(){
        // var phone_patt = new RegExp(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/); // 手机号码

        // var phonenumber = $("#phonenumber").val();
        // if(phone_patt.test(phonenumber))
        // {
        //     app.p1.getuserinfobyphonenumber(phonenumber);
        // }
        // else
        //     $(".p1 .hit").html("请输入正确的手机号码！");

        var cardnumber = $("#phonenumber").val();
        if(cardnumber != "")
        {
            app.p1.getuserinfobycardnumber(cardnumber);
        }
        else
            $(".p1 .hit").html("请输入正确的证件号码！");
    });

    $("#phonenumber").on("focus", function(){
        $(".p1 .hit").html("");
    });
};

app.p1.getuserinfobyphonenumber = function(phonenumber){
    $.getJSON("db/getuserinfo.php", {"phone" : phonenumber}, function(data){
        if(data[0].phone)
        {
           app.p2.set_userinfo(data);
           app.template.swiper.next();
        }else
        {
            $(".p1 .hit").html("无此手机号码的参赛选手信息，请核对后重新输入！");
        }
    });
};

app.p1.getuserinfobycardnumber = function(cardnumber){
    $.getJSON("db/getuserinfo.php", {"cardnumber" : cardnumber}, function(data){
        if(data[0].cardnumber)
        {
           app.p2.set_userinfo(data);
           app.template.swiper.next();
        }else
        {
            $(".p1 .hit").html("<p>无此证件号码的参赛选手信息</p><p>请核对后重新输入！</p><p>或致电 4008-213-094 查询！</p>");
        }
    });
};

app.p1.destory = function(){};

/*-- p2
====================================================== */
app.p2 = function(){};
app.p2.init = function(){

};

app.p2.set_userinfo = function(data){

    var name = "未知";
    var sex = "未知";
    var grouptype = "未知组别";
    var packagetype = "未知赛事包";

    if(data[0].name != "")
        name = data[0].name;

    if(data[0].sex == "0")
        sex ="男";
    else if(data[0].sex == "1")
        sex ="女";

    if(data[0].grouptype == "5")
        grouptype ="5公里";
    else if(data[0].grouptype == "10")
        grouptype ="10公里";

    if(data[0].packagetype == "0")
        packagetype ="一般赛事包";
    else if(data[0].packagetype == "1")
        packagetype ="高级赛事包";

    var size = "未知尺码";
    if(data[0].teesize == "XS"){
        size="XS(160/82A)";
    }else if(data[0].teesize == "S"){
        size="S (165/84A)";
    }else if(data[0].teesize == "M"){
        size="M(170/88A)";
    }else if(data[0].teesize == "L"){
        size="L(175/92A)";
    }else if(data[0].teesize == "XL"){
        size="XL(180/96A)";
    }else if(data[0].teesize == "XXL"){
        size="XXL(185/100A)";
    }

    $(".p2 .name").html(name);
    $(".p2 .sex").html(sex);
    $(".p2 .grouptype").html(grouptype);
    $(".p2 .packagetype").html(packagetype);
    $(".p2 .teesize").html(size);
};

app.p2.bind_touch_event = function(){
    $(".p2 .btn-share").on("touchend", function(){
        window.overlay = new mo.Overlay({
            content: '<img src="img/userinfo/m-share.png" alt=""><img src="img/transparent.png" alt=""  class="m-share-btn-close">',
            width: 549,
            height: 996
        });
        overlay.on('open', function(){
            $('.m-share-btn-close').on('touchend', function(){
                window.overlay.close();
            });
        });
    });
};


app.p2.destory = function(){};


/*-- wechat
====================================================== */
app.wx = function(){};

app.wx.sharecontent_update = function(){ 
    var nickname = $NICKNAME;
    var sharecontent = {title: "茉莉跑", desc: "已经参加“茉莉跑”公益活动，你愿意和TA一起为公益开跑吗？", moment: "已经参加“茉莉跑”公益活动，你愿意和TA一起为公益开跑吗？"}
    app.wechat.sharecontent = {title: sharecontent.title,
                                desc: nickname + sharecontent.desc,
                                titleformoment: nickname + sharecontent.moment, 
                                url: "https://pay.wechat.createcdigital.com/molirunh5160303/index.php", 
                                icon: "https://pay.wechat.createcdigital.com/molirunh5160303/img/share.jpg"
    };
    app.wechat.set_sharecontent();
}

/*-- for android
====================================================== */
var fuckandroid = {};

/*-- page init
====================================================== */
(function(){
    // 检测OS
    app.tools.platform.init();

    // 兼容android(如果开启android模式则重写响应函数用来)
    if(app.tools.platform.debug == "android"
     || app.tools.platform.os == "android")
    {

    }

    // 框架
    app.template.touch.init();
    app.template.swiper.init();
    app.template.Landscape.init();
    app.audio.init();
    app.debug.enable = false;

    app.p1.init();

    app.p1.bind_touch_event();
    app.p2.bind_touch_event();
})();

