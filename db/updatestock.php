<?php
    session_start();

    include_once 'connect.php';

    // for debug use $_GET["param"]
    // http://localhost/molirunh5160303/db/updatestock.php?phone=13564137185
    // $phone    = $_GET['phone'];

    // wechat user info from session
    $phone = $_POST['phone'];

    $errormsg = "";
    if(isset($phone))
    {
        if ($stmt = $mysqli->prepare("SELECT grouptype, teesize, packagetype FROM user WHERE phone=? and paystatus=1")) {

            // Bind the variables to the parameter as strings.
            $stmt->bind_param("s", $phone);

            /* execute query */
            $stmt->execute();

            /* bind result variables */
            $stmt->bind_result($grouptype, $teesize, $packagetype);

            /* fetch values */
            while ($stmt->fetch()) {
                 $grouptype   = $grouptype;
                 $teesize     = $teesize;
                 $packagetype = $packagetype;
             }

             if(isset($grouptype) && isset($teesize) && isset($packagetype))
             {
                if ($stmt1 = $mysqli->prepare("SELECT fivekms, tenkms, xssize, ssize, msize, lsize, xlsize, xxlsize, generalpackage, seniorpackage FROM stock")) {

                    /* execute query */
                    $stmt1->execute();

                    /* bind result variables */
                    $stmt1->bind_result($fivekms, $tenkms, $xssize, $ssize, $msize, $lsize, $xlsize, $xxlsize, $generalpackage, $seniorpackage);

                    /* fetch values */
                    while ($stmt1->fetch()) {
                         $fivekms        = $fivekms;
                         $tenkms         = $tenkms;
                         $xssize         = $xssize;
                         $ssize          = $ssize;
                         $msize          = $msize;
                         $lsize          = $lsize;
                         $xlsize         = $xlsize;
                         $xxlsize        = $xxlsize;
                         $generalpackage = $generalpackage;
                         $seniorpackage  = $seniorpackage;
                    }

                    if(isset($fivekms) && isset($tenkms) && isset($xssize) && isset($ssize) && isset($msize) && isset($lsize) && isset($xlsize) && isset($xxlsize) && isset($generalpackage) && isset($seniorpackage))
                    {

                        // update stock
                        if($grouptype === 5)
                            $fivekms--;
                        else if($grouptype === 10)
                            $tenkms--;

                        if($teesize === "XS")
                            $xssize--;
                        else if($teesize === "S")
                            $ssize--;
                        else if($teesize === "M")
                            $msize--;
                        else if($teesize === "L")
                            $lsize--;
                        else if($teesize === "XL")
                            $xlsize--;
                        else if($teesize === "XXL")
                            $xxlsize--;

                        if($packagetype === 0)
                            $generalpackage--;
                        else if($packagetype === 1)
                            $seniorpackage--;

                        if ($stmt2 = $mysqli->prepare("UPDATE stock SET fivekms=?, tenkms=?, xssize=?, ssize=?, msize=?, lsize=?, xlsize=?, xxlsize=?, generalpackage=?, seniorpackage=?")) {

                            // Bind the variables to the parameter as strings.
                            $stmt2->bind_param("ssssssssss", $fivekms, $tenkms, $xssize, $ssize, $msize, $lsize, $xlsize, $xxlsize, $generalpackage, $seniorpackage);

                            /* execute query */
                            if($stmt2->execute())
                                echo json_encode(array('code'=>0,'message'=>'success'));
                            else
                            {
                                $errormsg = array('code'=>9003,'message'=>'准备预执行T-SQL脚本发生错误！');
                            }

                            $stmt2->close();
                        }else
                        {
                            $errormsg = array('code'=>1005,'message'=>'库存字段数据为空！');
                        }
                    }else
                    {
                        $errormsg = array('code'=>9003,'message'=>'准备预执行T-SQL脚本发生错误！');
                    }
                }else
                {
                    $errormsg = array('code'=>1004,'message'=>'查询数据库stock为空！');
                }

                $stmt1->close();
             }else
            {
                $errormsg = array('code'=>1003,'message'=>'根据phone查询的数据为空！');
            }

        }else
        {
            $errormsg = array('code'=>9003,'message'=>'准备预执行T-SQL脚本发生错误！');
        }

        $stmt->close();
    }else
    {
        $errormsg = array('code'=>9005,'message'=>'请求参数phone不能为空!');
    }


    // inert to log table
    if($errormsg != "")
    {
        if ($stmt3 = $mysqli->prepare("INSERT INTO syslog (type, message) VALUES(?, ?)")) {
            /* bind parameters for markers */
            $type = 0;
            $message = 'updatestock.php更新库存数据失败! code:'.$errormsg['code'].", message: ".$errormsg[
            'message']."parameters(phone:".$phone.").";
            $stmt3->bind_param("ss", $type, $message);

            /* execute query */
            $stmt3->execute();

            $stmt3->close();
        }

        echo json_encode($errormsg);
    }

    $mysqli->close();
?>