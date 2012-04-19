Instructions:
=========
1. launching a new instance, arguments are optional if they are defaults like below.

```php
<?php

require("../lib/BoostBase.php");

//arguments are optional for constructor. 
$session = new Boost("http://127.0.0.1:4444/wd/hub", "firefox"); 

//must contains HTTP protocol. 
$session->set_url("http://www.google.com"); 

//adding wait statement in following release
sleep(2);

$s->kill();

?>
```

### TODO:

1. add phpunit option for assertions
2. complete JWP command list integration
3. improve code


