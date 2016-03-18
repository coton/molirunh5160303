<?php

    session_start();

    include_once 'connect.php';

    // for debug use $_GET["param"]
    // http://localhost/molirunh5160303/db/updatepaystatus.php?phone=18621018815&outtradeno=131507280120160308201844
    // get GET parameters
    // $phone              = $_GET['phone'];
    // $outtradeno         = $_GET['outtradeno'];

    // get POST parameters
    $phone      = $_POST['phone'];
    $outtradeno = $_POST['outtradeno'];
    $paystatus  = 1; // 已支付

    $errormsg = "";
    if(isset($phone) && isset($outtradeno))
    {
        if ($stmt = $mysqli->prepare("SELECT phone FROM user WHERE phone = ?")) {
            /* bind parameters for markers */
            $stmt->bind_param("s", $phone);

            /* execute query */
            $stmt->execute();

            $stmt->bind_result($rs_phone);

            /* fetch values */
            while ($stmt->fetch()) {
                 $rs_phone = $rs_phone;
             }

            if($rs_phone)
            {
                if ($stmt = $mysqli->prepare("UPDATE user SET paystatus=?, outtradeno=? WHERE phone=?")) {

                    // Bind the variables to the parameter as strings.
                    $stmt->bind_param("sss", $paystatus, $outtradeno, $phone);

                    // Execute the statement.
                    if($stmt->execute())
                        echo json_encode(array('code'=>0,'message'=>'success'));
                    else
                    {
                        $errormsg = array('code'=>9003,'message'=>'准备预执行T-SQL脚本发生错误！');
                    }


                }else
                {
                    $errormsg = array('code'=>9003,'message'=>'准备预执行T-SQL脚本发生错误！');
                }
            }else
                {
                    $errormsg = array('code'=>1001,'message'=>'更新支付状态的手机号码未找到！');
                }
        }else
        {
            $errormsg = array('code'=>9003,'message'=>'准备预执行T-SQL脚本发生错误！');
        }

        /* close statement */
        $stmt->close();

    }else
    {
        $errormsg = array('code'=>9005,'message'=>'请求参数phone&outtradeno不能为空!');
    }


    // inert to log table
    if($errormsg != "")
    {
        if ($stmt3 = $mysqli->prepare("INSERT INTO syslog (type, message) VALUES(?, ?)")) {
            /* bind parameters for markers */
            $type = 0;
            $message = 'updatepaystatus.php更新库存数据失败! code:'.$errormsg['code'].", message: ".$errormsg[
            'message']."parameters(phone:".$phone.").";
            $stmt3->bind_param("ss", $type, $message);

            /* execute query */
            $stmt3->execute();

            $stmt3->close();
        }

        echo json_encode($errormsg);
    }

    /* close connection */
     $mysqli->close();
?>