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
    public function __construct(array $parameters)
    {
        // Initialize your context here
    }

	
	
  /**
   * @Given /^I am logged in to shutterstock$/
   */
  public function iAmLoggedInToShutterstock()
  {
     
	 $session = new Boost("http://127.0.0.1:4444/wd/hub", "firefox");
	 
	 $session->set_url("http://www.shutterstock.com");
	 $session->click(null, "id", "user");
	 $session->type("llopez522");
	 $session->click(null, "id","pass");
	 $session->type("testing");
	 $session->click(null,"name", "submit");
	 
  }

  /**
   * @When /^I click on "([^"]*)"$/
   */
  public function iClickOn($link)
  {
    
	
		$x = $link;
	
	
  }

  /**
   * @Then /^my "([^"]*)" is displayed$/
   */
  public function myIsDisplayed($username)
  {
      
	  
	  $u = $username;
	  
	  
	  
  }
  
  

}
