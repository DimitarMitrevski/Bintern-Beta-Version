
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    var uid = user.uid;
    document.getElementById('element10').min = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0];
    document.getElementById('element11').min = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0];
    document.getElementById('element14').min = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0];

    var brOglasi;
    var imefirma;
    var moiOglasi;
    var logo;
    firebase.database().ref().once('value').then(function (snapshot) {
      brOglasi = snapshot.val().broglasi;
    });
    firebase.database().ref('companies/' + uid).once('value').then(function (snapshot) {
      imefirma = snapshot.val().imeFirma;
      logo = snapshot.val().logo;
    });
    firebase.database().ref('companies/' + uid).once('value').then(function (snapshot) {
      moiOglasi = snapshot.val().moiOglasi;
    });



    const oglasiForm = document.querySelector("#oglasiForm");
    var messagesRef = firebase.database().ref('companies');

    oglasiForm.addEventListener('submit', (e) => {
      e.preventDefault();
      document.querySelector('.alert').style.display = 'block';
      document.querySelector('.cover').style.display = 'block';
      setTimeout(function () {
        document.querySelector('.alert').style.display = 'none';
        document.querySelector('.cover').style.display = 'none';
      }, 3000);
      var pozicija = getInputVal('element8');
      // //var email= getInputVal('singup-email');
      var odKoga = getInputVal('element101');
      var doKoga = getInputVal('element102');
      var opisPraksata = getInputVal('element4');
      var today = new Date();
      var date = today.getDate() + '/' + (today.getMonth() + 1) + "/" + today.getFullYear();
      var OglasOd = date;
      var OglasDo = getInputVal('element140');
      brOglasi++;
      moiOglasi++;
      //Save messages
      saveMessage(pozicija, odKoga, doKoga, opisPraksata, OglasOd, OglasDo, brOglasi, uid);
      oglasiForm.reset();

      // );

      function getInputVal(id) {
        return document.getElementById(id).value;
      }
      function saveMessage(pozicija, odKoga, doKoga, opisPraksata, OglasOd, OglasDo, brOglasi, uid) {
        // var newMessageRef= messagesRef.push();
        var pozicijaRef = firebase.database().ref('oglasi/' + 'oglas_' + brOglasi + '/pozicija');
        var odKogaRef = firebase.database().ref('oglasi/oglas_' + brOglasi + '/odKoga');
        var doKogaRef = firebase.database().ref('oglasi/oglas_' + brOglasi + '/doKoga');
        var opisPraksataRef = firebase.database().ref('oglasi/oglas_' + brOglasi + '/opisPraksata');
        var oglasOdRef = firebase.database().ref('oglasi/oglas_' + brOglasi + '/vremetraenje/od');
        var oglasDoRef = firebase.database().ref('oglasi/oglas_' + brOglasi + '/vremetraenje/do');
        var imefirmaRef = firebase.database().ref('oglasi/oglas_' + brOglasi + '/imefirma');
        var uidRef = firebase.database().ref('oglasi/oglas_' + brOglasi + '/uid');
        // var broglasiRef= firebase.database().ref('companies/'+uid+'/broglasi');
        var broglasiRef = firebase.database().ref('broglasi');
        var pozaRef = firebase.database().ref('companies/' + uid + '/oglas_' + moiOglasi + '/pozicija');
        var opisPraksaRef = firebase.database().ref('companies/' + uid + '/oglas_' + moiOglasi + '/opisPraksata');
        var brojNaOglasRef = firebase.database().ref('companies/' + uid + '/oglas_' + moiOglasi + '/brojNaOglas');
        var brojAplikantiRef = firebase.database().ref('companies/' + uid + '/oglas_' + moiOglasi + '/brojAplikanti');
        var brAplikantiRef = firebase.database().ref('oglasi/oglas_' + brOglasi + '/brojAplikanti');
        var moiOglasiRef = firebase.database().ref('companies/' + uid + '/moiOglasi');
        var logoRef = firebase.database().ref('oglasi/oglas_' + brOglasi + '/logoFirma');
        var brPokani = firebase.database().ref('companies/' + uid + '/oglas_' + moiOglasi + '/brPokani');
        brPokani.set(0);
        moiOglasiRef.set(moiOglasi);
        brAplikantiRef.set(0);
        brojAplikantiRef.set(0);
        uidRef.set(uid);
        pozaRef.set(pozicija);
        opisPraksaRef.set(opisPraksata);
        brojNaOglasRef.set(brOglasi);
        pozicijaRef.set(pozicija);
        odKogaRef.set(odKoga);
        doKogaRef.set(doKoga);
        opisPraksataRef.set(opisPraksata);
        oglasOdRef.set(OglasOd);
        oglasDoRef.set(OglasDo);
        broglasiRef.set(brOglasi);
        imefirmaRef.set(imefirma);
        if (logo != null)
          logoRef.set(logo);
        location.replace("dashboard/myAds.html")
      }
    });

  } else {
    // No user is signed in.
    location.replace("../index.html");
  }
});
