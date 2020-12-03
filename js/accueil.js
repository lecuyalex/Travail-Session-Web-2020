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

})

