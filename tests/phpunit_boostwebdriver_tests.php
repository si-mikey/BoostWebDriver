<?php

require("../lib/BoostBase.php");



class Login_Suite_Testcases extends PHPUnit_Framework_TestCase
{
	public $boost;
	

	protected function setUp(){
		
		$this->boost = new boost();

	}

	public function testShouldPassIfWDSetsAnID() {
		
		
		$this->expectOutputString("color");
		echo $this->boost->session_id;
		
	}
 
 
/*	public function testShouldPassIfItemIsClick() {
		
		$this->assertNotSame("cool","cool");
		
	}
 */
	
	
	
}
