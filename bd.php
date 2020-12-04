<?php


try {
    $connexion = new PDO("mysql:host=206.167.140.56;dbname=420505ri_gr09;port=3306", "1846551", "1846551");
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
        if (sizeof($results) == 0) {
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
} elseif ($_POST["requete"] == "selectUser") {
    try {
        $stmt = $connexion->prepare("SELECT * FROM USERS WHERE `Courriel` like :email");
        $stmt->bindParam(':email', $_POST['email']);
        $stmt->execute();
        $results = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($results);
    } catch (PDOException $e) {
        echo json_encode($e);
    }
} elseif ($_POST["requete"] == "addVente") {
    try {
        $stmt = $connexion->prepare("insert into ventes (Titre, Date, Courverture, Adresse, Createur) values (:titre,:date,1,:adresse,:createur)");
        $stmt->bindParam(':titre', $_POST['titre']);
        $stmt->bindParam(':date', $_POST['date']);
        $stmt->bindParam(':adresse', $_POST['adresse']);
        $id = getUserId($_POST['email'],$connexion).Id;
        $stmt->bindParam(':createur', $id);
        $stmt->execute();
    } catch (PDOException $e) {
        echo json_encode($e);
    }

} elseif ($_POST["requete"] == "addAdresse") {
    try {
        $stmt = $connexion->prepare("INSERT INTO `users`( `NoRue`, `Rue`, `Ville`, `CodePostal`) VALUES (:noRue,:rue,:ville,:code)");
        $stmt->bindParam(':noRue', $_POST['noRue']);
        $stmt->bindParam(':rue', $_POST['rue']);
        $stmt->bindParam(':ville', $_POST['ville']);
        $stmt->bindParam(':code', $_POST['code']);
        $stmt->execute();
        echo selectAdresse($_POST['noRue'], $_POST['rue'], $_POST['ville'], $_POST['code'], $connexion);
    } catch (PDOException $e) {
        echo json_encode($e);
    }


}

function selectAdresse($no, $rue, $ville, $code, $connexion)
{
    $stmt = $connexion->prepare("select distinct * from adresse where CodePostal = $code and NoRue = $no and Ville = $ville and Rue = $rue ");
    $stmt->execute();
    $results = $stmt->fetch(PDO::FETCH_ASSOC);
    return json_encode($results);
}

function getUserId($email,$connexion){
    $stmt = $connexion->prepare("SELECT * FROM USERS WHERE `Courriel` like :email");
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    $results = $stmt->fetch(PDO::FETCH_ASSOC);
    return json_encode($results);
}
?>