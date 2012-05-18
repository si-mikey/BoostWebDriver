<?php

use Behat\Behat\Context\ClosuredContextInterface,
    Behat\Behat\Context\TranslatedContextInterface,
    Behat\Behat\Context\BehatContext,
    Behat\Behat\Exception\PendingException;
use Behat\Gherkin\Node\PyStringNode,
    Behat\Gherkin\Node\TableNode;

require ("C:\\BoostWebDriver\\lib\\BoostBase.php");

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
        $this->useContext('boostContext', new Boost());

    }

	
	
  /**
   * @Given /^I am logged in to shutterstock$/
   */
  public function iAmLoggedInToShutterstock()
  {
      //$session = new Boost();
      //
    	$this->getMainContext()->getSubcontext('boostContext')->set_url("http://www.shutterstock.com");
  }

  /**
   * @When /^I click on "([^"]*)"$/
   */
  public function iClickOn($link)
  {
     
    $session->click("partial link text", "Hi,");
    sleep(2);

    $link = $session->click("id", "user_account");
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
