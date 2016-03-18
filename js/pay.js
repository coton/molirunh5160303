var app = app || {};

/*-- html5-template
====================================================== */
app.template = function(){};


/* Landscape */
app.template.Landscape = function(){};
app.template.Landscape.init= function(){
    var Landscape = new mo.Landscape({
        pic: '../../js/motion/landscape.png',
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
};

app.template.swiper.prev = function(){
    app.template.swiper.mySwiper.unlockSwipes();
    app.template.swiper.mySwiper.slidePrev();
};

app.template.swiper.to = function(index){
    app.template.swiper.mySwiper.unlockSwipes();
    app.template.swiper.mySwiper.slideTo(index);
};

app.template.swiper.touch = function(index){
    app.template.swiper.mySwiper.unlockSwipes();
    app.template.swiper.mySwiper.slideTo(index);
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

    $("body").on("doubleTap longTap swipeLeft swipeRight", function(e){
        // e.stopPropagation();  // 阻止事件传递
        // e.preventDefault();   // 阻止浏览器默认动作(网页滚动)
        return false;
    });
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


/*-- p5
====================================================== */
app.p5 = function(){};
app.p5.init = function(){
    app.p5.judge();
      
};
var sex;
var groups;
var packages;
var size;
var sex1;
var packages1;
app.p5.judge=function(){
    
    if ($("#e-3-1").is(":checked")){
         sex="男";
         sex1="0";
    }else{
         sex="女";
         sex1="1";
    }
    if ($("#e-1-1").is(":checked")){
         groups="5";
    }else{
         groups="10";
    }
    if ($("#e-10-1").is(":checked")){
         packages="普通赛事包";
         packages1="0";
    }else{
        packages="高级赛事包";
         packages1="1";
    }
    if($("#e-11").val()=="XS"){
        size="XS(160/82A)";       
    }else if($("#e-11").val()=="S"){
        size="S (165/84A)";
    }else if($("#e-11").val()=="M"){
        size="M(170/88A)";
    }else if($("#e-11").val()=="L"){
        size="L(175/92A)";
    }else if($("#e-11").val()=="XL"){
        size="XL(180/96A)";
    }else if($("#e-11").val()=="XXL"){
        size="XXL(185/100A)";
    }
};

app.p5.bind_touch_event = function(){
    $(".p5 .btn1").on("touchend", function(){         
        window.overlay3 = new mo.Overlay({
        content: '<img src="../../img/f3.png" alt="" class="m-p5-1"><img src="../../img/transparent.png" alt="" class="m-p5-2">', 
        width: 549,
        height: 996
        });
        overlay3.on('open', function(){
            $('.m-p5-2').on('touchend', function(){
                window.overlay3.close();     
            });
        });
    });
};

app.p5.destory = function(){
};

/*-- p6
====================================================== */
app.p6 = function(){};
app.p6.init = function(){

};

app.p6.bind_touch_event = function(){
    $(".p6 .gotopay").on("touchend", function(){
        app.p6.callpay();
    });
    
    $(".p6 .prev").on("touchend", function(){
        window.location.href = "../../index.php"
    });
};

app.p6.callpay = function(){
    if (typeof WeixinJSBridge == "undefined"){
        if( document.addEventListener ){
            document.addEventListener('WeixinJSBridgeReady', app.p6.jsapicall, false);
        }else if (document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', app.p6.jsapicall); 
            document.attachEvent('onWeixinJSBridgeReady', app.p6.jsapicall);
        }
    }else{
        app.p6.jsapicall();
    }
};

app.p6.jsapicall = function(){
    WeixinJSBridge.invoke(
        'getBrandWCPayRequest', $JSAPIPARAMETERS, function(res){
            if(res.err_msg == "get_brand_wcpay_request:ok" )
            {
                $.post("../../db/updatepaystatus.php", {phone: $PHONE, outtradeno: $OUTTRADENO}, function(data){
                    if(data)
                    {
                        if(data.code == 0)
                        {
                            $(".p6").hide();
                            $(".p5").show();

                            $(".p5 .btn1").on("touchend", function(){
                                window.overlay3 = new mo.Overlay({
                                content: '<img src="../../img/f3.png" alt="" class="m-p5-1"><img src="../../img/transparent.png" alt="" class="m-p5-2">', 
                                width: 549,
                                height: 996
                                });
                                overlay3.on('open', function(){
                                    $('.m-p5-2').on('touchend', function(){
                                        window.overlay3.close();
                                    });
                                });
                            });
                        }else
                        {
                            alert("更新支付状态失败！错误代码: " + data.code);
                        }
                    }else{
                        alert("更新支付状态失败！错误代码: J9002");
                    }
                }, "json");


                $.post("../../db/updatestock.php", {phone: $PHONE}, function(data){
                    if(data)
                    {
                        if(data.code != 0)
                        {
                            alert("更新库存数据失败! 错误代码: " + data.code);
                        }
                    }else{
                        alert("更新库存数据失败! 错误代码: J9003");
                    }
                }, "json");
            }else{
                alert("支付失败！");
            }
        }
    );
};

app.p6.jsapicall1 = function(){
    $.post("../../db/updatepaystatus.php", {phone: $PHONE, outtradeno: $OUTTRADENO}, function(data){
        if(data)
        {
            if(data.code == 0)
            {
                $(".p6").hide();
                $(".p5").show();

                $(".p5 .btn1").on("touchend", function(){
                    window.overlay3 = new mo.Overlay({
                    content: '<img src="../../img/f3.png" alt="" class="m-p5-1"><img src="../../img/transparent.png" alt="" class="m-p5-2">', 
                    width: 549,
                    height: 996
                    });
                    overlay3.on('open', function(){
                        $('.m-p5-2').on('touchend', function(){
                            window.overlay3.close();
                        });
                    });
                });
            }else
            {
                alert("更新支付状态失败！错误代码: " + data.code);
            }
        }else{
            alert("更新支付状态失败！错误代码: J9002");
        }
    }, "json");


    $.post("../../db/updatestock.php", {phone: $PHONE}, function(data){
        if(data)
        {
            if(data.code != 0)
            {
                alert("更新库存数据失败! 错误代码: " + data.code);
            }
        }else{
            alert("更新库存数据失败! 错误代码: J9003");
        }
    }, "json");
};

app.p6.update_paystatus = function(){
    $.post("../../db/updatepaystatus.php", {outtradeno: $OUTTRADENO});
};

app.p6.update_stock = function(){
    $.post("../../db/updatestock.php");
};

app.p6.destory = function(){
};

app.wx=function(){};

app.wx.sharecontent_update = function(){   
    var nickname=$NICKNAME;
    var sharecontent = {title: "茉莉跑", desc: "已经参加“茉莉跑”公益活动，你愿意和TA一起为公益开跑吗？", moment: "已经参加“茉莉跑”公益活动，你愿意和TA一起为公益开跑吗？"}
    app.wechat.sharecontent = {title: sharecontent.title,
                                desc: nickname + sharecontent.desc,
                                titleformoment: nickname + sharecontent.moment, 
                                url: "https://pay.wechat.createcdigital.com/molirunh5160303/index.php", 
                                icon: "https://pay.wechat.createcdigital.com/molirunh5160303/img/share.jpg"
    };
    app.wechat.set_sharecontent();
};

/*-- for android
====================================================== */
var fuckandroid = {};
fuckandroid.app = function(){};
fuckandroid.app.audio = function(){};
fuckandroid.app.audio.play_tap = function(){
    //android不能同时播放连个音乐；
};
/*-- page init
====================================================== */
(function(){
    // 检测OS
    app.tools.platform.init();

    // 兼容android(如果开启android模式则重写响应函数用来)
    if(app.tools.platform.debug == "android"
     || app.tools.platform.os == "android")
    {
        app.audio.play_tap = fuckandroid.app.audio.play_tap;
    }

    // 框架
    app.template.touch.init();
    app.template.swiper.init();
    app.template.Landscape.init();
    app.audio.init();
    //tracking.pv_byfrom();

    /* page init */
    app.template.swiper.on_pageslideend = function(index){
        switch(index)
        {
            case 0:
                app.p6.init();
                break;
            case 1:
                app.p6.destory();
                app.p5.init();
                break;
        }
    };
    app.p6.bind_touch_event();
    app.debug.enable = false;

    app.wx.sharecontent_update();

    //app.p6.jsapicall1();
})();

