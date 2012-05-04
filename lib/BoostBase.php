<?php
class Boost{

protected $session_id;
protected $webdriver_url;

public function __construct($webdriver_url = null, $capability = null){

	if($webdriver_url === null) {$webdriver_url = "http://127.0.0.1:4444/wd/hub";}	
	$this->webdriver_url = trim($webdriver_url);

    if( $capability === null ) {$capability = "firefox";}

	//Validate browser or capability
	if( $capability === "firefox" || $capability === "chrome"  || $capability === "opera" || $capability === "safari" ) { $capabilities["browserName"] = $capability;
	}else{ throw new Exception("Provided  browser is not supported");	}
	
	$json = array("desiredCapabilities" => $capabilities);	
	
	 $output = Boost::curl("POST", $this->webdriver_url . '/session', json_encode($json), TRUE, TRUE);

 	preg_match("/session\/(.*)\n/", $output, $sess);

		if( isset($sess[1]) ){

		$this->session_id = trim($sess[1]);
		}else{

		throw new Exception("Did not receive a session id, wrong server URL or port");
		}  
 
}

public static function curl($http, $curl_url, $data = null, $encode_data = TRUE, $show_header = FALSE){

	$ch = curl_init($curl_url);
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "$http");
	curl_setopt($ch, CURLOPT_HTTPHEADER,array("Expect:"));	
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);   
	curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json;charset=UTF-8', 'Accept: application/json'));	
	if( $http === "POST" && $encode_data === TRUE && $data !== NULL ) curl_setopt( $ch, CURLOPT_POSTFIELDS, "$data" );
	if( $show_header === TRUE  ) curl_setopt( $ch, CURLOPT_HEADER, TRUE );
	
	return $result = curl_exec($ch); 
}

public function __destruct(){
	
	Boost::curl("DELETE", $this->webdriver_url . '/session/' . $this->session_id);
	//unset($this); 
}


public static function jsonParse($json, $key = null){

	$value = json_decode(trim($json), true);
	//TODO: ADD RESPONSE STATUS CODES

	//print_r($value);
	

	if( $value['status'] != 0 && $value['status'] ){
		
		preg_match("/(.*)\n/", $value['value']['message'], $error);		

		if( $error ){
			echo $error[0];
			exit;
		}else{
			echo "Unknown Error.";
			exit;
		}
	}
		if($key !== null){
			
			return $value["value"]["$key"];		
		}else{
			
			return $value['value'];
		} 

	
}		


//http://code.google.com/p/selenium/wiki/JsonWireProtocol#DELETE_/session/:sessionId
public function kill(){
	
	return Boost::curl("DELETE", $this->webdriver_url . '/session/' . $this->session_id);
}
	
//http://code.google.com/p/selenium/wiki/JsonWireProtocol#POST_/session/:sessionId/url
public function set_url($url){

	$full_url = $this->webdriver_url . '/session/' . $this->session_id ."/url";		
	$urlarr = array("url" => $url);
	return Boost::curl( "POST", $full_url, json_encode($urlarr) );
}
	
//http://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/session/:sessionId/url
public function get_url(){
	
	$full_url = $this->webdriver_url . '/session/' . $this->session_id ."/url";
	$response = Boost::curl( "GET", $full_url, NULL, FALSE, FALSE);
	return Boost::jsonParse($response);	
}

//http://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/status
public function get_status(){
	
	$full_url = $this->webdriver_url . '/status';
	$response = Boost:: curl("GET", $full_url, NULL ,FALSE, FALSE);
	return Boost::jsonParse($response);	
}

//http://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/sessions
public function get_sessions(){
	
	$full_url = $this->webdriver_url . '/sessions';
	$response = Boost:: curl("GET", $full_url, NULL, FALSE, FALSE);
	return Boost::jsonParse($response);	
}

//http://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/session/:sessionId
public function get_session(){
	
	$full_url = $this->webdriver_url . '/session/' . $this->session_id;
	$response = Boost:: curl("GET", $full_url, NULL, FALSE, FALSE);
	return Boost::jsonParse($response);	
}


//http://code.google.com/p/selenium/wiki/JsonWireProtocol#POST_/session/:sessionId/timeouts
public function set_timeouts($type, $ms){
	
	$full_url = $this->webdriver_url . '/session/' . $this->session_id . '/timeouts';
	//possible types are "script",  "implicit", "page load"
	$data = array("type"=>"$type", "ms"=>$ms);
	$data = json_encode($data);	
	$response = Boost:: curl("POST", $full_url, $data, TRUE, FALSE);
	return Boost::jsonParse($response);	
}


//http://code.google.com/p/selenium/wiki/JsonWireProtocol#POST_/session/:sessionId/timeouts/async_script
public function set_async_timeout( $ms ){
	
	$full_url = $this->webdriver_url . '/session/' . $this->session_id . '/async_script';
	$data = array( "ms"=>$ms );
	$data = json_encode($data);	
	$response = Boost:: curl("POST", $full_url, $data, TRUE, FALSE);
	return Boost::jsonParse($response);	
}


//http://code.google.com/p/selenium/wiki/JsonWireProtocol#POST_/session/:sessionId/timeouts/implicit_wait
public function set_implicit_wait( $ms ){
	
	$full_url = $this->webdriver_url . '/session/' . $this->session_id . '/implicit_wait';
	$data = array( "ms"=>$ms );
	$data = json_encode($data);	
	$response = Boost:: curl("POST", $full_url, $data, TRUE, FALSE);
	return Boost::jsonParse($response);	
}


//http://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/session/:sessionId/window_handle
public function get_window_handle(){
	
	$full_url = $this->webdriver_url . '/session/' . $this->session_id . '/window_handle';
	$response = Boost:: curl("GET", $full_url, NULL, FALSE, FALSE);
	return Boost::jsonParse($response);	
}

//http://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/session/:sessionId/window_handles
public function get_window_handles(){
	
	$full_url = $this->webdriver_url . '/session/' . $this->session_id . '/window_handles';
	$response = Boost:: curl("GET", $full_url, NULL, FALSE, FALSE);
	return Boost::jsonParse($response);	
}

//http://code.google.com/p/selenium/wiki/JsonWireProtocol#POST_/session/:sessionId/forward
public function forward(){
	
	$full_url = $this->webdriver_url . '/session/' . $this->session_id . '/forward';
	$response = Boost:: curl("POST", $full_url, NULL, FALSE, FALSE);
	return Boost::jsonParse($response);	
}


//http://code.google.com/p/selenium/wiki/JsonWireProtocol#POST_/session/:sessionId/back
public function back(){
	
	$full_url = $this->webdriver_url . '/session/' . $this->session_id . '/back';
	$response = Boost:: curl("POST", $full_url, NULL, FALSE, FALSE);
	return Boost::jsonParse($response);	
}


//http://code.google.com/p/selenium/wiki/JsonWireProtocol#POST_/session/:sessionId/refresh
public function refresh(){
	
	$full_url = $this->webdriver_url . '/session/' . $this->session_id . '/refresh';
	$response = Boost:: curl("POST", $full_url, NULL, FALSE, FALSE);
	return Boost::jsonParse($response);	
}


//http://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/session/:sessionId/screenshot
public function screenshot(){
	
	$full_url = $this->webdriver_url . '/session/' . $this->session_id . '/screenshot';
	$response = Boost:: curl("GET", $full_url, NULL, FALSE, FALSE);
	return Boost::jsonParse($response);	
}

//NEEDS ERROR CODE OR USE MESSAGE IN RESPONSE JSON
//http://code.google.com/p/selenium/wiki/JsonWireProtocol#POST_/session/:sessionId/frame
public function set_frame_focus($frame_name){
	
	$full_url = $this->webdriver_url . '/session/' . $this->session_id . '/frame';
	//possible values are {string|number|null|WebElement JSON Object}
	$data = array( "id"=>$frame_name );
	$data = json_encode($data);	
	$response = Boost:: curl("POST", $full_url, $data, TRUE, FALSE);
	return Boost::jsonParse($response);		
}

//NEEDS ERROR CODE OR USE MESSAGE IN RESPONSE JSON
//http://code.google.com/p/selenium/wiki/JsonWireProtocol#POST_/session/:sessionId/window
public function set_window_focus($window_name){
	
	$full_url = $this->webdriver_url . '/session/' . $this->session_id . '/window';
	$data = array( "name"=>$window_name );
	$data = json_encode($data);	
	$response = Boost:: curl("POST", $full_url, $data, TRUE, FALSE);
	return Boost::jsonParse($response);		
}

//http://code.google.com/p/selenium/wiki/JsonWireProtocol#DELETE_/session/:sessionId/window
public function window_close(){
	
	$full_url = $this->webdriver_url . '/session/' . $this->session_id . '/window';
	return $response = Boost:: curl("DELETE", $full_url, NULL, FALSE, FALSE);
	return Boost::jsonParse($response);	
}

//http://code.google.com/p/selenium/wiki/JsonWireProtocol#POST_/session/:sessionId/window/:windowHandle/size
public function set_window_size($width, $height, $win_handle="current"){	

	$width = (integer)$width;
	$height = (integer)$height;
	$full_url = $this->webdriver_url . '/session/' . $this->session_id . '/window/' . $win_handle . '/size';
	$data = array( "width"=>$width, "height"=>$height );
	$data = json_encode($data);	
	$response = Boost:: curl("POST", $full_url, $data, TRUE, FALSE);
	return Boost::jsonParse($response);	
}

//http://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/session/:sessionId/window/:windowHandle/size
public function get_window_size( $win_handle="current" ){
	
	$full_url = $this->webdriver_url . '/session/' . $this->session_id . '/window/' . $win_handle . '/size';
	$response = Boost:: curl("GET", $full_url, NULL, FALSE, FALSE);
	return Boost::jsonParse($response);
}

//http://code.google.com/p/selenium/wiki/JsonWireProtocol#POST_/session/:sessionId/window/:windowHandle/position
public function set_window_position($x, $y, $win_handle="current"){
	
	$x = (integer)$x;
	$y = (integer)$y;
	$full_url = $this->webdriver_url . '/session/' . $this->session_id . '/window/' . $win_handle . '/position';
	$data = array( "x"=>$x, "y"=>$y );
	$data = json_encode($data);	
	$response = Boost:: curl("POST", $full_url, $data, TRUE, FALSE);
	return Boost::jsonParse($response);

}

//http://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/session/:sessionId/window/:windowHandle/position
public function get_window_position( $win_handle="current" ){
	
	$full_url = $this->webdriver_url . '/session/' . $this->session_id . '/window/' . $win_handle . '/position';
	$response = Boost:: curl("GET", $full_url, NULL, FALSE, FALSE);
	return Boost::jsonParse($response);
}

//http://code.google.com/p/selenium/wiki/JsonWireProtocol#POST_/session/:sessionId/window/:windowHandle/maximize
public function window_maximize( $win_handle="current" ){
	
	$full_url = $this->webdriver_url . '/session/' . $this->session_id . '/window/' . $win_handle . '/maximize';
	$response = Boost:: curl("POST", $full_url, NULL, FALSE, FALSE);
	return Boost::jsonParse($response);
}

//http://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/session/:sessionId/source
public function get_source_code(){
	
	$full_url = $this->webdriver_url . '/session/' . $this->session_id . '/source';
	$response = Boost:: curl("GET", $full_url, NULL, FALSE, FALSE);
	return Boost::jsonParse($response);
}

//http://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/session/:sessionId/title
public function get_title(){
	
	$full_url = $this->webdriver_url . '/session/' . $this->session_id . '/title';
	$response = Boost:: curl("GET", $full_url, NULL, FALSE, FALSE);
	return Boost::jsonParse($response);
}

//http://code.google.com/p/selenium/wiki/JsonWireProtocol#POST_/session/:sessionId/element/active
public function get_active_element(){
	
	$full_url = $this->webdriver_url . '/session/' . $this->session_id . '/element/active';	
	$response = Boost:: curl("POST", $full_url, NULL, FALSE, FALSE);
	return Boost::jsonParse($response, "ELEMENT");
}


//http://code.google.com/p/selenium/wiki/JsonWireProtocol#POST_/session/:sessionId/element/active
public function get_element_info($element){
	
	$full_url = $this->webdriver_url . '/session/' . $this->session_id . '/element/' . $element;	
	$response = Boost:: curl("GET", $full_url, NULL, FALSE, FALSE);
	return Boost::jsonParse($response);
}


////////////////////////////////////////////////////////////////////////////
//SKIPPED TO ELEMENT METHOD
//http://code.google.com/p/selenium/wiki/JsonWireProtocol#POST_/session/:sessionId/element
public function get_element( $using, $value ){
	
	$full_url = $this->webdriver_url . '/session/' . $this->session_id . '/element';
	//possible vals for using = 'class name' | css selector | id | name | link text | partial link text | tag name | xpath
	$data = array( "using"=>$using, "value"=>$value );
	$data = json_encode($data);
	$response = Boost:: curl("POST", $full_url, $data, TRUE, FALSE);
	return Boost::jsonParse($response, "ELEMENT");	
}

//http://code.google.com/p/selenium/wiki/JsonWireProtocol#POST_/session/:sessionId/elements
public function get_elements( $using, $value ){
	
	$full_url = $this->webdriver_url . '/session/' . $this->session_id . '/elements';
	//possible vals for using = 'class name' | css selector | id | name | link text | partial link text | tag name | xpath
	$data = array( "using"=>$using, "value"=>$value );
	$data = json_encode($data);	
	$response = Boost:: curl("POST", $full_url, $data, TRUE, FALSE);
	return Boost::jsonParse($response);	
}


//http://code.google.com/p/selenium/wiki/JsonWireProtocol#POST_/session/:sessionId/element/:id/element
public function get_element_child( $element, $using, $value ){
	
	$full_url = $this->webdriver_url . '/session/' . $this->session_id . '/element/' . $element . '/element';
	//possible vals for using = 'class name' | css selector | id | name | link text | partial link text | tag name | xpath
	$data = array( "using"=>$using, "value"=>$value );
	$data = json_encode($data);
	$response = Boost:: curl("POST", $full_url, $data, TRUE, FALSE);
	return Boost::jsonParse($response, "ELEMENT");	
}


//http://code.google.com/p/selenium/wiki/JsonWireProtocol#POST_/session/:sessionId/element/:id/elements
public function get_element_children( $element, $using, $value ){
	
	$full_url = $this->webdriver_url . '/session/' . $this->session_id . '/element/' . $element . '/element';
	//possible vals for using = 'class name' | css selector | id | name | link text | partial link text | tag name | xpath
	$data = array( "using"=>$using, "value"=>$value );
	$data = json_encode($data);
	$response = Boost:: curl("POST", $full_url, $data, TRUE, FALSE);
	return Boost::jsonParse($response);	
}


//http://code.google.com/p/selenium/wiki/JsonWireProtocol#POST_/session/:sessionId/element/:id/click
public function click( ){

    if( func_num_args() == 2 ){
        
        $using = func_get_arg(0);
        $value = func_get_arg(1);
        $element = $this->get_element($using, $value);

    }else if( func_num_args() == 1){
        
        $element = func_get_arg(0);
    }        

	$full_url = $this->webdriver_url . '/session/' . $this->session_id . '/element/' . $element . '/click';
	$response = Boost:: curl("POST", $full_url, NULL, FALSE, FALSE);
	return Boost::jsonParse($response);	
}


//http://code.google.com/p/selenium/wiki/JsonWireProtocol#POST_/session/:sessionId/element/:id/submit
public function submit($element){
	
	$full_url = $this->webdriver_url . '/session/' . $this->session_id . '/element/' . $element . '/submit';
	$response = Boost:: curl("POST", $full_url, NULL, FALSE, FALSE);
	return Boost::jsonParse($response);
}

//http://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/session/:sessionId/element/:id/text
public function get_text( ){
    
     if( func_num_args() == 2 ){
        
        $using = func_get_arg(0);
        $value = func_get_arg(1);
        $element = $this->get_element($using, $value);

    }else if( func_num_args() == 1){
        
        $element = func_get_arg(0);
    }        

	$full_url = $this->webdriver_url . '/session/' . $this->session_id . '/element/' . $element . '/text';
	$response = Boost:: curl("GET", $full_url, NULL, FALSE, FALSE);
	return Boost::jsonParse($response);	
}

///////////////////////////////////////////////////SEND KEYS//////////////////////////////////////////////

public function type($text){
	
	$full_url = $this->webdriver_url . '/session/' . $this->session_id . '/keys';
	$data = array("value" => array($text));
	$data = json_encode($data);	
	$response = Boost:: curl("POST", $full_url, $data, TRUE, FALSE);
	return Boost::jsonParse($response);
}


public function send_key($using, $value, $key){

    $key = ucfirst(trim($key));
    $keys = array(
    'Null' => "\uE000",
    'Cancel' => "\uE001",
    'Help' => "\uE002",
    'Backspace' => "\uE003",
    'Tab' => "\uE004",
    'Clear' => "\uE005",
    'Return' => "\uE006",
    'Enter' => "\uE007",
    'Shift' => "\uE008",
    'Control' => "\uE009",
    'Alt' => "\uE00A",
    'Pause' => "\uE00B",
    'Escape' => "\uE00C",
    'Space' => "U+E00D",
    'PageUp' => "\uE00E",
    'PageDown' => "\uE00F",
    'End' => "\uE010",
    'Home' => "\uE011",
    'LeftArrow' => "\uE012",
    'UpArrow' => "\uE013",
    'RightArrow' => "\uE014",
    'DownArrow' => "\uE015",
    'Insert' => "\uE016",
    'Delete' => "\uE017",
    'Semicolon' => "\uE018",
    'Equals' => "\uE019",
    'Numpad0' => "\uE01A",
    'Numpad1' => "\uE01B",
    'Numpad2' => "\uE01C",
    'Numpad3' => "\uE01D",
    'Numpad4' => "\uE01E",
    'Numpad5' => "\uE01F",
    'Numpad6' => "\uE020",
    'Numpad7' => "\uE021",
    'Numpad8' => "\uE022",
    'Numpad9' => "\uE023",
    'Multiply' => "\uE024",
    'Add' => "\uE025",
    'Separator' => "\uE026",
    'Subtract' => "\uE027",
    'Decimal' => "\uE028",
    'Divide' => "\uE029",
    'F1' => "\uE031",
    'F2' => "\uE032",
    'F3' => "\uE033",
    'F4' => "\uE034",
    'F5' => "\uE035",
    'F6' => "\uE036",
    'F7' => "\uE037",
    'F8' => "\uE038",
    'F9' => "\uE039",
    'F10' => "\uE03A",
    'F11' => "\uE03B",
    'F12' => "\uE03C",
    'Command' => "\uE03D",
    'Meta' => "\uE03D",
  );


    $element = $this->get_element($using, $value);
	$full_url = $this->webdriver_url . '/session/' . $this->session_id . '/element/' . $element . '/value';
	$data = array( "value" => array($keys[$key]) );
	$data = json_encode($data);	
	$response = Boost:: curl("POST", $full_url, $data, TRUE, FALSE);
	return Boost::jsonParse($response);

}




















}

?>
