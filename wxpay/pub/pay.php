<?php
session_start();
ini_set('date.timezone','Asia/Shanghai');
//error_reporting(E_ERROR);
require_once "../lib/WxPay.Api.php";
require_once "WxPay.JsApiPay.php";
require_once 'log.php';


// for debug
// http://localhost/molirunh5160303/wxpay/pub/pay.php?grouptype=1&sex=0&name=coton&cardnumber=420682199101090014&phone=13564137185&size=M&packagetype=0
// $jsApiParameters = '{"appId":"wxc6d26827fed8ccc6","nonceStr":"20kp5is34n5hsho45ewo8353yaekczwy","package":"prepay_id=wx20160304155852702e4032000011927921","signType":"MD5","timeStamp":"1457078332","paySign":"8F0E49A6C0641B4B1C46AEF920A359AC"}';
// $_SESSION['openid'] = 'o1zitjlK5QY7rH113wDe2f96ThUtOw';
// $_SESSION['headimgurl'] = 'http://wx.qlogo.cn/mmopen/ajNVdqHZLLBUibh2dXOLU3DkiblnVLNCfOb6D6ViawSD8mtPSFl86lVg59cdSIZ7u40lBLPr3ibvVc1xynrpn2U2UQ/0';
// $_SESSION['nickname'] = 'coton_chen';

$openid      = $_SESSION['openid'];
$nickname    = $_SESSION['nickname'];
$grouptype   = $_GET['grouptype'];
$sex         = $_GET['sex'];
$name        = $_GET['name'];
$cardnumber  = $_GET["cardnumber"];
$phone       = $_GET["phone"];
$size        = $_GET['size'];
$packagetype = $_GET["packagetype"];

$body        = $packagetype == 0 ? "100元一般赛事包" : "200元高级赛事包";
$fee         = $packagetype == 0 ? "10000" : "20000";
$outtradeno  = WxPayConfig::MCHID.date("YmdHis");
//①、获取用户openid
$tools       = new JsApiPay();

//②、统一下单
$input = new WxPayUnifiedOrder();
$input->SetBody($body);
$input->SetAttach($body);
$input->SetOut_trade_no($outtradeno);
$input->SetTotal_fee($fee);
$input->SetTime_start(date("YmdHis"));
$input->SetTime_expire(date("YmdHis", time() + 600));
$input->SetGoods_tag($body);
$input->SetNotify_url("https://pay.wechat.createcdigital.com/molirunh5160303/wxpay/pub/notify.php");
$input->SetTrade_type("JSAPI");
$input->SetOpenid($openid);
$order = WxPayApi::unifiedOrder($input);
// echo '<font color="#f00"><b>统一下单支付单信息</b></font><br/>';
// printf_info($order);
$jsApiParameters = $tools->GetJsApiParameters($order);


//③、在支持成功回调通知中处理成功之后的事宜，见 notify.php
/**
 * 注意：
 * 1、当你的回调地址不可访问的时候，回调通知会失败，可以通过查询订单来确认支付是否成功
 * 2、jsapi支付时需要填入用户openid，WxPay.JsApiPay.php中有获取openid流程 （文档可以参考微信公众平台“网页授权接口”，
 * 参考http://mp.weixin.qq.com/wiki/17/c0f37d5704f0b64713d5d2c37b468d75.html）
 */
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

    <link rel="stylesheet" href="../../css/app.css">
    <link rel="stylesheet" href="../../js/swiper/swiper.min.css">
    <link rel="stylesheet" href="../../js/swiper/animate.min.css">
</head>
<body>
<!-- pagelist-->
<div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide p6">
            <img src="../../img/p6.png" alt="">
            <img src="../../img/transparent.png" alt="" class="gotopay">
            <img src="../../img/transparent.png" alt="" class="prev">
            <p class="e-1 con"><?php echo ($grouptype== 5 ? '5公里' : '10公里'); ?></p>
            <p class="e-2 con"><?php echo $name; ?></p>
            <p class="e-3 con"><?php echo $cardnumber; ?></p>
            <p class="e-4 con"><?php echo $phone; ?></p>
            <p class="e-5 con"><?php echo ($packagetype== 0 ? '一般赛事包' : '高级赛事包'); ?></p>
            <p class="e-6 con"><?php echo $size; ?></p>
        </div>
        <div class="swiper-slide p5">
            <img src="../../img/p5.png" alt="">
            <img src="../../img/transparent.png" alt="" class="btn1">
            <p class="e-1 con"><?php echo $name; ?></p>
            <p class="e-2 con"><?php echo ($sex == 0 ? '男' : '女'); ?></p>
            <p class="e-3 con"><?php echo ($grouptype == 5 ? '5公里' : '10公里'); ?></p>
            <p class="e-4 con"><?php echo ($packagetype == 0 ? '一般赛事包' : '高级赛事包'); ?></p>
            <p class="e-5 con"><?php if($size == "XS"){echo "XS(160/82A)";}else if($size == "S"){echo "S (165/84A)";}else if($size == "M"){echo "M(170/88A)";}else if($size == "L"){echo "L(175/92A)";}else if($size == "XL"){echo "XL(180/96A)";}else if($size == "XXL"){echo "XXL(185/100A)";} ?></p>
        </div>
    </div>
</div>

<!--audio-->
<div class="audio-icon">
    <audio id="audio-player" src="../../media/MP3.mp3" autoplay="autoplay" preload="preload" loop="loop" />
</div>

<!--Script
====================================================== -->
<script src="../../js/zepto/zepto.min.js"></script>
<script src="../../js/swiper/swiper.min.js"></script>
<script src="../../js/swiper/swiper.animate1.0.2.min.js"></script>
<script src="../../js/fastclick/fastclick.js"></script>
<script src="../../js/motion/landscape.min.js"></script>
<script src="../../js/motion/overlay.min.js"></script>
<?php include_once '../../weChat/weChatShareJS.php';?>
<script type="text/javascript">
    var $NICKNAME = "<?php echo $_SESSION['nickname']; ?>";
    var $JSAPIPARAMETERS = <?php echo $jsApiParameters; ?>;
    var $OUTTRADENO = "<?php echo $outtradeno; ?>";
    var $PHONE = "<?php echo $phone; ?>";
</script>
<script src="../../js/pay.js"></script>
</body>
</html>
