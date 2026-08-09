<?php
$pdo = new PDO("mysql:host=127.0.0.1;dbname=newcccdowebsitedb;charset=utf8mb4", "root", "");
$q = $pdo->query("SHOW CREATE TABLE news_articles");
foreach($q as $row){
    print_r($row);
    echo "\n";
}
$q = $pdo->query("SELECT id, title, LEFT(body, 180) AS body_preview FROM news_articles ORDER BY id DESC LIMIT 3");
foreach($q as $row){
    echo "ID={$row['id']}\nTITLE={$row['title']}\nBODY={$row['body_preview']}\n---\n";
}
