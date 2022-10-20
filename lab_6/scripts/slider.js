glitch_title = document.getElementById("glitch_title");
first_glitch = document.getElementById("first_title_glitch");
second_glitch = document.getElementById("second_title_glitch");
turn_off_txt = document.getElementsByClassName("turn_off_text")[0];


slider = document.getElementById("glitch_title_checkbox");

slider.addEventListener("change", (ev)=>{
   if(ev.currentTarget.checked) {
       glitch_title.style.animation = "none";
       first_glitch.style.animation = "none";
       second_glitch.style.animation = "none";
       first_glitch.style.visibility = "hidden";
       second_glitch.style.visibility = "hidden";
       turn_off_txt.innerText = "YOU DID IT ,THANKS";
   } else {
       glitch_title.style.animation = "glitch 1500ms infinite";
       first_glitch.style.animation = "blick 2000ms infinite";
       second_glitch.style.animation = "blick 1500ms infinite";
       first_glitch.style.visibility = "visible";
       second_glitch.style.visibility = "visible";
       turn_off_txt.innerText = "HELL NO, TURN IT OFF";
   }
});