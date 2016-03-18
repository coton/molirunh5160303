<!--WeChat Autho
====================================================== -->
<?php
    session_start();

    $_SESSION['url'] = 'http://'.$_SERVER['SERVER_NAME'].$_SERVER["REQUEST_URI"];
    if(!isset($_SESSION["openid"]) && !isset($_SESSION["headimgurl"]) && !isset($_SESSION["nickname"]))
    {
        include_once 'weChat/weChatAutho.php';
    }else
    {
        // userinfo
        // echo 'openid:'.$_SESSION['openid'] . '<br />';
        // echo 'headimgurl:'.$_SESSION['headimgurl'] . '<br />';
        // echo 'nickname:'.$_SESSION['nickname'] . '<br />';
    }
    // for debug
    // $_SESSION['openid'] = 'o1zitjlK5QY7rH113wDe2f96ThUtOw';
    // $_SESSION['headimgurl'] = 'http://wx.qlogo.cn/mmopen/ajNVdqHZLLBUibh2dXOLU3DkiblnVLNCfOb6D6ViawSD8mtPSFl86lVg59cdSIZ7u40lBLPr3ibvVc1xynrpn2U2UQ/0';
    // $_SESSION['nickname'] = 'coton_chen';
?>
<!DOCTYPE html>
<html lang="en">
<!-- <html lang="en" manifest="app.appcache"> -->
<head>
    <title>茉莉跑</title>
    <meta charset="UTF-8">
    <meta name="format-detection" content="telephone=no" />
    <meta name="viewport" content="width=640, user-scalable=no"/>
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta name="format-detection" content="telephone=no">

    <link rel="stylesheet" href="css/userinfo.css">
    <link rel="stylesheet" href="js/swiper/swiper.min.css">
    <link rel="stylesheet" href="js/swiper/animate.min.css">
    <link rel="stylesheet" href="js/audioplayer/audioplayer.css">
</head>
<body>
<!-- pagelist-->
<div class="swiper-container">
    <div class="swiper-wrapper">
        <div class="swiper-slide p1">
            <div class="phonenumber">
                <input type="text" id="phonenumber">
            </div>
            <div class="hit"><!-- 错误信息提示 --></div>
            <img src="img/transparent.png" alt="" class="btn-query">
        </div>
        <div class="swiper-slide p2">
            <div class="name"><!-- 姓名< --></div>
            <div class="sex"><!-- 男 --></div>
            <div class="grouptype"><!-- 10公里 --></div>
            <div class="packagetype"><!-- 200元高级赛事包 --></div>
            <div class="teesize"><!-- XXL(185/100A) --></div>
            <img src="img/transparent.png" alt="" class="btn-share">
        </div>
    </div>
</div>

<!--audio-->
<div class="audio-icon">
    <audio id="audio-player" src="media/MP3.mp3" autoplay="autoplay" preload="preload" loop="loop" />
</div>

<!--Script
====================================================== -->
<script src="js/zepto/zepto.min.js"></script>
<script src="js/swiper/swiper.min.js"></script>
<script src="js/swiper/swiper.animate1.0.2.min.js"></script>
<script src="js/fastclick/fastclick.js"></script>
<script src="js/motion/landscape.min.js"></script>
<script src="js/motion/overlay.min.js"></script>
<?php include_once 'weChat/weChatShareJS.php';?>
<script>
    var $OPENID = "<?php echo $_SESSION['openid'] ?>";
    var $NICKNAME = "<?php echo $_SESSION['nickname'] ?>";
</script>
<script src="js/userinfo.js"></script>
</body>
</html>