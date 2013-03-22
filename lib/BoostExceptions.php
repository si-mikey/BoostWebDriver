<?php

class MyException extends Exception
{
    // Redefine the exception so message isn't optional
    public function __construct($message, $code) {
        
    
        // make sure everything is assigned properly
        parent::__construct($message, $code);
    }

    // custom string representation of object
    public function __toString() {
        return __CLASS__ . ": [{$this->code}]: {$this->message}\n";
    }

    public function customFunction() {
        echo "A custom function for this type of exception\n";
    }
}


/**
 * Create a class to test the exception
 */
class TestException{
   

    //const SUCCESS    = 0;
    const NOSUCHDRIVER  = 6;
    const NOSUCHELEMENT = 7;
    const NOSUCHFRAME = 8;
    const UNKNOWNCOMMAND = 9;
    const STALEELEMENTREFERENCE = 10;
    const ELEMENTNOTVISIBLE = 11;
    const INVALIDELEMENTSTATE = 12;
    const UNKNOWNERROR = 13;
    const ELEMENTISNOTSELECTABLE = 15;
    const JAVASCRIPTERROR = 17;
    const XPATHLOOKUPERROR = 19;
    const TIMEOUT = 21;
    const NOSUCHWINDOW = 23;
    const INVALIDCOOKIEDOMAIN = 24;
    const UNABLETOSETCOOKIE = 25;
    const UNEXPECTEDALERTOPEN = 26;
    const NOALERTOPENERROR = 27;
    const SCRIPTTIMEOUT = 28;
    const INVALIDELEMENTCOORDINATES = 29;
    const IMENOTAVAILABLE = 30;
    const IMEENGINEACTIVATIONFAILED = 31;
    const INVALIDSELECTOR = 32;
    const SESSIONNOTCREATEDEXCEPTION = 33;
    const MOVETARGETOUTOFBOUNDS = 34;



    function __construct($avalue = self::NOSUCHDRIVER) {

        switch ($avalue) {
            case self::NOSUCHDRIVER:
                // throw custom exception
                throw new MyException('A session is either terminated or not started', 6);
                break;

            case self::NOSUCHELEMENT:
                // throw default one.
                throw new Exception('2 is not allowed as a parameter', 6);
                break;

            default: 
                // No exception, object will be created.
		break;
        }
    }
}

try{

$test = new TestException();

}catch(Exception $e){

	echo $e->getMessage() . "\n";
	echo $e->getCode() . "\n";
	echo $e->getFile() . "\n";
	echo $e->getLine() . "\n";
	print_r( $e->getTrace() );
}
































































