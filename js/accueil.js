$(document).ready(function () {
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
                "codePostal": $("#codePostal").val()
            },
            success: function (reponse) {
                $.ajax({
                    url: "../bd.php",
                    type: "POST",
                    dataType: "json",
                    data: {
                        "requete": "addVente",
                        "titre": $("#noRue").val(),
                        "date": $("#rue").val(),
                        "ville": reponse.Id,

                    },
                    success: function (reponse) {
                        alert(JSON.stringify(reponse))

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
})

