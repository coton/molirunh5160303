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

	<link rel="stylesheet" href="css/app.css">
	<link rel="stylesheet" href="js/swiper/swiper.min.css">
	<link rel="stylesheet" href="js/swiper/animate.min.css">
	<link rel="stylesheet" href="js/audioplayer/audioplayer.css">
  <!-- baidu tongji-->
  <script>
  var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?c4dd3cee5813713f77610d027e05bc2d";
    var s = document.getElementsByTagName("script")[0]; 
    s.parentNode.insertBefore(hm, s);
  })();
  </script>
</head>
<body>
<!-- loading -->
<div class="loading">
	<div id="loader-e-1" class="loader-e-1"></div>
	<div class="loader"><h1></h1></div>
</div>	
<!-- pagelist-->
<div class="swiper-container">
	<div class="swiper-wrapper">
		<div class="swiper-slide p1">
			<img class="bg1" src="img/p1.png" alt="">	
    	<img src="img/transparent.png" alt="" class="btn1">
    	<img src="img/transparent.png" alt="" class="btn2">
      <div class="disclaimer-shade" id="disclaimer-shade"></div>
      <div class="disclaimer" id="disclaimer">
          <img data-src="img/f1.png" alt="" class="m-p1-1" />
          <div class="disclaimer-wrapper" id="disclaimer-wrapper">
             <div class="scroller">
              <p>本人自愿参加爱茉莉太平洋女性健康公益跑“茉莉跑”活动，并已认真阅读本活动须知：</p>
              <p>1. 参赛者保证本人身体健康状况完全满足参赛要求，如患有不适合参赛的疾病（如心脑血管类疾病等），不应参加活动；如明知患有此类疾病而仍然隐瞒并报名参加活动的，一切责任自负。主办方有权拒绝此类人员参赛。监护人应对自身及参赛者的身体状况和能力做正确及合理判断。</p>
              <p>2. 由于不可抗力原因或极端天气条件造成茉莉跑活动被取消、推迟或更改，主办方无须进一步承担任何义务和作任何退款赔偿。</p>
              <p>3. 秉着公平、公正、公开的原则，主办方有权要求参赛者在必要的时候出示相关身份证明，以确认参赛者资格属实。若参赛者无法出示相关证明，将被取消参加资格；参赛者如恶意重复报名或以不正当方式参加活动，主办方将有权在无须事先通知的前提下取消其参加资格。</p>
              <p>4. 主办方在本次活动中收集的个人信息包括但不限于参赛者及其监护人信息等，系为购买保险、活动准备和参赛者联系之需要，请确保信息填写正确、完整；主办方亦将可能要求参赛者提供其必要个人信息的证明资料。</p>
              <p>5. 主办方收集信息和资料将遵循合法、正当、必要之原则，其目的仅限于本活动之需要。主办方承诺不会将参赛者及其监护人的个人信息用于本活动之外进行和推广等其他用途。</p>
              <p>6. 在茉莉跑活动中，非因由主办方的疏忽造成的重大过失而引致的任何财产损失或人身生命伤害都不应向主办方及其关联公司和职员要求承担任何责任。</p>
              <p>7. 为确保茉莉跑活动及参赛者个人的安全，除了官方活动/医疗车辆外，参赛者全程不允许携带任何宠物或搭乘任何有轮代步工具。</p>
              <p>8. 参赛者同意授权主办方、承办单位及其他相关合作机构选用任何有关此项活动的照片、视频及其本人肖像图（仅指本次活动的肖像）作任何永久性的用途而无需支付任何费用。</p>
             </div>
          </div>
          <img src="img/transparent.png" alt="" class="m-p2-2" />
          <img src="img/transparent.png" alt="" class="m-p2-3" />
      </div>
		</div>
		<div class="swiper-slide p2">
			<img src="img/p2.png" alt="">
			<img class="btn1" src="img/transparent.png" alt="">
      <img class="btn2" src="img/transparent.png" alt="">
      <div class="disclaimer-shade" id="disclaimer-shade1"></div>
      <div class="disclaimer" id="disclaimer1">
          <img data-src="img/f1.png" alt="" class="m-p1-1" />
          <div class="disclaimer-wrapper" id="disclaimer-wrapper1">
             <div class="scroller">
              <p>本人自愿参加爱茉莉太平洋女性健康公益跑“茉莉跑”活动，并已认真阅读本活动须知：</p>
              <p>1. 参赛者保证本人身体健康状况完全满足参赛要求，如患有不适合参赛的疾病（如心脑血管类疾病等），不应参加活动；如明知患有此类疾病而仍然隐瞒并报名参加活动的，一切责任自负。主办方有权拒绝此类人员参赛。监护人应对自身及参赛者的身体状况和能力做正确及合理判断。</p>
              <p>2. 由于不可抗力原因或极端天气条件造成茉莉跑活动被取消、推迟或更改，主办方无须进一步承担任何义务和作任何退款赔偿。</p>
              <p>3. 秉着公平、公正、公开的原则，主办方有权要求参赛者在必要的时候出示相关身份证明，以确认参赛者资格属实。若参赛者无法出示相关证明，将被取消参加资格；参赛者如恶意重复报名或以不正当方式参加活动，主办方将有权在无须事先通知的前提下取消其参加资格。</p>
              <p>4. 主办方在本次活动中收集的个人信息包括但不限于参赛者及其监护人信息等，系为购买保险、活动准备和参赛者联系之需要，请确保信息填写正确、完整；主办方亦将可能要求参赛者提供其必要个人信息的证明资料。</p>
              <p>5. 主办方收集信息和资料将遵循合法、正当、必要之原则，其目的仅限于本活动之需要。主办方承诺不会将参赛者及其监护人的个人信息用于本活动之外进行和推广等其他用途。</p>
              <p>6. 在茉莉跑活动中，非因由主办方的疏忽造成的重大过失而引致的任何财产损失或人身生命伤害都不应向主办方及其关联公司和职员要求承担任何责任。</p>
              <p>7. 为确保茉莉跑活动及参赛者个人的安全，除了官方活动/医疗车辆外，参赛者全程不允许携带任何宠物或搭乘任何有轮代步工具。</p>
              <p>8. 参赛者同意授权主办方、承办单位及其他相关合作机构选用任何有关此项活动的照片、视频及其本人肖像图（仅指本次活动的肖像）作任何永久性的用途而无需支付任何费用。</p>
             </div>
          </div>
          <img src="img/transparent.png" alt="" class="m-p2-2" />
          <img src="img/transparent.png" alt="" class="m-p2-3" />
      </div>
		</div>
		<div class="swiper-slide p3">
			<img src="img/p3.png" alt="">
			<img class="btn1" src="img/transparent.png" alt="">
          	<img class="btn2" src="img/transparent.png" alt="">
          	<div class="e-1-1 con1"  id="e-1">
              <input type="radio" name="level" id="e-1-1" checked="checked" value="5" >
              <label for="e-1-1"></label>
          	</div>
         	<div class="e-1-2 con1"  id="e-1-2-2">
               <input type="radio" name="level" id="e-1-2" value="10">
               <label for="e-1-2"></label>	
          	</div>	                           	  
          	<select name="size" class="e-11" id="e-11">
               <option value="XS">XS(160/82A)</option>
               <option value="S">S (165/84A)</option>
               <option value="M">M(170/88A)</option>
               <option value="L">L(175/92A)</option>
               <option value="XL">XL(180/96A)</option>
               <option value="XXL">XXL(185/100A)</option>
          	</select>
          	<input type="text" name="name" class="e-2 con2"  id="e-2" value="">
          	<div class="e-3-1 con1"> 
              <input type="radio" name="sex" id="e-3-1" checked="checked" value="0">
              <label for="e-3-1"></label>	
          	</div>
          	<div class="e-3-2 con1">
              <input type="radio" name="sex"  id="e-3-2" value="1">
              <label for="e-3-2"></label>		
          	</div>	                              
          	<div class="e-4" id="e-4">
          	   <select name="year" class="e-4-1" id="year"></select><!-- <span>年</span> -->
          	   <select name="month" class="e-4-2" id="month"></select><!-- <span>月</span> -->
          	</div>	                          
          	<select name="IDchange" class="e-9" id="e-9">
               <option value="0">身份证</option>
               <option value="1">护照</option>
               <option value="2">港澳通行证</option>
               <option value="3">台胞证</option>
          	</select>
          	<input type="text" name="IDcard" class="e-5 con2" id="e-5" value="">
          	<input type="text" name="phone" class="e-6 con2" id="e-6" value="">
          	<input type="text" name="econtactp" class="e-7 con2" id="e-7" value="">
          	<input type="text" name="ephone" class="e-8 con2" id="e-8" value="">
          	<div class="hit" id="hit"></div>
		</div>
    	<div class="swiper-slide p4">
			<img src="img/p4.png" alt="">
			<img src="img/p4-3.png" alt="" class="p4-1 ani" swiper-animate-effect="zoomIn" swiper-animate-delay="0.6s">
			<img src="img/p4-4.png" alt="" class="p4-2 ani" swiper-animate-effect="flash" swiper-animate-delay="0.6s">
			<img class="btn1" src="img/transparent.png" alt="">
      		<img class="btn2" src="img/transparent.png" alt="">
      		<div class="e-10-1 con1" id="generalpackage">
               <input type="radio" name="package"  id="e-10-1" value="0">
               <label for="e-10-1"></label>
          	</div>
          	<div class="e-10-2 con1" id="seniorpackage">
               <input type="radio" name="package" id="e-10-2"  value="1">
               <label for="e-10-2"></label>
          	</div>
		</div>
		<div class="swiper-slide p5">
			<img src="img/p5.png" alt="">
			<img src="img/transparent.png" alt="" class="btn1">
			<p class="e-1 con"></p>
			<p class="e-2 con"></p>
			<p class="e-3 con"></p>
			<p class="e-4 con"></p>
			<p class="e-5 con"></p>
		</div>
	</div>
</div>



<!--audio-->
<div class="audio-icon">
	<audio id="audio-player" src="media/MP3.mp3" autoplay="autoplay" preload="preload" loop="loop" />
</div>

<img class="hiddenimg"  src="img/p1.png" alt="">
<img class="hiddenimg"  src="img/p2.png" alt="">
<img class="hiddenimg"  src="img/p3.png" alt="">
<img class="hiddenimg"  src="img/p4.png" alt="">
<img class="hiddenimg"  src="img/p4-3.png" alt="">
<img class="hiddenimg"  src="img/p4-4.png" alt="">
<img class="hiddenimg"  src="img/p5.png" alt="">
<img class="hiddenimg"  src="img/p6.png" alt="">
	<!--Script
====================================================== -->
<script src="js/zepto/zepto.min.js"></script>
<script src="js/motion/loader.min.js"></script>
<script src="js/motion/film.min.js"></script>
<script src="js/swiper/swiper.min.js"></script>
<script src="js/swiper/swiper.animate1.0.2.min.js"></script>
<script src="js/fastclick/fastclick.js"></script>
<script src="js/motion/landscape.min.js"></script>
<script src="js/motion/overlay.min.js"></script>
<script src="js/iscroll/iscroll.js"></script>
<?php include_once 'weChat/weChatShareJS.php';?>
<script>
    var $OPENID = "<?php echo $_SESSION['openid'] ?>";
    var $NICKNAME = "<?php echo $_SESSION['nickname'] ?>";
</script>
<script src="js/app.js"></script>
<script language="javascript">
onload = function (){
    var myScroll = new IScroll('#disclaimer-wrapper');
    var myScroll1 = new IScroll('#disclaimer-wrapper1');
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

    var age = document.getElementById ('year');
    for ( var i = 1998; i >= 1956; i--){
     var option = document.createElement ('option');
     option.value = i;
     var txt = document.createTextNode (i);
     option.appendChild (txt);
     age.appendChild (option);
    }
    var age1 = document.getElementById ('month');  
  for ( var i = 1; i <= 12; i++){
     var option = document.createElement ('option');
     option.value = i;
     var txt = document.createTextNode (i);
     option.appendChild (txt);
     if(i==4)
      option.selected = true;
     age1.appendChild (option);
  }
}
</script>
</body>
</html