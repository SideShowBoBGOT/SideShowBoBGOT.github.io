play_btn = document.getElementById("play_btn");
start_btn = document.getElementById("start_btn");
close_btn = document.getElementById("close_btn");
reload_btn = document.getElementById("reload_btn");
work = document.getElementById("work");
message_main = document.getElementById("message_main");
message_text = document.getElementById("message_text");
start_btn_text = document.getElementById("start_btn_text");
close_btn_text = document.getElementById("close_btn_text");
reload_btn_text = document.getElementById("reload_btn_text");
play_btn_text = document.getElementById("play_btn_text");
sq_one = document.getElementById("sq_one");
sq_two = document.getElementById("sq_two");
all_messages = document.getElementById("all_messages");
title = document.title;
try {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
} catch (ex) {}


message_id = 0;
sq_one_params = {
    sin: 0.0,
    cos: 0.0,
    speed: 0,
    x: 0,
    y: 0,
    width: 20,
    height: 20,
    col: "red"
};
sq_two_params = {
    sin: 0.0,
    cos: 0.0,
    speed: 0,
    x: 0,
    y: 0,
    width: 20,
    height: 20,
    col: "green"
};
handle = undefined;
function load_messages_from_local_storage(arr) {
    for(let i=0;i<message_id;++i) {
        let data = JSON.parse(window.localStorage.getItem(""+i));
        let val = Object.values(data);
        console.log(val);
        arr.push(val);
    }
    localStorage.clear();
}
function show_messages() {
    try {
        let child = all_messages.lastChild;
        while (child) {
            all_messages.removeChild(child);
            child = all_messages.lastChild;
        }
        let messages = [];
        load_messages_from_local_storage(messages);
        console.log(messages);
        for (let i = 0; i < messages.length; ++i) {
            let div = document.createElement("div");
            div.className = "message_info";
            div.innerText = messages[i];
            all_messages.appendChild(div);
        }
    } catch(ex) {}
}
function on_message_update() {
    let today = new Date();
    let time_str = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let data = {text: message_text.innerText, time: time_str};
    window.localStorage.setItem(""+message_id, JSON.stringify(data));
    ++message_id;
}
function update_message(message) {
    console.log(message);
    message_text.innerText = message;
    on_message_update();
}
async function set_up_page() {
    let data = await load_from_server();
    start_btn_text.innerText = data.name.start_btn;
    close_btn_text.innerText = data.name.close_btn;
    reload_btn_text.innerText = data.name.reload_btn;
    play_btn_text.innerText = data.name.play_btn;
    message_main.innerText = data.name.message_main;
}
async function on_page_load() {
    await set_up_page();
}

function update_position(sq, params) {
    if(title==="default") {
        sq.style.left = params.x + "px";
        sq.style.top = params.y + "px";
    } else if(title==="canvas") {
        ctx.fillStyle = params.col;
        ctx.fillRect(params.x, params.y, params.width, params.height);
    }
}
function prepare_anim() {
    try {
        canvas.width = window.innerWidth * 0.7 - 30 + 10;
        canvas.height = window.innerHeight * 0.9 - 60 + 10;
    } catch (ex) {}
    let width = window.innerWidth*0.7-30+10;
    let height = window.innerHeight*0.9-60+10;
    let signs = [+1, -1];
    sq_one_params.x = Math.random()*width;
    sq_one_params.y = Math.random()*height;
    sq_two_params.x = Math.random()*width;
    sq_two_params.y = Math.random()*height;
    sq_one_params.sin = -1 + Math.random()*2;
    sq_one_params.cos = Math.sqrt(1 - Math.pow(sq_one_params.sin, 2));
    sq_one_params.cos *= signs[Math.floor(Math.random()*signs.length)];
    sq_two_params.sin = -1 + Math.random()*2;
    sq_two_params.cos = Math.sqrt(1 - Math.pow(sq_two_params.sin, 2));
    sq_two_params.cos *= signs[Math.floor(Math.random()*signs.length)];
    update_position(sq_one, sq_one_params);
    update_position(sq_two, sq_two_params);
}

function move(sq, params) {
    params.x += params.speed*params.cos;
    params.y += params.speed*params.sin;
    update_position(sq, params);
    params.speed += 0.01;
}
function check_for_wall_collision(sq, params) {
    let max_x = window.innerWidth*0.7 - 2*params.width;
    let max_y = window.innerHeight*0.9 - 2*params.height;
    if(params.x>max_x) {
        params.x = max_x - 40;
        params.cos *= -1;
        params.sin = -1 + Math.random()*2;
        update_message("right_wall");
    }
    if(params.y>max_y) {
        params.y = max_y-40;
        params.sin *= -1;
        params.cos = -1 + Math.random()*2;
        update_message("down_wall");
    }
    if(params.x<0) {
        params.x = 40;
        params.cos *= -1;
        params.sin = -1 + Math.random()*2;
        update_message("left_wall");
    }
    if(params.y<0) {
        params.y = 40;
        params.sin *= -1;
        params.cos = -1 + Math.random()*2;
        update_message("up_wall");
    }
    update_position(sq, params);
}
function is_squares_collide() {
    let x_one = sq_one_params.x;
    let y_one = sq_one_params.y;
    let x_two = sq_two_params.x;
    let y_two = sq_two_params.y;
    let width_one = sq_one_params.width;
    let height_one = sq_one_params.height;
    let is_collide = false;
    if(Math.abs(x_two-x_one)<=width_one
        && Math.abs(y_two-y_one)<=height_one) {
        is_collide = true;
    }
    return is_collide;
}
function tick_anim() {
    try {
        canvas.width = window.innerWidth * 0.7 - 30 + 10;
        canvas.height = window.innerHeight * 0.9 - 60 + 10;
    } catch (ex) {}
    if(title==="canvas") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    move(sq_one, sq_one_params);
    move(sq_two, sq_two_params);
    check_for_wall_collision(sq_one, sq_one_params);
    check_for_wall_collision(sq_two, sq_two_params);
    if(is_squares_collide()) {
        stop_anim();
        update_message("hit");
    }

}
function start_anim() {
    handle = setInterval(tick_anim, 10);
}
function stop_anim() {
    clearInterval(handle);
    start_btn.style.display = "none";
    reload_btn.style.display = "block";
    sq_one_params.speed = 0;
    sq_two_params.speed = 0;
    enable_reload_btn();
}
function enable_play_btn() {
    play_btn.addEventListener("click", on_play_btn);
}
function enable_close_btn() {
    close_btn.addEventListener("click", on_close_btn);
}
function enable_start_btn() {
    start_btn.addEventListener("click", on_start_btn);
}
function enable_reload_btn() {
    reload_btn.addEventListener("click", on_reload_btn);
}
function disable_play_btn() {
    play_btn.removeEventListener("click", on_play_btn);
}
function disable_close_btn() {
    close_btn.removeEventListener("click", on_close_btn);
}
function disable_start_btn() {
    start_btn.removeEventListener("click", on_start_btn);
}
function disable_reload_btn() {
    reload_btn.removeEventListener("click", on_reload_btn);
}
function on_play_btn() {
    update_message("play_btn");
    work.style.display = "flex";
    disable_play_btn();
    enable_close_btn();
    enable_start_btn();
    prepare_anim();
}
function on_close_btn() {
    update_message("close_btn");
    work.style.display = "none";

    enable_play_btn();
    disable_close_btn();

    stop_anim();
    show_messages();
}

function on_start_btn(ev) {
    update_message("start_btn");
    disable_start_btn();
    enable_reload_btn();
    start_anim();
}
function on_reload_btn(ev) {
    update_message("reload_btn");
    enable_start_btn();
    disable_reload_btn();
    start_btn.style.display = "block";
    reload_btn.style.display = "none";
    prepare_anim();
}
work.style.display = "none";
window.onload = on_page_load;
play_btn.addEventListener("click", on_play_btn);




