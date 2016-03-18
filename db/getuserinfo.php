<?php

    session_start();

    include_once 'connect.php';

    // for debug use $_GET["param"]
    // http://localhost/molirunh5160303/db/getuserinfo.php?cardnumber=420682199104180011

    // get GET parameters
    $cardnumber  = $_GET['cardnumber'];

    // wechat user info from session
    //$openid = $_SESSION["openid"];

    if ($stmt = $mysqli->prepare("SELECT grouptype, name, sex, cardnumber, phone, packagetype, teesize, openid FROM user WHERE cardnumber=? and paystatus=1 limit 1")) {

        // Bind the variables to the parameter as strings.
        $stmt->bind_param("s", $cardnumber);

        /* execute query */
        $stmt->execute();

        /* bind result variables */
        $stmt->bind_result($grouptype, $name, $sex, $cardnumber, $phone, $packagetype, $teesize, $openid);

        /* fetch value */
        $stmt->fetch();

        /* close statement */
        $stmt->close();

        // response json data
        if(isset($phone))
        {
            $data = array();
            $data["openid"]      = $openid;
            $data["grouptype"]   = $grouptype;
            $data["name"]        = $name;
            $data["sex"]         = $sex;
            $data["cardnumber"]  = $cardnumber;
            $data["phone"]       = $phone;
            $data["packagetype"] = $packagetype;
            $data["teesize"]     = $teesize;
            $json_data           = '['.json_encode($data).']';
            echo $json_data;
        }else
            echo json_encode('[]');
    }else
        echo json_encode('[]');
?>