Feature: Shutterstock my account user name
 
  Scenario: Verifying that user name is shown on my account page
	Given I am logged in to shutterstock
     When I click on "My account"
     Then my "username" is displayed 
 
