<?php

use Behat\Behat\Context\ClosuredContextInterface,
    Behat\Behat\Context\TranslatedContextInterface,
    Behat\Behat\Context\BehatContext,
    Behat\Behat\Exception\PendingException;
use Behat\Gherkin\Node\PyStringNode,
    Behat\Gherkin\Node\TableNode;

require ("C:\BoostWebDriver\lib\BoostBase.php");

/**
 * Features context.
 */
class FeatureContext extends BehatContext
{
    /**
     * Initializes context.
     * Every scenario gets it's own context object.
     *
     * @param   array   $parameters     context parameters (set them up through behat.yml)
     */
    
    public $session;

    public function __construct(array $parameters)
    {
        // Initialize your context here
        
     $this->session = new Boost("http://127.0.0.1:4444/wd/hub", "firefox");

    }

	
	
  /**
   * @Given /^I am logged in to shutterstock$/
   */
  public function iAmLoggedInToShutterstock()
  {
     
     
	 $session->set_url("http://www.shutterstock.com");
     $session->click(null, "link text", "SIGN IN"); 
     $session->type("");
     $session->click(null, 'id', 'pass');
     $session->type("");
     $session->click(null, 'name', 'submit');
     sleep(5);
  }

  /**
   * @When /^I click on "([^"]*)"$/
   */
  public function iClickOn($link)
  {
     
    $session->click(null, "partial link text", "Hi,");
    slee(2);
    $link = $session->click(null, "id", "user_account");
    sleep(3);
  }

  /**
   * @Then /^my "([^"]*)" is displayed$/
   */
  public function myIsDisplayed($username)
  {
      
	$e = $session->get_element("class name", "ac2_username");
    $username = $session = get_text($e);
    if($username != "llopez522"){
        
        echo "Username \"$username\" is not present";

    }
	  
	  
	  
	  
  }
  
  

}
