Instructions:
=========
1. launching a new instance, which navigates to www.shutterstock.com, sleeps then dies.
see tests/ for more examples.
2. You need to have cURL enabled.

```php
<?php

require("../lib/BoostBase.php");

//arguments are optional for constructor. 
//Will choose defaults [Browser : Firefox , Location: http://127.0.0.1:4444/wd/hub]
$session = new Boost(); 

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
$session->click(null, "id", "index_keyword_submit");

sleep(3);

$session->kill();

?>
```

### TODO:

1. add phpunit option for assertions
2. complete JWP command list integration
3. improve code

### License

BoostWebDriver by Luis Lopez is licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License. Based on a work at github.com.
