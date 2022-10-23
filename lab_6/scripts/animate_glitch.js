play_btn = document.getElementById("play");
stop_btn = document.getElementById("stop");
is_played = false;
styles = [];
gss = [];
function recreate_shadows() {
    let strs_shadows = [];
    shadowss.forEach((sd)=>{
        let color = " " + sd.color;
        let x = " "+sd.x+"em";
        let y = " "+sd.y+"em";
        strs_shadows.push(color+x+y);
    });
    glitch.style.textShadow = "";
    if(strs_shadows.length) {
        glitch.style.textShadow = strs_shadows.join(",");
    }
}
function generate_styles() {
    shadowss.forEach((sh, i)=>{
        let st = document.createElement('style');
        let st_html = animation_;
        let name = "";
        for(let j=0;j<=i;j++) {
            name+="a";
        }
        st_html = st_html.replace(/NAME/g, name);
        st_html = st_html.replace(/INITIAL_X/g, sh.x);
        st_html = st_html.replace(/INITIAL_Y/g, sh.y);
        let x = ""+(-sh.x);
        let y = ""+(-sh.y);
        st_html = st_html.replace(/X/g, x);
        st_html = st_html.replace(/Y/g, y);
        st.innerHTML = st_html;
        styles.push(st);
        document.getElementsByTagName('head')[0].appendChild(st);

        let gs = document.createElement('span');
        gs.style.color = sh.color;
        gs.style.transform = "translate("+sh.x+"em,"+sh.y+"em)";
        gs.className = "glitch_s";
        gs.innerText = glitch.innerText;
        let t = ""+parseInt(600 + Math.random()*500, 10);
        gs.style.animation = name+" " +t+"ms infinite";
        rglitch.appendChild(gs);
        gss.push(gs);
    });
}
function generate_shadows() {
    shadowss.forEach((sh, i)=> {

    });
}

function delete_dynamic_shadows() {
    shadowss.forEach((sh, i)=> {
        try {
            document.getElementsByTagName('head')[0].removeChild(styles[i]);
            rglitch.removeChild(gss[i]);
        } catch(ex) {

        }
    });
    gss = [];
    styles = [];
}

function stop_animation() {
    for(let i=0;i<4;i++) {
        glitch_gs[i].style.visibility = "hidden";
    }
    is_played = false;
    delete_dynamic_shadows();
    recreate_shadows();
}

stop_btn.addEventListener("click", (ev)=>{
    stop_animation();
});

play_btn.addEventListener("click", (ev)=>{
    for(let i=0;i<4;i++) {
        glitch_gs[i].style.visibility = "visible";
    }
    glitch.style.textShadow = "";
    generate_styles();
    generate_shadows();

    is_played = true;
});