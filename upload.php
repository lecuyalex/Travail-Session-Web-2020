<?php

$dossier = '../image/';
$date = date_timestamp_get(new DateTime());
$path = $_FILES['fichier']['name'];
$ext = pathinfo($path, PATHINFO_EXTENSION);
$chemin = $date . "." . $ext;


if (move_uploaded_file($_FILES['fichier']['tmp_name'], $chemin)) {
    try {
        $connexion = new PDO("mysql:host=206.167.140.56;dbname=420505ri_gr09;port=3306", "1846551", "1846551");
        $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $connexion->prepare("insert into photo (path) values (:chemin)");
        $stmt->bindParam(':chemin', $chemin);
        $stmt->execute();
        $stmt = $connexion->prepare("select * from photo where path = :path");
        $stmt->bindParam(':path', $chemin);
        $stmt->execute();
        $results = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($results);
    } catch
    (PDOException $e) {
        echo json_encode($e);
    }
} else {
    echo "Une erreur s'est produite";
}


?>
