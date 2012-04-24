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

//$array = $session->set_frame_focus();

//$session->set_window_focus("test");

//$session->window_close();

// can take optional parameter like window_resize(300,500, $WINDOW_HANDLE) otherwise it uses active window
//$session->set_window_size("300", "500");

//$array = $session->get_window_size();

//$array = $session->get_elements("tag name", "a");

//$element = $session->get_element("id","index_keyword_input" );

//$session->click($element);

//Can take an optional $WINDOW_HANDLE parameter otherwise it uses "current"
//$session->set_window_position(300, 400);

//$array = $session->get_window_position();

//$session->window_maximize();

//$session->get_source_code();

//$session->get_title();

//$session->get_active_element();

//$array = $session->get_element_info($element);


sleep(3);



















?>
