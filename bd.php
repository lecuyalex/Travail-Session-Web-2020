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
        $id = getUserId($_POST['email'], $connexion)['Id'];
        $stmt->bindParam(':createur', $id)['Id'];
        $stmt->execute();
    } catch (PDOException $e) {
        echo json_encode($e);
    }

} elseif ($_POST["requete"] == "addAdresse") {
    try {
        $stmt = $connexion->prepare("INSERT INTO `adresse`( `NoRue`, `Rue`, `Ville`, `CodePostal`) VALUES (:noRue,:rue,:ville,:code)");
        $stmt->bindParam(':noRue', $_POST['noRue']);
        $stmt->bindParam(':rue', $_POST['rue']);
        $stmt->bindParam(':ville', $_POST['ville']);
        $stmt->bindParam(':code', $_POST['codePostal']);
        $stmt->execute();
        $stmt = $connexion->prepare("select distinct * from adresse where CodePostal =:code and NoRue = :noRue and Ville = :ville and Rue = :rue ");
        $stmt->bindParam(':noRue', $_POST['noRue']);
        $stmt->bindParam(':rue', $_POST['rue']);
        $stmt->bindParam(':ville', $_POST['ville']);
        $stmt->bindParam(':code', $_POST['codePostal']);
        $stmt->execute();
        $result= $stmt->fetch(PDO::FETCH_ASSOC);
        echo  json_encode($result);
   } catch (PDOException $e) {
        echo json_encode($e);
    }


} elseif ($_POST["requete"] == "getVenteSuivie") {
    try {
        $stmt = $connexion->prepare("select sv.user_id as user_id,sv.vente_id as vente_id, v.titre as titre,v.date as date from suivie_vente sv inner join ventes v on sv.vente_id = v.Id inner join users u on sv.user_id = u.Id where Courriel like :email");
        $stmt->bindParam(':email', $_POST['email']);
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($results);
    } catch
    (PDOException $e) {
        echo json_encode($e);
    }


} elseif ($_POST["requete"] == "NePasSuivre") {
    try {
        $stmt = $connexion->prepare("delete from suivie_vente where user_id = :user_id  and vente_id = :vente_id");
        $stmt->bindParam(':user_id', $_POST['user_id']);
        $stmt->bindParam(':vente_id', $_POST['vente_id']);
        $stmt->execute();
    } catch
    (PDOException $e) {
        echo json_encode($e);
    }
} elseif ($_POST["requete"] == "getVente") {
    try {
        $stmt = $connexion->prepare("select v.id as id,v.titre as titre,v.date as date from ventes v inner join users u on u.Id = v.Createur where Courriel like :email");
        $stmt->bindParam(':email', $_POST['email']);
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($results);
    } catch
    (PDOException $e) {
        echo json_encode($e);
    }
}



function getUserId($email, $connexion)
{
    $stmt = $connexion->prepare("SELECT Id FROM USERS WHERE `Courriel` like :email");
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    $results = $stmt->fetch(PDO::FETCH_ASSOC);
    return $results;
}

?>