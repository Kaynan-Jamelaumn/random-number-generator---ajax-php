<?php
    function generateNumber():int {
      return rand(0, 100);
    }
    if(isset($_GET['generateNumber'])){
      echo json_encode(generateNumber());
     }
    if(isset($_POST['number'])){

        $number = $_POST['number'];
        if (!isset($number)) {
          $number = generateNumber();
        }

        $file = fopen("list.json", "a+");
        $content = json_decode(file_get_contents('list.json'), true);// para recuperar o conteúdo salvo no arquivo
        $file = fopen("list.json", "w+");// como todo o onteúdo já tá salvo na variável abro de novo o arquivo em modo de escrever tudo novamente
        $content[$number] = $number;

        fwrite($file, json_encode($content));
        fclose($file);

    }    
    if(isset($_GET['request'])) {
      $file = fopen("list.json", "r");
      echo file_get_contents('list.json');
      fclose($file);
    }

