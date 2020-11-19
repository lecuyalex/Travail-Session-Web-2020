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
                            console.log("Utilisateur ajouter")
                            //Retourne a la page principale
                        },
                        error: function (message, e) {
                            console.log(e.message)
                        }
                    });
                    console.log("Utilisateur ajouter")
                    // }
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
                alert(JSON.stringify(reponse))
            },
            error: function (message, e) {
//erreur dans le courriel ou dans le mot de passe
            }
        });
    })

    $("#forgotPassword").click(function (){

    });

});


function errorMessage(id, input) {
    document.getElementById(id).innerHTML = "Le " + input + " ne peut pas etre vide";
    setTimeout(function () {
        document.getElementById(id).innerHTML = '';
    }, 3000);
}

function checkVide(id) {
    if (document.forms["sign-in-form"][id].value === "") {
        return true;
    } else {
        return false;

    }
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

