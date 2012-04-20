<?php
class Boost{

protected $session_id;
protected $webdriver_url;

public function __construct($webdriver_url = null, $capability = null){

	if($webdriver_url === null) {$webdriver_url = "http://127.0.0.1:4444/wd/hub";}	
	$this->webdriver_url = trim($webdriver_url);

	//Validate browser or capability
	if( $capability === "firefox" || $capability === "chrome"  || $capability === "opera" || $capability === "safari" ) { $capabilities["browserName"] = $capability;
	}else{ throw new Exception("Provided  browser is not supported");	}
	if( $capability === null ) {$capabilities['browserName'] = "firefox";}
	
	$json = array("desiredCapabilities" => $capabilities);	
	
	 $output = Boost::curl("POST", $this->webdriver_url . '/session', json_encode($json), TRUE, TRUE);

 	preg_match("/session\/(.*)\n/", $output, $sess);

		if( $sess[1] ){

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
	unset($this->session_id);
	unset($this->webdriver_url);
	unset($this); 
	echo "destructing....";
} 

	

public static function jsonParse($json){	
	$value = json_decode(trim($json), true);
	//TODO: ADD RESPONSE STATUS CODES
	
	return $value['value'];
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
	$response = Boost:: curl("GET", $full_url, FALSE, FALSE);
	return Boost::jsonParse($response);	
}

//http://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/sessions
public function get_sessions(){
	
	$full_url = $this->webdriver_url . '/sessions';
	$response = Boost:: curl("GET", $full_url, FALSE, FALSE);
	return Boost::jsonParse($response);	
}































}

?>