<?php

require("../lib/BoostBase.php");

//arguments are optional for constructor. 
$session = new Boost("http://127.0.0.1:4444/wd/hub", "firefox"); 

//must contains HTTP protocol. 
$session->set_url("http://www.google.com"); 


//adding wait statement in following release
sleep(2);

//$session->get_url();

//$session->kill(); 

//$array = $session->get_status();

//$array = $session->get_sessions();












































?>
