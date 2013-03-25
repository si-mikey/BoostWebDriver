<?php

class BoostExceptions extends Exception
{

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



    // Redefine the exception so message isn't optional
    public function __construct($message, $code) {
    
        // make sure everything is assigned properly
        parent::__construct($message, $code);
    }


    // custom string representation of object
    public function __toString() {
        return __CLASS__ . ": [{$this->code}]: {$this->message}\n";
    }

		

	switch ($exception) {

            case self::NOSUCHDRIVER:
                throw new MyException('A session is either terminated or not started', 6);
                break;

            case self::NOSUCHELEMENT:
                throw new MyException('An element could not be located on the page using the given search parameters.', 7);
				break;

			case self::NOSUCHFRAME:
				throw new MyException('A request to switch to a frame could not be satisfied because the frame could not be found.', 8);
				break;
			
			case self::UNKNOWNCOMMAND:
				throw new MyException('The requested resource could not be found, or a request was received using an HTTP method that is not supported by the mapped resource.', 9);
				break;

			case self::STALEELEMENTREFERENCE:
				throw new MyException('An element command failed because the referenced element is no longer attached to the DOM.', 10);
				break;

			case self::ELEMENTNOTVISIBLE:
				throw new MyException('An element command could not be completed because the element is not visible on the page.', 11);
				break;

			case self::INVALIDELEMENTSTATE:
				throw new MyException('An element command could not be completed because the element is in an invalid state (e.g. attempting to click a disabled element).', 12);
				break;

			case self::UNKNOWNERROR:
				throw new MyException('An unknown server-side error occurred while processing the command.', 13);
				break;

			case self::ELEMENTISNOTSELECTABLE:
				throw new MyException('An attempt was made to select an element that cannot be selected.', 15);
				break;

			case self::JAVASCRIPTERROR:
				throw new MyException('An error occurred while executing user supplied JavaScript.', 17);
				break;

			case self::XPATHLOOKUPERROR:
				throw new MyException('An error occurred while executing user supplied JavaScript.', 19);
				break;

			case self::XPATHLOOKUPERROR:
				throw new MyException('An error occurred while searching for an element by XPath.', 19);
				break;

			case self::TIMEOUT:
				throw new MyException('An operation did not complete before its timeout expired.', 21);
				break;

			case self::NOSUCHWINDOW:
				throw new MyException('A request to switch to a different window could not be satisfied because the window could not be found.', 23);
				break;

			case self::INVALIDCOOKIEDOMAIN:
				throw new MyException('An illegal attempt was made to set a cookie under a different domain than the current page.', 24);
				break;

			case self::UNABLETOSETCOOKIE:
				throw new MyException('A request to set a cookies value could not be satisfied.', 25);
				break;

			case self::UNEXPECTEDALERTOPEN:
				throw new MyException('A modal dialog was open, blocking this operation.', 26);
				break;

			case self::NOALERTOPENERROR:
				throw new MyException('An attempt was made to operate on a modal dialog when one was not open.', 27);
				break;

			case self::SCRIPTTIMEOUT:
				throw new MyException('A script did not complete before its timeout expired.', 28);
				break;

			case self::INVALIDELEMENTCOORDINATES:
				throw new MyException('The coordinates provided to an interactions operation are invalid.', 29);
				break;

			case self::IMENOTAVAILABLE:
				throw new MyException('IME was not available.', 30);
				break;

			case self::IMEENGINEACTIVATIONFAILED:
				throw new MyException('An IME engine could not be started.', 31);
				break;

			case self::INVALIDSELECTOR:
				throw new MyException('Argument was an invalid selector (e.g. XPath/CSS).', 32);
				break;

			case self::SESSIONNOTCREATEDEXCEPTION:
				throw new MyException('A new session could not be created.', 33);
				break;

			case self::MOVETARGETOUTOFBOUNDS:
				throw new MyException('Target provided for a move action is out of bounds.', 34);
				break;

            default: 
                throw new Exception("An unknown error occured");
			break;
        }

}


