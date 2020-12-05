<?php include "bd.php";

try {
    $stmt = $connexion->prepare("select * from categorie");
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($results);
} catch
(PDOException $e) {
    echo json_encode($e);
}
?>

