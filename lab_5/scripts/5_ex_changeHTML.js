let selected_block = undefined;
function declare() {
    save_change_btn = document.getElementById("save_change");
    cancel_change_btn = document.getElementById("cancel_change");
    text_area = document.getElementById("text");
    block1_change_btn = document.getElementById("block1_change");
    block2_change_btn = document.getElementById("block2_change");
    block3_change_btn = document.getElementById("block3_change");
    block4_change_btn = document.getElementById("block4_change");
    block5_change_btn = document.getElementById("block5_change");
    block6_change_btn = document.getElementById("block6_change");
    block7_change_btn = document.getElementById("block7_change");

    block1 = document.getElementsByClassName("block-1")[0];
    block2 = document.getElementsByClassName("block-2")[0];
    block3 = document.getElementsByClassName("block-3")[0];
    block4 = document.getElementsByClassName("block-4")[0];
    block5 = document.getElementsByClassName("block-5")[0];
    block6 = document.getElementsByClassName("block-6")[0];
    block7 = document.getElementsByClassName("block-7")[0];

    block1_html = block1.innerHTML;
    block2_html = block2.innerHTML;
    block3_html = block3.innerHTML;
    block4_html = block4.innerHTML;
    block5_html = block5.innerHTML;
    block6_html = block6.innerHTML;
    block7_html = block7.innerHTML;

    block1_back = document.createElement("button");
    block2_back = document.createElement("button");
    block3_back = document.createElement("button");
    block4_back = document.createElement("button");
    block5_back = document.createElement("button");
    block6_back = document.createElement("button");
    block7_back = document.createElement("button");

    block1_back.innerText = "Block 1 Back";
    block2_back.innerText = "Block 2 Back";
    block3_back.innerText = "Block 3 Back";
    block4_back.innerText = "Block 4 Back";
    block5_back.innerText = "Block 5 Back";
    block6_back.innerText = "Block 6 Back";
    block7_back.innerText = "Block 7 Back";

    block1_back.onclick = () => {
        block1.innerHTML = JSON.parse(window.localStorage.getItem("block1_html")).html;
        block1.style.fontStyle = "normal";
    }
    block2_back.onclick = () => {
        block2.innerHTML = JSON.parse(window.localStorage.getItem("block2_html")).html;
        block2.style.fontStyle = "normal";

    }
    block3_back.onclick = () => {
        block3.innerHTML = JSON.parse(window.localStorage.getItem("block3_html")).html;
        block3.style.fontStyle = "normal";

        declare();
    }
    block4_back.onclick = () => {
        block4.innerHTML = JSON.parse(window.localStorage.getItem("block4_html")).html;
        block4.style.fontStyle = "normal";

    }
    block5_back.onclick = () => {
        block5.innerHTML = JSON.parse(window.localStorage.getItem("block5_html")).html;
        block5.style.fontStyle = "normal";
    }
    block6_back.onclick = () => {
        block6.innerHTML = JSON.parse(window.localStorage.getItem("block6_html")).html;
        block6.style.fontStyle = "normal";

    }
    block7_back.onclick = () => {
        block7.innerHTML = JSON.parse(window.localStorage.getItem("block7_html")).html;
        block7.style.fontStyle = "normal";
    }
// change buttons
    block1_change_btn.onclick = () => {
        selected_block = block1;
        text_area.value = block1.innerHTML;
    }
    block2_change_btn.onclick = () => {
        selected_block = block2;
        text_area.value = block2.innerHTML;
    }
    block3_change_btn.onclick = () => {
        selected_block = block3;
        text_area.value = block3.innerHTML;
    }
    block4_change_btn.onclick = () => {
        selected_block = block4;
        text_area.value = block4.innerHTML;
    }
    block5_change_btn.onclick = () => {
        selected_block = block5;
        text_area.value = block5.innerHTML;
    }
    block6_change_btn.onclick = () => {
        selected_block = block6;
        text_area.value = block6.innerHTML;
    }
    block7_change_btn.onclick = () => {
        selected_block = block7;
        text_area.value = block7.innerHTML;
    }

    save_change_btn.onclick = function () {
        if(selected_block !== undefined) {
            data = {html: ""};
            switch(selected_block) {
                case block1:
                    data.html = block1.innerHTML;
                    window.localStorage.setItem('block1_html', JSON.stringify(data));
                    break;
                case block2:
                    data.html = block2.innerHTML;
                    window.localStorage.setItem('block2_html', JSON.stringify(data));
                    break;
                case block3:
                    data.html = block3.innerHTML;
                    window.localStorage.setItem('block3_html', JSON.stringify(data));
                    break;
                case block4:
                    data.html = block4.innerHTML;
                    window.localStorage.setItem('block4_html', JSON.stringify(data));
                    break;
                case block5:
                    data.html = block5.innerHTML;
                    window.localStorage.setItem('block5_html', JSON.stringify(data));
                    break;
                case block6:
                    data.html = block6.innerHTML;
                    window.localStorage.setItem('block6html', JSON.stringify(data));
                    break;
                case block7:
                    data.html = block7.innerHTML;
                    window.localStorage.setItem('block7_html', JSON.stringify(data));
                    break;
            }
            selected_block.innerHTML = text_area.value;
            selected_block.style.fontStyle = "italic";
            switch(selected_block) {
                case block1:
                    selected_block.appendChild(block1_back);
                    break;
                case block2:
                    selected_block.appendChild(block2_back);
                    break;
                case block3:
                    selected_block.appendChild(block3_back);
                    break;
                case block4:
                    selected_block.appendChild(block4_back);
                    break;
                case block5:
                    selected_block.appendChild(block5_back);
                    break;
                case block6:
                    selected_block.appendChild(block6_back);
                    break;
                case block7:
                    selected_block.appendChild(block7_back);
                    break;
            }
        }
    }
}
declare();
// block buttons





