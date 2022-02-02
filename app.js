function appendList(event){
    const palette = document.querySelector('.palette');
    const paletteWidthSize = palette.clientWidth;
    const listWidthCount = parseInt(paletteWidthSize / 70);
    const paletteHeightSize = palette.clientHeight;
    const listHeightCount = parseInt(paletteHeightSize / 70);
    const ul = document.getElementById("color-palette");

    for(var i = 0; i < listWidthCount*listHeightCount; i++){
        const li = document.createElement("li");
        li.classList.add("color");
        ul.append(li);
    }
}
const li = document.getElementsByClassName("color").length;
console.log(li);

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function randomColor(){
    let random = "#" + Math.floor(Math.random() * 16777215).toString(16);

}


window.addEventListener("resize", appendList);
randomColor();
appendList();