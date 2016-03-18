<?php
    // ini_set('display_errors', true);
    // error_reporting(E_ALL);
    error_reporting(0);
    date_default_timezone_set("Asia/Shanghai");

    $mysqli = new mysqli("localhost", "molirun", "molirun", "molirun");

    /* check connection */
    if (mysqli_connect_errno()) {
        echo json_encode(array('code'=>9001,'message'=>'数据库连接失败！'));
        exit();
    }

    /* change character set to utf8 */
    if (!$mysqli->set_charset("utf8")) {
        echo json_encode(array('code'=>9002,'message'=>'数据库设置utf-8编码发生错误！'));
    }

?>