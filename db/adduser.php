<?php

	session_start();

	include_once 'connect.php';


	// for debug use $_GET["param"]
	// http://localhost/molirunh5160303/db/adduser.php?grouptype=5&teesize=L&name=coton&sex=0&age=198804&cardtype=0&cardnumber=42068819910119001x&phone=13816954340&ename=ecoton&ephone=13564137185&packagetype=0&paystatus=0

	// get GET parameters
	// $grouptype              = $_GET['grouptype'];
	// $teesize                = $_GET['teesize'];
	// $name                   = $_GET['name'];
	// $sex                    = $_GET['sex'];
	// $age                    = $_GET['age'];
	// $cardtype               = $_GET['cardtype'];
	// $cardnumber             = $_GET['cardnumber'];
	// $phone                  = $_GET['phone'];
	// $ename                  = $_GET['ename'];
	// $ephone                 = $_GET['ephone'];
	// $packagetype            = $_GET['packagetype'];
	// $paystatus              = $_GET['paystatus'];

	// $_SESSION['openid']     = 'o1zitjlK5QY7rH113wDe2f96ThUtOw';
	// $_SESSION['headimgurl'] = 'http://wx.qlogo.cn/mmopen/ajNVdqHZLLBUibh2dXOLU3DkiblnVLNCfOb6D6ViawSD8mtPSFl86lVg59cdSIZ7u40lBLPr3ibvVc1xynrpn2U2UQ/0';
	// $_SESSION['nickname']   = 'coton_chen';


	// get POST parameters
	$grouptype   = $_POST['grouptype'];
	$teesize     = $_POST['teesize'];
	$name        = $_POST['name'];
	$sex         = $_POST['sex'];
	$age         = $_POST['age'];
	$cardtype    = $_POST['cardtype'];
	$cardnumber  = $_POST['cardnumber'];
	$phone       = $_POST['phone'];
	$ename       = $_POST['ename'];
	$ephone      = $_POST['ephone'];
	$packagetype = $_POST['packagetype'];
	$paystatus   = $_POST['paystatus'];


	// wechat user info from session
	$openid     = $_SESSION["openid"];
	$headimgurl = $_SESSION["headimgurl"];
	$nickname   = $_SESSION["nickname"];

	// operation time
	$adate       = date("Y-m-d H:i:s",time());

    if(isset($openid))
    {
    	if ($stmt = $mysqli->prepare("SELECT paystatus FROM user WHERE phone = ? or cardnumber=?")) {
    		/* bind parameters for markers */
    		$stmt->bind_param("ss", $phone, $cardnumber);

    		/* execute query */
    		$stmt->execute();

 			/* bind result variables */
            $stmt->bind_result($rs_paystatus);

            /* fetch values */
            while ($stmt->fetch()) {
                 $rs_paystatus = $rs_paystatus;
             }

            if(!isset($rs_paystatus))
            {
				if ($stmt = $mysqli->prepare("INSERT INTO user (openid, headimgurl, nickname, grouptype, teesize, name, sex, age, cardtype, cardnumber, phone, ename, ephone, packagetype, paystatus, adate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")) {

				    // Bind the variables to the parameter as strings.

				    $stmt->bind_param("ssssssssssssssss", $openid, $headimgurl, $nickname, $grouptype, $teesize, $name, $sex, $age, $cardtype, $cardnumber, $phone, $ename, $ephone, $packagetype, $paystatus, $adate);

				    // Execute the statement.
				    if($stmt->execute())
				    	echo json_encode(array('code'=>0,'message'=>'success'));
				    else
				    	echo json_encode(array('code'=>9004,'message'=>'执行T-SQL脚本发生错误！'));



				}else
					echo json_encode(array('code'=>9003,'message'=>'准备预执行T-SQL脚本发生错误！'));

			}else
				echo json_encode(array('code'=>1002,'message'=>'注册的手机号码或证件号码已存在！', 'paystatus'=>$rs_paystatus));

			// Close the prepared statement.
		    $stmt->close();

			/* close connection */
			$mysqli->close();
		}else
			echo json_encode(array('code'=>9003,'message'=>'准备预执行T-SQL脚本发生错误！'));

	}else
		echo json_encode(array('code'=>9005,'message'=>'参数不能为空！'));
?>
