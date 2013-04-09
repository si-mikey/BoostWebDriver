<?php
require_once(dirname(dirname(__FILE__)) . DIRECTORY_SEPARATOR . 'lib' . DIRECTORY_SEPARATOR . 'BoostBase.php' );

//arguments are optional for constructor. 
$session = new Boost(); 

$session->start("firefox");

//must contains HTTP protocol. 
$session->set_url("http://www.shutterstock.com/"); 

//$session->set_frame_focus("");

$session->window_maximize();

//$session->get_url();

//adding wait statement in following release
//sleep(2);

//$session->get_url();

$session->click('xpath', '//a[@href="/login.mhtml"]');

$session->type("markspicpage");

$session->click("name", "password");

//$session->type("testing");



sleep(5);

$session->kill(); 

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


//$css_val = $session->js_execute('return document.defaultView.getComputedStyle(document.getElementsByTagName("body")[0], "").getPropertyValue("font-family")', "");

//var_dump( $css_val );


//sleep(5);

//$session->screenshot();

//$array = $session->set_frame_focus();

//$session->set_window_focus("test");

//$session->window_close();

// can take optional parameter like window_resize(300,500, $WINDOW_HANDLE) otherwise it uses active window
//$session->set_window_size("300", "500");

//$array = $session->get_window_size();

//$array = $session->get_elements("tag name", "a");

//$element = $session->get_element("link text", "SIGN IN" );

//$session->click( "link text", "SIGN IN" );


//echo $session->get_text("id", "logo_container");


//sleep(2);

//$session->type("");


//$session->click("name", "pass");

//$session->type("testing");

//$session->click("name", "submit");

//sleep(2);


//$session->click("id", "keyword_input");

//$session->type("cool cars");

//$session->click("id", "main_search_button");


//sleep(2);


//$session->click("partial link text", "Hi,");

//sleep(1);

//$session->click("id", "user_account");

//sleep(2);

//$session->click($element);

//sleep(3);

//Can take an optional $WINDOW_HANDLE parameter otherwise it uses "current"

//$session->set_window_position(300, 400);

//$array = $session->get_window_position();

//$session->window_maximize();

//$session->get_source_code();

//$session->get_title();

//$session->get_active_element();

//$array = $session->get_element_info($element);

//$session->get_element_child( $element, "id", "user" );

//print_r($session->get_element_children( $element, "tag name", "input" ));

//$session->submit($element);

//$session->get_text($element);
//$session->get_text("id", "logo_container");

//$session->type("testing....");

// TODO: special keys support
//$session->send_key("name", "user", "numpad3");

//$element = $session->get_element("name", "user");

//$session->get_tag($element);

//$session->clear($element);

//$session->is_selected($element);

//$session->is_enabled($element);

//$session->get_attribute($element, "type");

//$element2 = $session->get_element("id", "logo_container");

//echo $session->is_equal($element, $element2);


//sleep(3);

//echo $session->is_displayed($element2);

//$array = $session->get_location($element2);


//$array = $session->get_location_in_view($element2);

//$array = $session->get_size($element2);

//$session->get_css($element2, "z-index");

//$css = $session->get_css("id", "headings", "font-family");

//echo $css;

//sleep(5);
//$session->get_orientation();

//sleep(3);
//$session->get_alert_text();

//$session->set_alert_text("LOL tpying...");

//echo $session->accept_alert();

//sleep(3);

