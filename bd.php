<?php
try {
    $connexion = new PDO("mysql:host=localhost;dbname=hello_garage;port=3308", "root", "");
    $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode("erreur" . $e->getMessage());
}

if ($_POST["requete"] == "insertUser") {

    try {
        $stmt = $connexion->prepare("INSERT INTO `users`( `Prenom`, `Nom`, `Courriel`, `Mdp`) VALUES (:prenom,:nom,:courriel,:mdp)");
        $stmt->bindParam(':prenom', $_POST['prenom']);
        $stmt->bindParam(':nom', $_POST['nom']);
        $stmt->bindParam(':courriel', $_POST['courriel']);
        $stmt->bindParam(':mdp', $_POST['mdp']);
        $stmt->execute();
    } catch (PDOException $e) {
        echo json_encode($e);
    }
} elseif ($_POST["requete"] == "login") {
    try {
        $stmt = $connexion->prepare("SELECT * FROM USERS WHERE `Courriel` like :email and `Mdp` like :password");
        $stmt->bindParam(':email', $_POST['email']);
        $stmt->bindParam(':password', $_POST['password']);
        $stmt->execute();
        $results = $stmt->fetch(PDO::FETCH_ASSOC);
        if (sizeof($results)==0 ){
            echo json_encode(false);
        }
        echo json_encode($results);
    } catch (PDOException $e) {
        echo json_encode($e);
    }
} elseif ($_POST["requete"] == "checkEmail") {
    try {
        $stmt = $connexion->prepare("SELECT * FROM USERS WHERE `Courriel` like :email");
        $stmt->bindParam(':email', $_POST['email']);
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if (sizeof($results) > 0) {
            echo json_encode(false);
        } else
            echo json_encode(true);

    } catch (PDOException $e) {
        echo json_encode($e);
    }
}elseif ($_POST["requete"] == "selectUser") {
    try {
        $stmt = $connexion->prepare("SELECT * FROM USERS WHERE `Courriel` like :email");
        $stmt->bindParam(':email', $_POST['email']);
        $stmt->execute();
        $results = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($results);
    } catch (PDOException $e) {
        echo json_encode($e);
    }
}


?>