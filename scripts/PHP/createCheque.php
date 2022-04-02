<?php 
    //These lines should hopefully catch errors
    ini_set('display_errors', 'On');
	error_reporting(E_ALL);
    //This logs the start time of the code to be sent with $output
    $executionStartTime = microtime(true);
    
    // This imports the array to PHP
    $array = $_REQUEST['formArray'];
    
    // Replaces the amount with a £ symbol in front
    $amount = $array[7];
    $amountWithCommas = number_format($amount);
    $amountFormatted = "£" . $amountWithCommas ;

    // Removes the old unformatted amount
    unset($array[7]);
    // Adds the new formatted amount to the end of the array
    array_push($array, $amountFormatted);

    // This gets today's day, month and year from the user inputted data  
    $seperate = explode("-",$array[9]);
    // Removes the old date as it is no longer needed
    unset($array[9]);
    // Adds the seperated date into the array
    array_push($array, $seperate);

    // This will format the numbers into their text equivalent

    $f = new NumberFormatter("en", NumberFormatter::SPELLOUT);
    $f->format(123456);
        
    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['status']['description'] = "success";
    $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
    $output['data'] = $f;
    header('Content-Type: application/json; charset=UTF-8');       

    echo json_encode($output); 
   
?>