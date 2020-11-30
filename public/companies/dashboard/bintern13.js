firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var uid = firebase.auth().currentUser.uid;
        firebase.database().ref("students").once("value", function (snapshot) {
            var obj = snapshot.val();
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    var val = obj[key]["ImePrezime"];
                    var node = document.createElement("LI");
                    var nodeImg = document.createElement("img");
                    node.className = "list-group-item d-flex justify-content-between align-items-center";
                    var node1 = document.createElement("button");
                    node1.className = "btn-primary";
                    nodeImg.id = "slikaP";
                    if (obj[key]["slika"] != null)
                        nodeImg.src = obj[key]["slika"];
                    else
                        nodeImg.src = "man.png";
                    node1.setAttribute("data-toggle", "modal");
                    node1.setAttribute("data-target", "#exampleModal");
                    node1.setAttribute("data-whatever", obj[key]["email"]);
                    node1.setAttribute("data-namecompany", val);
                    var textnode1 = document.createTextNode("Испрати");
                    node1.appendChild(textnode1);
                    var textnode = document.createTextNode(val);
                    node.append(nodeImg);
                    node.appendChild(textnode);
                    node.append(node1);
                    document.querySelector(".list-group").appendChild(node);
                    console.log(val);
                }
            }
        })
        $('#exampleModal').on('show.bs.modal', function (event) {
            $('#staticBackdrop').modal('toggle');
            // $('#staticBackdrop').hide();
            var button = $(event.relatedTarget) // Button that triggered the modal
            var recipient = button.data('whatever')
            var company = button.data('namecompany')        // Extract info from data-* attributes
            // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
            // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
            var modal = $(this)
            modal.find('.modal-title').text('Нова порака до ' + company)
            modal.find('.modal-body input').val(recipient)
        })
        $("#exampleModal").on("hide.bs.modal", function (event) {
            $('#staticBackdrop').modal('toggle');
            // $("#button2").trigger('click');
            // $('#staticBackdrop').show();
        });
    }
    else {
        location.replace("../../index.html");
    }
})

$("#najava").click(function () {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        //  location.reload();
        location.replace("../../index.html");
    }).catch(function (error) {
        // An error happened.
        alert(error.message)
    });
});