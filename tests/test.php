<?php

require("../lib/BoostBase.php");

$session = new Boost("http://127.0.0.1:4444/wd/hub", "opera"); //arguments are optional for constructor. 

$session->set_url("http://www.google.com"); //must contains HTTP protocol. 

//adding wait statement in following release
sleep(2);

$session->kill(); 





?>
