<?php
$_POST = json_decode(file_get_contents("php://input"),true);//получаем JSON данные на php для дальнейшей работы
echo var_dump($_POST); // получаем код в консоли (данные которые мы отправили )

