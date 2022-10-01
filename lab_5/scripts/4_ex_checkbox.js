bl3 = document.getElementById("bl3");
bl4 = document.getElementById("bl4");
bl5 = document.getElementById("bl5");
block3 = document.getElementsByClassName("block-3")[0];
block4 = document.getElementsByClassName("block-4")[0];
block5 = document.getElementsByClassName("block-5")[0];

bl3.addEventListener("change", (event) => {
    const data = { check: bl3.checked };
    window.localStorage.setItem('bl3', JSON.stringify(data));
    console.log("bl3: "+bl3.checked);
});

bl4.addEventListener("change", (event) => {
    const data = { check: bl4.checked };
    window.localStorage.setItem('bl4', JSON.stringify(data));
    console.log("bl4: "+bl4.checked);
});

bl5.addEventListener("change", (event) => {
    const data = { check: bl5.checked };
    window.localStorage.setItem('bl5', JSON.stringify(data));
    console.log("bl5: "+bl5.checked);
});
bl3_storage = JSON.parse(window.localStorage.getItem('bl3'));
bl4_storage = JSON.parse(window.localStorage.getItem('bl4'));
bl5_storage = JSON.parse(window.localStorage.getItem('bl5'));

if(bl3_storage!==null) {
    bl3.checked = bl3_storage.check;
}
if(bl4_storage!==null) {
    bl4.checked = bl4_storage.check;
}
if(bl5_storage!==null) {
    bl5.checked = bl5_storage.check;
}

if(bl3.checked) {
    block3.style.textAlign = "left";
}
if(bl4.checked) {
    block4.style.textAlign = "left";
}
if(bl5.checked) {
    block5.style.textAlign = "left";
}