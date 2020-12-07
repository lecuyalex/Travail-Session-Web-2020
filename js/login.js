$(document).ready(function () {
    $("#bt_ajouter").click(function (e) {
        e.preventDefault()

        $.ajax({
            url: "../bd.php",
            type: "POST",
            dataType: "json",
            data: {
                "requete": "checkEmail",
                "email": $("#email").val(),

            },
            success: function (reponse) {
                let rep = JSON.parse(reponse);
                if (verifSignin(rep)) {
                    $.ajax({
                        url: "../bd.php",
                        type: "POST",
                        dataType: "json",
                        data: {
                            "requete": "insertUser",

                            "nom": $("#lastname").val(),
                            "prenom": $("#name").val(),
                            "courriel": $("#email").val(),
                            "mdp": $("#pwd").val()

                        },
                        success: function (reponse) {
                            alert("utilisateur créer")
                            window.location.href = "accueil.html?user=" + $("#email").val();
                        },
                        error: function (message) {
                            console.log(message)
                        }

                    });

                }

            },
            error: function (message, e) {
                console.log(e.message);
            }
        })
    })

    $("#bt_login").click(function (e) {
        e.preventDefault()
        $.ajax({
            url: "../bd.php",
            type: "POST",
            dataType: "json",
            data: {
                "requete": "login",
                "email": $("#login_email").val(),
                "password": $("#login_pwd").val(),
            },
            success: function (reponse) {

                if (reponse === false) {
                    alert("Erreur dans le courriel et le mot de passe");
                } else{
                    window.location.href = "accueil.html?user=" + reponse['Courriel'];
                }
            },
            error: function (reponse) {
                console.log(JSON.stringify(reponse))
                alert("Erreur dans le courriel et le mot de passe");
            }
        });
    })
});


function checkVide(id) {
    return document.forms["sign-in-form"][id].value === "";
}

function verifSignin(email) {

    if (checkVide("name")) {
        errorMessage("errorName", "nom");
        return false;
    } else if (checkVide("lastname")) {
        errorMessage("errorLastName", "nom de famille");
        return false;
    } else if (checkVide("email")) {
        errorMessage("errorEmail", "Courriel");
        return false;
    } else if (checkVide("pwd")) {
        errorMessage("errorPwd", "Mot de passe");
        return false;
    } else if (checkVide("verif_pwd")) {
        errorMessage("errorVerif", "verification ");
        return false;
    } else if (!checkPwd(document.forms["sign-in-form"]["pwd"].value, document.forms["sign-in-form"]["verif_pwd"].value)) {
        document.getElementById("errorVerif").innerHTML = "Les mots de passe doivent etre identique";
        setTimeout(function () {
            document.getElementById("errorVerif").innerHTML = '';
        }, 3000);
        return false;
    } else if (email === false) {
        document.getElementById("errorLabel").innerHTML = "Le courriel a déjà été utilisé";
        setTimeout(function () {
            document.getElementById("errorLabel").innerHTML = '';
        }, 3000);
        return false;
    } else {
        console.log("passe verif")
        return true;
    }


}

function checkPwd(pwd, verif) {
    return pwd === verif

}

