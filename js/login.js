function ajouter() {
    console.log('test')
    $.ajax({
        url: "C:/wamp64/www/php/bd.php",
        type: "POST",
        dataType: "json",
        data: {
            "requete": "insertUser",
            "nom": $("#lastname").val(),
            "prenom": $("#name").val(),
            "courriel": $("#email").val(),
            "mdp": $("#pwd").val() ,

        },
        success: function(output) {
            alert(output);
        },
        error: function (message, e) {
            alert(e.message)
        }
    });


}