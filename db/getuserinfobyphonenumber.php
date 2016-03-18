<?php

    session_start();

    include_once 'connect.php';

    // for debug use $_GET["param"]
    // http://localhost/molirunh5160303/db/getuserinfo.php?phone=13816954340

    // get GET parameters
    $phone  = $_GET['phone'];

    // wechat user info from session
    $openid = $_SESSION["openid"];

    if(isset($openid))
    {
        if ($stmt = $mysqli->prepare("SELECT grouptype, name, cardnumber, phone, packagetype, teesize FROM user WHERE openid=? or phone=? and paystatus=1")) {

            // Bind the variables to the parameter as strings.
            $stmt->bind_param("ss", $openid, $phone);

            /* execute query */
            $stmt->execute();

            /* bind result variables */
            $stmt->bind_result($grouptype, $name, $cardnumber, $phone, $packagetype, $teesize);

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
                $data["cardnumber"]  = $cardnumber;
                $data["phone"]       = $phone;
                $data["packagetype"] = $packagetype;
                $data["teesize"]     = $teesize;
                $json_data           = '['.json_encode($data).']';
                echo $json_data;
            }else
                echo json_encode('[]');
        }
    }else
    {
        echo json_encode('[]');
    }
?>