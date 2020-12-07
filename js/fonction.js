$(document).ready(function () {

    $(".btSearch").attr("onclick", "changeRecherche($('.search_text').val())")
    let url = new URL(window.location.href);
    let user = url.searchParams.get("user")
    if (user) {
        $('#user-btn').text(user).attr("href", "Parametres.html?user=" + user)
        $('#login-btn').text("Se deconnecter")
    }


    $('.logo_container').click(function () {

        let url = new URL(window.location.href);
        let user = url.searchParams.get("user")
        if (user) {
            window.location.href = "accueil.html?user=" + user;
        } else {
            window.location.href = "accueil.html";
        }
    });
    $('#btn_add_garage').click(function (e) {
        e.preventDefault()
        let fichier = $('#image').prop('files')[0];
        let form_data = new FormData();
        form_data.append('fichier', fichier);
        $.ajax({
            url: 'upload.php',
            dataType: "json",
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            type: 'post',

            success: function (rep1) {

                $.ajax({
                    url: "../bd.php",
                    type: "POST",
                    dataType: "json",
                    data: {
                        "requete": "addAdresse",
                        "noRue": $("#noRue").val(),
                        "rue": $("#rue").val(),
                        "ville": $("#ville").val(),
                        "codePostal": $("#codePostal").val(),
                    },
                    success: function (rep2) {
                        let url = new URL(window.location.href);
                        let email = url.searchParams.get("user")
                        $.ajax({
                            url: "../bd.php",
                            type: "POST",
                            dataType: "json",
                            data: {
                                "requete": "addVente",
                                "titre": $("#titre").val(),
                                "date": $("#date").val(),
                                "adresse": rep2['Id'],
                                "email": email,
                                "categorie": $("#cat-dropdown").val(),
                                "photo": rep1['Id']
                            },
                            success: function () {
                                alert("Vente créer avec succes")
                                let url = new URL(window.location.href);
                                let user = url.searchParams.get("user")

                                    window.location.href = "accueil.html?user=" + user
                            },
                            error: function () {
                                alert("Erreur")
                            }
                        });

                    },
                    error: function (reponse) {
                        alert(JSON.stringify(reponse))
                    }
                });
            },
            error: function () {
            }
        });


    })


});

function changeCategorie(id) {
    let url = new URL(window.location.href);
    let user = url.searchParams.get("user")
    if(user){
        window.location.href = "resultats_recherches.html?user=" + user + "&cat=" + id;
    }else{
        window.location.href = "resultats_recherches.html?cat=" + id;
    }


}

function changeRecherche(recherche) {
    let url = new URL(window.location.href);
    let user = url.searchParams.get("user")
    if(user){
        window.location.href = "resultats_recherches.html?user=" + user + "&recherche=" + recherche;
    }else{
        window.location.href = "resultats_recherches.html?recherche=" + recherche;
    }



}


function ValidateName(text) {
    let regex = /^[a-z]+$/i
    return regex.test(text)
}


function ValidateEmail(mail) {
    let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    return (regex.test(mail))
}

function ValidatePhone(phone) {
    let regex = /^\d{10}$/
    return regex.test(phone)
}

function errorMessage(id, input) {
    document.getElementById(id).innerHTML = "Le " + input + " ne peut pas etre vide ou n'est pas valide";
    setTimeout(function () {
        document.getElementById(id).innerHTML = '';
    }, 3000);
}

function checkInfo(email, prenom, nom, telephone) {
    if (email === "" || !ValidateEmail(email)) {
        errorMessage("errorEmail", "courriel");
        return false;
    } else if (prenom === "" || !ValidateName(prenom)) {
        errorMessage("errorFirstName", "prenom");
        return false;
    } else if (nom === "" || !ValidateName(nom)) {
        errorMessage("errorName", "nom de famille");
        return false;
    } else if (telephone === "" || !ValidatePhone(telephone)) {
        errorMessage("errorPhone", "téléphone");
        return false;
    }
    return true
}

function checkPwd(ancien, nouveau, verif, present) {
    if (nouveau !== verif) {
        document.getElementById("errorNewPwd").innerHTML = "Les mots de passe doivent être identique";
        setTimeout(function () {
            document.getElementById("errorNewPwd").innerHTML = '';
        }, 3000);
        return false;
    } else if (nouveau === "") {
        errorMessage("errorNewPwd", "mot de passe");
        return false;
    } else if (verif === "") {
        errorMessage("errorNewVerif", "mot de passe");
        return false;
    } else if (!present) {
        document.getElementById("errorPresentPwd").innerHTML = "Mot de passe incorrect";
        setTimeout(function () {
            document.getElementById("errorPresentPwd").innerHTML = '';
        }, 3000);
        return false;
    }
    return true;
}

function nePlusSuivre(vente_id) {
    let url = new URL(window.location.href);
    let user = url.searchParams.get("user")
    if (user) {
        $.ajax({
            url: "../bd.php",
            type: "POST",
            dataType: "json",
            data: {
                "requete": "NePasSuivre",
                "user": user,
                "vente_id": vente_id

            },
            success: function (reponse) {
                location.reload()
            },
            error: function (reponse) {
                console.log(JSON.stringify(reponse))

            }
        });
    }

}

function suivreVente(id) {

    let url = new URL(window.location.href);
    let user = url.searchParams.get("user")
    if (user) {
        $.ajax({
            url: "../bd.php",
            type: "POST",
            dataType: "json",
            data: {
                "requete": "Suivre",
                "user": user,
                "vente_id": id
            },
            success: function (reponse) {
                location.reload()
            },
            error: function (reponse) {
            }
        });
    } else {
        window.location.href = "login.html";
    }
}

function afficherSuivie(id) {
    let url = new URL(window.location.href);
    let user = url.searchParams.get("user")
    if (user) {
        window.location.href = "visualisationSuivies.html?user=" + user + "&id=" + id
    } else {
        window.location.href = "login.html"
    }


}

