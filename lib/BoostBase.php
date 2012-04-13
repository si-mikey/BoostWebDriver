<?php

class Boost{

		public $session_id;
		public $webdriver_url;
		public $browser;

		public function  __construct($webdriver_url=null, $capabilities=null){
			
			if($webdriver_url === null) $webdriver_url = "http://127.0.0.1:4444/wd/hub";
             $this->webdriver_url = $webdriver_url;         
			 if( $capabilities === null)  $capabilities['browserName'] = 'firefox';			 
			$json = array("desiredCapabilities" => $capabilities);
			$json = json_encode($json);		
			$output = Boost::curl('POST', $this->webdriver_url . '/session', $json);            
			preg_match("/session\/(.*)\n/", $output, $sess);			
			if( $sess[1] ){
				
				$this->session_id = $sess[1];
			}else{
				
				throw new Exception("Did not receive a session id, wrong server URL or port");
			}	
			
        }		
  
		public static function curl($fetch_type, $url, $data=null){

            $curl_handle=curl_init();
            curl_setopt($curl_handle, CURLOPT_URL,$url);
            curl_setopt($curl_handle, CURLOPT_CUSTOMREQUEST, $fetch_type);
            curl_setopt($curl_handle, CURLOPT_CONNECTTIMEOUT,60);
            curl_setopt($curl_handle, CURLOPT_TIMEOUT,60);
            curl_setopt($curl_handle, CURLOPT_HEADER, TRUE);
			curl_setopt($curl_handle, CURLOPT_HTTPHEADER, array('Expect:'));
			curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER,TRUE); 			
            curl_setopt($curl_handle, CURLOPT_HTTPHEADER, array('Content-Type: application/json;charset=UTF-8'));			
			if( $fetch_type === "POST"){
				if( json_decode($data) !== null && (is_array($data) || is_object($data))){
				
					$data = http_build_query($data);
				}
				
				curl_setopt($curl_handle, CURLOPT_POSTFIELDS, $data); 	
			}
			
			$buffer = curl_exec($curl_handle);
			curl_close($curl_handle);       			
			return $buffer;
       
        } 
		
		
		//kill the session
		public function kill(){
			
			return Boost::curl("DELETE", $this->webdriver_url . '/session/' . $this->session_id);
			
		}
}

$s = new Boost();














?>
