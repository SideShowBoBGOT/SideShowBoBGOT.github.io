block4 = document.querySelector(".block-4");
block5 = document.querySelector(".block-5");
block4_content = block4.innerHTML;
block4.innerHTML = block5.innerHTML;
block5.innerHTML = block4_content;

