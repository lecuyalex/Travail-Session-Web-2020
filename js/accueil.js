$(document).ready(function () {
    let url = new URL(window.location.href);
    let user = url.searchParams.get("user")
    if (user) {
        $('#user-btn').text(user).attr("href", "Parametres.html?user=" + user)
        $('#login-btn').text("Se deconnecter")
    } else
        window.location.href = "login.html"


    $('.logo_container').click(function () {
        let url = new URL(window.location.href);
        let user = url.searchParams.get("user")
        if (user) {
            window.location.href = "accueil.html?user=" + user;
        } else {
            window.location.href = "accueil.html";
        }
    });
    $('#btn_add_garage').click(function () {

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
            success: function (reponse) {
                console.log(reponse['Id'])
                let url = new URL(window.location.href);
                let email = url.searchParams.get("user")
                $.ajax({
                    url: "../bd.php",
                    type: "POST",
                    dataType: "json",
                    data: {
                        "requete": "addVente",
                        "titre": $("#noRue").val(),
                        "date": $("#date").val(),
                        "adresse": reponse['Id'],
                        "email": email
                    },
                    success: function (reponse) {

                    },
                    error: function (reponse) {
                        alert(JSON.stringify(reponse))
                    }
                });

            },
            error: function (reponse) {
                alert(JSON.stringify(reponse))
            }
        });

    })


});

function nePlusSuivre(user_id, vente_id) {
    let url = new URL(window.location.href);
    let user = url.searchParams.get("user")
    if (user) {
        window.location.href = "accueil.html?user=" + user;
    }
    $.ajax({
        url: "../bd.php",
        type: "POST",
        dataType: "json",
        data: {
            "requete": "NePasSuivre",
            "user_id": vente_id,
            "vente_id": vente_id

        },
        success: function (reponse) {
            console.log(JSON.stringify(reponse))
            window.location.href = "accueil.html?user=" + user;
        },
        error: function (reponse) {
            console.log(JSON.stringify(reponse))
            alert("Erreur dans le courriel et le mot de passe");
        }
    });

}

