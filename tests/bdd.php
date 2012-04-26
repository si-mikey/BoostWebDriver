<?php

require("../lib/BoostBase.php");

class Login_Suite_Testcases
    extends PHPUnit_Framework_TestCase
{
	
	
	
	public function testShouldPassIfItemWasFound () {
		
		$this->assertSame("$x", "$x");
		
	}
 
 
	public function testShouldPassIfItemIsClick() {
		
		$this->assertNotSame("cool","cool");
		
	}
 
	public function testShouldPassIfItemOnNextPageIsPresent () {
		
		
	}
	 
	
	
	
	
	
	
	
}



?>