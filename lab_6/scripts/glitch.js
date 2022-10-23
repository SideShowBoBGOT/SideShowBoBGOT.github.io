glitch = document.getElementById("glitch");
glitch_color = document.getElementById("glitch_color");
glitch_size = document.getElementById("glitch_size");
glitch_weight = document.getElementById("glitch_weight");
glitch_text = document.getElementById("glitch_text");
shadow_x = document.getElementById("shadow_x");
shadow_y = document.getElementById("shadow_y");
shadow_color = document.getElementById("shadow_color");
glitch_gs = document.getElementsByClassName("glitch_g");
shadowss = [];
saved_glitches = document.getElementsByClassName("saved_glitches")[0];
rglitch = document.getElementsByClassName("glitch")[0];
add_shadow = document.getElementById("add_shadow");
shadow_list = document.getElementsByClassName("shadows_list")[0];
shadows_count = shadow_list.children.length;
pse_shadow = {x: 0, y: 0, color: "#FFFFFF", text: ""};
glitch_weight.addEventListener("change", (ev)=>{
    stop_animation();
    glitch.style.fontWeight = glitch_weight.value;
});
glitch_size.addEventListener("change", (ev)=>{
    stop_animation();
    glitch.style.fontSize = glitch_size.value + "px";
});
glitch_color.addEventListener("change", (ev)=> {
    stop_animation();
    glitch.style.color = glitch_color.value;
});
glitch_text.addEventListener("change", (ev)=> {
    stop_animation();
    glitch.innerText = glitch_text.value;
    for(let i=0;i<2;i++) {
        glitch_gs[i].innerText = glitch_text.value;
    }
});
save_btn = document.getElementById("save");
function delete_shadow(index) {
    let shadows = glitch.style.textShadow.split(", r");
    shadows = shadows.filter((s, i)=> {return s!==""});
    shadows.forEach((s,i)=>{
        if(shadows[i][0]!=="r") {
            shadows[i] = "r" + shadows[i];
        }
    });
    for(let i=shadows.length-1;i>=0;i--) {
        if(i>=shadows_count) {
            shadows.pop();
        }
    }
    shadows.splice(index, 1);
    if(shadows.length) {
        glitch.style.textShadow = shadows.join(",");
    } else {
        glitch.style.textShadow = "";
    }
}
function shadow_change() {
    let shadows = glitch.style.textShadow.split(", r");
    shadows = shadows.filter((s, i)=> {return s!==""});
    shadows.forEach((s,i)=>{
        if(shadows[i][0]!=="r") {
            shadows[i] = "r" + shadows[i];
        }
    });
    console.log("shadows count", shadows_count)
    for(let i=shadows.length-1;i>=0;i--) {
        if(i>=shadows_count) {
            shadows.pop();
        }
    }
    let x = shadow_x.value;
    let y = shadow_y.value;
    let color = shadow_color.value;

    if(!x) {
        x = 0;
    }
    if(!y) {
        y = 0;
    }
    pse_shadow.x = x;
    pse_shadow.y = y;
    pse_shadow.color = color;
    color = " " + color;
    x = " "+x+"em";
    y = " "+y+"em";
    let val = x+y+color;
    shadows.push(val);
    glitch.style.textShadow = shadows.join(",");
}
function addshadow(x_, y_, color_) {
    if(!is_played) {
        shadow_change();
        let li = document.createElement('li');
        li.className = "shadow";
        li.innerHTML = shadow_text1 + color_ + shadow_text2 + x_ + shadow_text3 + y_ + shadow_text4;
        li = shadow_list.appendChild(li);
        let btns = li.getElementsByClassName("db_button");
        btns[0].shadowID = shadow_list.children.length - 1;

        btns[0].addEventListener("click", (ev) => {
            stop_animation();

            let buttons = shadow_list.getElementsByClassName("db_button");
            for (let i = btns[0].shadowID + 1; i < buttons.length; i++) {
                buttons[i].shadowID -= 1;
            }
            shadowss.splice(btns[0].shadowID, 1);
            delete_shadow(btns[0].shadowID);
            shadow_list.removeChild(shadow_list.children[btns[0].shadowID]);
            shadows_count = shadow_list.children.length;
        });

    }
}

add_shadow.addEventListener("click", (ev) => {
    addshadow(pse_shadow.x, pse_shadow.y, pse_shadow.color);
    let d = {x: 0, y:0, color: ""};
    d.x = pse_shadow.x;
    d.y = pse_shadow.y;
    d.color = pse_shadow.color;
    shadowss.push(d);
    shadows_count = shadow_list.children.length;
});
shadow_x.addEventListener("change", (ev) => {
    shadow_change();
});
shadow_y.addEventListener("change", (ev) => {
    shadow_change();
});
shadow_color.addEventListener("change", (ev) => {
    shadow_change();
});
function update_saved_glitches() {
    stop_animation();
    loadAllFromIndexedDB('objectstoreName').then(function (reponse) {
        let glitches = reponse;
        console.log(glitches)
        console.log('data loaded OK');
        let child = saved_glitches.lastChild;
        while(child) {
            saved_glitches.removeChild(child);
            child = saved_glitches.lastChild;
        }
        glitches.forEach((gl, i)=>{
            let li = document.createElement('li');
            li.className = "saved_glitch";
            li.innerHTML = glitch_inners;
            let gl_data = li.getElementsByClassName("glitch_data")[0];
            gl_data.innerText = gl.id;
            let buttons = li.getElementsByClassName("db_button");
            buttons[0].addEventListener("click", (ev)=>{
                delete_dynamic_shadows();
                let child = shadow_list.lastChild;
                while(child) {
                    shadow_list.removeChild(child);
                    child = shadow_list.lastChild;
                }
                shadowss = [];
                glitch.innerText = gl.id;
                glitch.style.textShadow = gl.name.textshadow;
                glitch.style.fontSize = gl.name.fontsize;
                glitch.style.color = gl.name.col;
                glitch.style.fontWeight = gl.name.fontweight;
                for(let i=0;i<2;i++) {
                    glitch_gs[i].innerText = gl.id;
                }
                shadows_count = gl.name.shadowcount;
                shadowss = gl.name.shs;
                console.log(shadowss);
                for(let i=0;i<shadowss.length;i++) {
                    addshadow(shadowss[i].x, shadowss[i].y, shadowss[i].color);
                }
                shadow_change();
            });
            buttons[1].addEventListener("click", (ev)=>{
                saved_glitches.removeChild(li);
                deleteFromIndexedDB('objectstoreName', gl.id);
                console.log("delete");
            });
            saved_glitches.appendChild(li);
        });
    }).catch(function (error) {
        console.log(error.message);
    });
}
save_btn.addEventListener("click", (ev)=>{
    stop_animation();

    let obj = {
        'id' : glitch.innerText,
        'name' : {
            fontsize: glitch.style.fontSize,
            fontweight: glitch.style.fontWeight,
            col: glitch.style.color,
            textshadow: glitch.style.textShadow,
            shadowcount: shadows_count,
            shs: shadowss
        }
    }
    saveToIndexedDB('objectstoreName', obj).then(function (response) {
        console.log('data saved');
    }).catch(function (error) {
        console.log(error.message);
    });
    update_saved_glitches();
});
setTimeout(update_saved_glitches, 100);


