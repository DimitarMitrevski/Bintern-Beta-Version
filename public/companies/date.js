function mydate() {
    //alert("");
    document.getElementById("element10").hidden = false;
    document.getElementById("element101").hidden = true;
}

function mydate1() {
    d = new Date(document.getElementById("element10").value);
    dt = d.getDate();
    mn = d.getMonth() + 1;
    yy = d.getFullYear();
    var x = document.getElementById("element10").value;
    document.getElementById("element11").min = x.split('/').reverse().join("-");
    document.getElementById("element101").value = dt + "/" + mn + "/" + yy
    document.getElementById("element101").hidden = false;
    document.getElementById("element10").hidden = true;
}
function mydate2() {
    //alert("");
    document.getElementById("element11").hidden = false;
    document.getElementById("element102").hidden = true;
}

function mydate3() {
    d = new Date(document.getElementById("element11").value);
    dt = d.getDate();
    mn = d.getMonth() + 1;
    yy = d.getFullYear();
    document.getElementById("element102").value = dt + "/" + mn + "/" + yy
    document.getElementById("element102").hidden = false;
    document.getElementById("element11").hidden = true;
}
function mydate4() {
    //alert("");
    document.getElementById("element14").hidden = false;
    document.getElementById("element140").hidden = true;
}

function mydate5() {
    d = new Date(document.getElementById("element14").value);
    dt = d.getDate();
    mn = d.getMonth() + 1;
    yy = d.getFullYear();
    document.getElementById("element140").value = dt + "/" + mn + "/" + yy
    document.getElementById("element140").hidden = false;
    document.getElementById("element14").hidden = true;
}