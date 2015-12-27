<?php
include_once('simple_html_dom.php');

// create HTML DOM
$html = file_get_html($_GET["url"]);

// get name
$data['name'] = $html->find('title', 0)->innertext;

// get age
$data['age'] = $html->find('div[id="info-container"] span[id="age"]', 0)->innertext;

// get profile image
$data['img'] = $html->find('img[id="user-photo"]', 0)->src;

// clean up memory
$html->clear();
unset($html);

echo json_encode($data);

?>