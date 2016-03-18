<?php

    include_once 'connect.php';

    // for debug use $_GET["param"]
    // http://localhost/molirunh5160303/db/getstock.php

    if ($stmt = $mysqli->prepare("SELECT fivekms, tenkms, xssize, ssize, msize, lsize, xlsize, xxlsize, generalpackage, seniorpackage FROM stock")) {

        /* execute query */
        $stmt->execute();


        /* bind result variables */
        $stmt->bind_result($fivekms, $tenkms, $xssize, $ssize, $msize, $lsize, $xlsize, $xxlsize, $generalpackage, $seniorpackage);

        /* fetch value */
        $stmt->fetch();

        /* close statement */
        $stmt->close();

        // response json data
        $data                   = array();
        $data["fivekms"]        = $fivekms;
        $data["tenkms"]         = $tenkms;
        $data["xssize"]         = $xssize;
        $data["ssize"]          = $ssize;
        $data["msize"]          = $msize;
        $data["lsize"]          = $lsize;
        $data["xlsize"]         = $xlsize;
        $data["xxlsize"]        = $xxlsize;
        $data["generalpackage"] = $generalpackage;
        $data["seniorpackage"]  = $seniorpackage;
        $json_data              = '['.json_encode($data).']';
        echo $json_data;
    }else
        echo json_encode('[]');
?>