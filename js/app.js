var app = app || {};

/*-- html5-template
====================================================== */
app.template = function(){};

/* loader */
app.template.loader = function(){};
app.template.loader.init = function(){
	// loader
  var getSource = function(){
        var res = [];

        return res;
    }

    new mo.Loader(getSource(),{
        loadType : 1,
        minTime : 100,
        onLoading : function(count,total){
            console.log('onloading:single loaded:',arguments)
            $(".loader h1").html(''+Math.round(count/total*100)+'%');
        },
        onComplete : function(time){
            console.log('oncomplete:all source loaded:',arguments);
            app.template.loader.destory();
            app.template.loader.done_callback.call();
            app.template.loader.done_callback2.call();
        }
    });
};

app.template.loader.done_callback = function(){};
app.template.loader.done_callback2 = function(){};

app.template.loader.destory = function(){
    $(".loading").remove();
};

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
	app.template.loader.done_callback = app.template.swiper.bind;
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

    app.template.loader.done_callback2 = app.audio.show;
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

};
app.p1.bind_touch_event = function(){
    
    $(".p1 .btn1").on("touchend", function(){
        app.template.swiper.next();
    }); 
    $(".p1 .btn2").on("touchend", function(){
        app.p1.show_layout();  
    });     
};

app.p1.show_layout = function(){
    $("#disclaimer .m-p1-1").attr("src", $("#disclaimer .m-p1-1").attr("data-src"));
    $("#disclaimer .m-p1-1").css({"width":"640px", "height": "1031px"});
    $("#disclaimer-shade").css({"width":"640px", "height": "100%"});
    $("#disclaimer").css({"width":"640px", "height": "100%"});
    $("#disclaimer-wrapper").css("opacity", "1");

   $('#disclaimer .m-p2-2').on('touchend', function(){
        $("#disclaimer .m-p1-1").css({"width":"0px", "height": "0px"});
        $("#disclaimer").css({"width":"0px", "height": "0px"});
        $("#disclaimer-wrapper").css("opacity", "0");
        $("#disclaimer-shade").css({"width":"0px", "height": "0px"});
        app.template.swiper.to(2);
    });

   $('#disclaimer .m-p2-3').on('touchend', function(){
        $("#disclaimer .m-p1-1").css({"width":"0px", "height": "0px"});
        $("#disclaimer").css({"width":"0px", "height": "0px"});
        $("#disclaimer-wrapper").css("opacity", "0");
        $("#disclaimer-shade").css({"width":"0px", "height": "0px"});
    });

} 

app.p1.destory = function(){};

/*-- p2
====================================================== */
app.p2 = function(){};
app.p2.init = function(){};
app.p2.bind_touch_event = function(){
    
    $(".p2 .btn1").on("touchend", function(){
        app.p2.show_layout();
    }); 
     $(".p2 .btn2").on("touchend", function(){
        app.template.swiper.prev(); 
    });     
};

app.p2.show_layout = function(){
    $("#disclaimer1 .m-p1-1").attr("src", $("#disclaimer1 .m-p1-1").attr("data-src"));
    $("#disclaimer1 .m-p1-1").css({"width":"640px", "height": "1031px"});
    $("#disclaimer-shade1").css({"width":"640px", "height": "100%"});
    $("#disclaimer1").css({"width":"640px", "height": "100%"});
    $("#disclaimer-wrapper1").css("opacity", "1");

   $('#disclaimer1 .m-p2-2').on('touchend', function(){
        $("#disclaimer1 .m-p1-1").css({"width":"0px", "height": "0px"});
        $("#disclaimer1").css({"width":"0px", "height": "0px"});
        $("#disclaimer-wrapper1").css("opacity", "0");
        $("#disclaimer-shade1").css({"width":"0px", "height": "0px"});
        app.template.swiper.to(2);
    });

   $('#disclaimer1 .m-p2-3').on('touchend', function(){
        $("#disclaimer1 .m-p1-1").css({"width":"0px", "height": "0px"});
        $("#disclaimer1").css({"width":"0px", "height": "0px"});
        $("#disclaimer-wrapper1").css("opacity", "0");
        $("#disclaimer-shade1").css({"width":"0px", "height": "0px"});
    });

} 
app.p2.destory = function(){};

/*-- p3
====================================================== */
app.p3 = function(){};
app.p3.init = function(){
    app.p3.checkstock_bygrouptype();
};

app.p3.checkstock_bygrouptype = function(){
    $.getJSON("db/getstock.php",function(data){
        if(data.length > 0)
        {
            // 参数组别人数限额
            if(data[0].fivekms <= 0)
            {
                $("#e-1").remove();
                $("#e-1-2").attr("checked", "checked");
            }
            if(data[0].tenkms <= 0)
            {
                $("#e-1-2-2").remove();
                if($("#e-1-1"))
                    $("#e-1-1").attr("checked", "checked");
            }

            if(data[0].fivekms <= 0 && data[0].tenkms <= 0)
            {
                $(".p3 .btn1").hide();
                alert("很抱歉！本次活动报名人数名额已满！");
            }

            // T恤尺码库存
            if(data[0].xssize <= 0)
                $("#e-11 option[value='XS']").remove();
            if(data[0].ssize <= 0)
                $("#e-11 option[value='S']").remove();;
            if(data[0].msize <= 0)
                $("#e-11 option[value='M']").remove();
            if(data[0].lsize <= 0)
                $("#e-11 option[value='L']").remove();;
            if(data[0].xlsize <= 0)
                $("#e-11 option[value='XL']").remove();
            if(data[0].xxlsize <= 0)
                $("#e-11 option[value='XLL']").remove();;



            if(data[0].xssize <= 0 && data[0].ssize <= 0
                 && data[0].msize <= 0 && data[0].lsize <= 0
                 && data[0].xlsize <= 0 && data[0].xxlsize <= 0)
            {
                $(".p3 .btn1").hide();
                alert("很抱歉！本次活动的T恤尺码已全部没有库存！");
            }
        }
    });
};

app.p3.bind_touch_event = function(){

    // 解决点击证件类型光标闪跳问题
    $("#e-11").on("focus", function(){
        app.p3.disabled_alltextinput();
    });

    $("#e-11").on("blur change", function(){
        app.p3.enabled_alltextinput();
    });

    $(".e-4-1").on("focus", function(){
        app.p3.disabled_alltextinput();
    });

    $(".e-4-1").on("blur change", function(){
        app.p3.enabled_alltextinput();
    });

    $(".e-4-2").on("focus", function(){
        app.p3.disabled_alltextinput();
    });

    $(".e-4-2").on("blur change", function(){
        app.p3.enabled_alltextinput();
    });

    $("#e-9").on("focus", function(){
        app.p3.disabled_alltextinput();
    });

    $("#e-9").on("blur change", function(){
        app.p3.enabled_alltextinput();
    });



    $(".p3 .btn1").on("touchend", function(){
        var phone_patt = new RegExp(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/); // 手机号码
        var id_patt = new RegExp(/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/); // 身份证
        //var passport_patt = new RegExp(/^(P\d{7}|G\d{8}|S\d{7,8}|D\d+|1[4,5]\d{7})$/);//护照正则,各国护照格式不一致，所以只做为空验证
        var hkm_patt = new RegExp(/^[HMhm]{1}([0-9]{10}|[0-9]{8})$/); // 港澳通行证号码
        var tw_patt = new RegExp(/\d{8}/); // 台胞证

        if($("#e-2").val() != "" && $("#e-5").val() != "" && $("#e-6").val() != "" && phone_patt.test($("#e-6").val()) && $("#e-7").val() != "" && $("#e-8").val() != "" && phone_patt.test($("#e-8").val()))
        {
            var card_number = $("#e-5").val();
            if(($("#e-9").val()== "0" && id_patt.test(card_number)) || ($("#e-9").val() == "1" && $("#e-9").val() != "")
             || ($("#e-9").val()== "2" && hkm_patt.test(card_number)) || ($("#e-9").val()== "3" && tw_patt.test(card_number)))
            {
                app.template.swiper.next();
            }else
               app.p3.show_hit(); 
        }else
            app.p3.show_hit();
    });

    $(".p3 .btn2").on("touchend", function(){
        app.template.swiper.to(0);
    });
};

app.p3.disabled_alltextinput = function(){
    $("#e-2").attr("disabled", "disabled");
    $("#e-5").attr("disabled", "disabled");
    $("#e-6").attr("disabled", "disabled");
    $("#e-7").attr("disabled", "disabled");
    $("#e-8").attr("disabled", "disabled");
};

app.p3.enabled_alltextinput = function(){
    $("#e-2").removeAttr("disabled");
    $("#e-5").removeAttr("disabled");
    $("#e-6").removeAttr("disabled");
    $("#e-7").removeAttr("disabled");
    $("#e-8").removeAttr("disabled");
};

app.p3.show_hit = function(){
    window.overlay2 = new mo.Overlay({
        content: '<img src="img/f2.png" alt="" class="m-p3-1"><img src="img/transparent.png" alt="" class="m-p3-2">', 
        width: 549,
        height: 996
    });
    overlay2.on('open', function(){
        $('.m-p3-2').on('touchend', function(){
            window.overlay2.close();     
        });
     });
};
app.p3.destory = function(){};

/*-- p4
====================================================== */
app.p4 = function(){};
app.p4.init = function(){
    app.p4.checkstock_bypackagetype();
};

app.p4.checkstock_bypackagetype = function(){
    $.getJSON("db/getstock.php",function(data){
        if(data.length > 0)
        {
            // 赛事包限额
            if(data[0].generalpackage <= 0)
            {
                $("#generalpackage").remove();
                $("#e-10-2").attr("checked", "checked");
            }
            if(data[0].seniorpackage <= 0)
            {
                $("#seniorpackage").remove();
                if($("#e-10-1"))
                    $("#e-10-1").attr("checked", "checked");
            }

            if(data[0].generalpackage <= 0 && data[0].seniorpackage <= 0)
            {
                $(".p4 .btn1").hide();
                alert("很抱歉！本次活动的赛事包已全部售罄！");
            }
        }
    });
}

app.p4.bind_touch_event = function(){
    $(".p4 .btn2").on("touchend", function(){
        app.template.swiper.prev(); 
    });  
    $(".p4 .btn1").on("touchend", function(){
        app.p5.judge();
        if($("#e-10-1").is(":checked")||$("#e-10-2").is(":checked")){ 
            var paystatus=0;
            var year=$("#year").val();
            var month=$("#month").val();

            var data = {
                        grouptype: groups,
                        name: $("#e-2").val(),
                        sex: sex1,
                        age: year+month,
                        cardtype:$("#e-9").val(),
                        cardnumber: $("#e-5").val(),
                        phone: $("#e-6").val(),
                        ename: $("#e-7").val(),
                        ephone: $("#e-8").val(),
                        teesize:$("#e-11").val(),
                        packagetype:packages1,
                        paystatus:0 // 待支付
                    };

            $.post("db/adduser.php", data, function(data){
                if(data)
                {
                    if(data.code == 0 || (data.code == 1002 && data.paystatus==0))
                    {
                        window.location.href = "wxpay/pub/pay.php?grouptype="+groups
                                            +"&name="+$("#e-2").val()+"&sex="+sex1
                                            +"&cardnumber="+$("#e-5").val()
                                            +"&phone="+$("#e-6").val()
                                            +"&packagetype="+ packages1
                                            +"&size="+$("#e-11").val();
                    }else if(data.code == 1002 && data.paystatus == 1){
                        alert("您已是报名用户！可在报名查询中查询报名信息！");
                    }else
                        alert("报名失败！错误代码: " + data.code);
                }else{
                    alert("报名失败！错误代码: J9001");
                }

            }, "json")

        }else{
            app.p4.show_layout1();
        }
    });
};
app.p4.show_layout1 = function(){
    window.overlay1 = new mo.Overlay({
        content: '<img src="img/f4-1.png" alt="" class="m-p4-1"><img src="img/transparent.png" alt="" class="m-p4-2">', 
        width: 549,
        height: 996
    });
    overlay1.on('open', function(){
        $('.m-p4-2').on('touchend', function(){
            window.overlay1.close();     
        });
     });
};
app.p4.destory = function(){};
app.p4.paystatus=function(){
    for(var i=0;i<=2000;i++)
    if(paystatus=="1"){
        var j=i+1;
    }
}

/*-- p5
====================================================== */
app.p5 = function(){};
app.p5.init = function(){ 
    app.p5.judge();
    $(".p5 .e-1").html(''+$("#e-2").val()+'');
    $(".p5 .e-2").html(''+sex+'');
    $(".p5 .e-3").html(''+groups+'公里');
    $(".p5 .e-4").html(''+packages+''); 
    $(".p5 .e-5").html(''+size+'');
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
        content: '<img src="img/f3.png" alt="" class="m-p5-1"><img src="img/transparent.png" alt="" class="m-p5-2">', 
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

app.wx=function(){};

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
    app.template.loader.init();
    app.template.Landscape.init();
    app.audio.init();
    //tracking.pv_byfrom();
    
    
    /* page init */
    app.template.swiper.on_pageslideend = function(index){
        switch(index)
        {
            case 0:
                app.p1.init();
                break;
            case 1:
                app.p1.destory();
                app.p2.init();
                break;
            case 2:
                app.p2.destory();
                app.p3.init();
                break;
            case 3:
                app.p3.destory();
                app.p4.init();
                break;
            case 4:
                app.p4.destory();
                app.p5.init();
                break;
            case 5:
                app.p5.destory();
                
                break;
        }
    };

    app.p1.bind_touch_event();
    app.p2.bind_touch_event();
    app.p3.bind_touch_event();
    app.p4.bind_touch_event();
    app.p5.bind_touch_event();
    
    app.debug.enable = false;

    app.wx.sharecontent_update();
})();

