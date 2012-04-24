<?php

require("../lib/BoostBase.php");

//arguments are optional for constructor. 
$session = new Boost("http://127.0.0.1:4444/wd/hub", "firefox"); 

//must contains HTTP protocol. 
$session->set_url("http://www.shutterstock.com"); 

//adding wait statement in following release
sleep(2);

//$session->get_url();

//$session->kill(); 

//$array = $session->get_status();

//$array = $session->get_sessions();

//$array = $session->get_session();

//$session->set_timeouts("page load", 10000);

//$session->set_async_timeout(5000);

//$handle = $session->get_window_handle();

//$array = $session->get_window_handles() ;

//$session->forward();

//$session->back();

//$session->refresh();

//$session->screenshot();

//$array = $session->frame();

//$session->window_focus("test");

//$session->window_close();

// can take optional parameter like window_resize(300,500, $WINDOW_HANDLE) otherwise it uses active window
//$session->window_resize("300", "500");

//$array = $session->window_size();

//$element = $session->get_element("id","index_keyword_submit" );
//$session->click($element);

//Can take an optional $WINDOW_HANDLE parameter otherwise it uses "current"
//echo $session->window_position(300, 400);




sleep(3);


?>
