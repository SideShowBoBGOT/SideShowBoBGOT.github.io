function save_onto_server() {
    let data = {
        "id": "allData",
        "name": {
            play_btn: "PLAY",
            close_btn: "CLOSE",
            reload_btn: "RELOAD",
            start_btn: "START",
            texture: "url(\"../images/bg.png\")",
            message_main: "MESSAGE:"
        }
    }
    saveToIndexedDB('objectstoreName', data).then(function (response) {
        console.log('data saved');
    }).catch(function (error) {
        console.log(error.message);
    });
}

async function load_from_server() {
    let data;
   await loadFromIndexedDB('objectstoreName', "allData").then(function (reponse) {
        data = reponse;
        console.log(data);
        console.log('data loaded OK');
    }).catch(function (error) {
        console.log(error.message);
    });
   return data;
}

save_onto_server();