Instructions:
=========
1. launching a new instance, which navigates to google.com
2. You need to have cURL enabled.

```php
<?php

require("../lib/BoostBase.php");

//arguments are optional for constructor. 
//Will choose defaults [Browser : Firefox , Location: http://127.0.0.1:4444/wd/hub]
$session = new Boost(); 

//must contains HTTP protocol. 
$session->set_url("http://www.google.com"); 

//adding wait statement in following release
sleep(2);

$session->kill();

?>
```

### TODO:

1. add phpunit option for assertions
2. complete JWP command list integration
3. improve code


