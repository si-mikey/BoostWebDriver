Instructions:
=========
1. The below example loads up www.shutterstock.com waits 2 seconds then shows two methods of clicking on a submit button. Comment one of them to test the other.see tests/ for more examples.
2. You need to have cURL enabled in your php.ini.

```php
<?php

require("../lib/BoostBase.php");

//arguments are optional for constructor. 
$session = new Boost(); 

//Will choose defaults [Location: http://127.0.0.1:4444/wd/hub, Browser : Firefox]
$session->start();

//must contains HTTP protocol. 
$session->set_url("http://www.shutterstock.com"); 

//adding wait statement in following release
sleep(2);

//get and set and element object to $element;
$element = $session->get_element("id","index_keyword_submit" );
//click on the $element
$session->click($element);

//Another way to click on an element;
//this fetches the $element within the click method and clicks it directly.
$session->click("id", "index_keyword_submit");

sleep(3);

$session->kill();

?>
```
Note:
=====
1. For reporting options you can use PHPUnit or Behat(recommended)


### TODO:

1. complete JWP command list integration
2. improve code
3. improve klogger integration for logging test requests to webdriver in realtime. Uses flatfile for now, moving to zeromq or rabbitmq for pub sub in near future

### License

BoostWebDriver by Luis Lopez is licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License. 
