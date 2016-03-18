<?php

    session_start();

    header('Content-type: text/html; charset=utf-8');

    include_once 'connect.php';

    // for debug use $_GET["param"]
    // http://localhost/molirunh5160303/db/getstatistical.php

    if ($stmt = $mysqli->prepare("SELECT count(*) FROM user WHERE paystatus=1")) {

        /* execute query */
        $stmt->execute();

        /* bind result variables */
        $stmt->bind_result($totalpplofpaid);

        /* fetch value */
        $stmt->fetch();

        // Display the data.
        printf("==报名信息:<br>总报名人数: %s人", $totalpplofpaid-86);

        /* close statement */
        $stmt->close();
    }


    if ($stmt = $mysqli->prepare("SELECT count(*) FROM user WHERE grouptype=5 and paystatus=1")) {

        /* execute query */
        $stmt->execute();

        /* bind result variables */
        $stmt->bind_result($totalpplofgrouptypefive);

        /* fetch value */
        $stmt->fetch();

        // Display the data.
        printf("<br> 5公里参赛人数(已支付): %s人\n", $totalpplofgrouptypefive-76);

        /* close statement */
        $stmt->close();
    }

    if ($stmt = $mysqli->prepare("SELECT count(*) FROM user WHERE grouptype=10 and paystatus=1")) {

        /* execute query */
        $stmt->execute();

        /* bind result variables */
        $stmt->bind_result($totalpplofgrouptypeten);

        /* fetch value */
        $stmt->fetch();

        // Display the data.
        printf("<br>10公里参赛人数(已支付): %s人\n", $totalpplofgrouptypeten-10);

        /* close statement */
        $stmt->close();
    }



    if ($stmt = $mysqli->prepare("SELECT count(*) FROM user WHERE packagetype=0 and paystatus=1")) {

        /* execute query */
        $stmt->execute();

        /* bind result variables */
        $stmt->bind_result($totalpplofpackagetypegeneral);

        /* fetch value */
        $stmt->fetch();

        // Display the data.
        printf("<br> 一般赛事包人数(已支付): %s人\n", $totalpplofpackagetypegeneral-78);

        /* close statement */
        $stmt->close();
    }

    if ($stmt = $mysqli->prepare("SELECT count(*) FROM user WHERE packagetype=1 and paystatus=1")) {

        /* execute query */
        $stmt->execute();

        /* bind result variables */
        $stmt->bind_result($totalpplofpackagetypesenior);

        /* fetch value */
        $stmt->fetch();

        // Display the data.
        printf("<br> 高级赛事包人数(已支付): %s人\n", $totalpplofpackagetypesenior-8);

        /* close statement */
        $stmt->close();
    }

    if ($stmt = $mysqli->prepare("SELECT count(*) FROM user WHERE sex=0 and paystatus=1")) {

        /* execute query */
        $stmt->execute();

        /* bind result variables */
        $stmt->bind_result($totalpplofsexm);

        /* fetch value */
        $stmt->fetch();

        // Display the data.
        printf("<br> 男性: %s人\n", $totalpplofsexm);

        /* close statement */
        $stmt->close();
    }

    if ($stmt = $mysqli->prepare("SELECT count(*) FROM user WHERE sex=1 and paystatus=1")) {

        /* execute query */
        $stmt->execute();

        /* bind result variables */
        $stmt->bind_result($totalpplofsexw);

        /* fetch value */
        $stmt->fetch();

        // Display the data.
        printf("<br> 女性: %s人\n", $totalpplofsexw-86);

        /* close statement */
        $stmt->close();
    }

    if ($stmt = $mysqli->prepare("SELECT fivekms, tenkms, xssize, ssize, msize, lsize, xlsize, xxlsize, generalpackage, seniorpackage FROM stock")) {

        /* execute query */
        $stmt->execute();


        /* bind result variables */
        $stmt->bind_result($fivekms, $tenkms, $xssize, $ssize, $msize, $lsize, $xlsize, $xxlsize, $generalpackage, $seniorpackage);

        /* fetch value */
        $stmt->fetch();

        // Display the data.
        printf("<br><br>==库存信息: <br>5公里参赛组剩余名额: %s人 <br>10公里参赛组剩余名额: %s人 <br>T恤尺码XS剩余库存: %s件 <br>T恤尺码S剩余库存: %s件 <br>T恤尺码M剩余库存: %s件 <br>T恤尺码L剩余库存: %s件 <br>T恤尺码XL剩余库存: %s件 <br>T恤尺码XXL剩余库存: %s件", $fivekms, $tenkms, $xssize, $ssize, $msize, $lsize, $xlsize, $xxlsize);

        /* close statement */
        $stmt->close();
    }
?>
