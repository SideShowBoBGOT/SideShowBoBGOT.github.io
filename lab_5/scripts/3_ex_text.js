function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function delete_cookie(name) {
    if( getCookie( name ) ) {
        document.cookie = name + "=" +
            "; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
}

block3 = document.getElementsByClassName("block-3")[0];
button_length = document.getElementById("save_length");
let text_area = document.getElementById("text");
button_length.onclick = function () {
    len = 0;
    text = text_area.value;
    if(text) {
        words = text.split(" ");
        words = words.filter((value, index, arr) => value!=="");
        len = words.length;
    }
    document.cookie = "text_length="  + len;
    alert("Text Length: " + len);
    console.log(document.cookie);
}

if(!getCookie("iscookie")) {
    choice = confirm("Delete cookies?");
    if(choice) {
        delete_cookie("text_length");
    } else {
        alert("Cookies exists. The site will be reloaded");
    }
    location.reload();
    document.cookie = "iscookie=true;";
    console.log(document.cookie);
} else {
    delete_cookie("iscookie");
    console.log(document.cookie);
}




