const canvas = document.querySelector("canvas");
const {width, height} = canvas.getBoundingClientRect(); //viewport를 위치로 한 위치값 가져오는 매서드
const palette = document.querySelector('.palette');
const paletteWidthSize = palette.clientWidth;
const paletteHeightSize = palette.clientHeight;
const ctx = canvas.getContext("2d");
const PaintBtn = document.getElementById("Paint");
const eraseBtn = document.getElementById("Erase");
const saveBtn = document.getElementById("Save");
const shareBtn = document.getElementById("Share");

canvas.width = width;
canvas.height = height;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, width, height);
ctx.strokeStyle = "black";
ctx.fillStyle = "black";
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;
let erasing = false;

function appendList(event){
    const listWidthCount = Math.floor(paletteWidthSize / 70);
    const listHeightCount = Math.floor(paletteHeightSize / 70);
    const ul = document.getElementById("color-palette");

    for(var i = 0; i < listWidthCount*listHeightCount; i++){
        const li = document.createElement("li");
        ul.append(li);        
        let random = "#" + Math.floor(Math.random() * 16777215).toString(16); 
        li.style.backgroundColor = random;
        li.classList.add("colors");
    }
}

function fill(event){
    if(filling){
        filling = false; 
        PaintBtn.innerText = "Paint";
    }else{
        filling = true;
        PaintBtn.innerText = "Fill";
    }
}

function erase(event){
    if(erasing){
        erasing = false;
        eraseBtn.innerText = "Erase";
    }else{
        erasing = true;
        eraseBtn.innerText = "Delete";
    }
}
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
function canvasClick(event){
    if(filling){
        ctx.fillRect(0, 0, width, height);
    }
}

function startPainting(event){ 
    painting = true;
} 

function stopPainting(event){
    painting = false;
}

function mouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;

    if(!painting){ //마우스가 클릭되고 떼어진 상태
        ctx.beginPath();
        ctx.moveTo(x, y);
    }else{ //마우스가 클릭되어진 상태, 페인트 모드
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

function colorClick(event){
    alert("booyah");
}

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
if(canvas){
    canvas.addEventListener("mousemove", mouseMove); //마우스 움직일 시
    canvas.addEventListener("mousedown", startPainting); //마우스 클릭하고 있는 상태
    canvas.addEventListener("mouseup", stopPainting);    //마우스 클릭 중단 시
    canvas.addEventListener("mouseleave", stopPainting); //마우스가 캔버스 떠날 시
    canvas.addEventListener("click", canvasClick);
}
const colors = document.querySelectorAll(".colors");
Array.from(colors).forEach(function(color){
    color.addEventListener("click", colorClick);
});

/* Array.from(colors).forEach(color => color.addEventListener("click", colorClick)); */

PaintBtn.addEventListener("click", fill);
eraseBtn.addEventListener("click", erase);
window.addEventListener("resize", appendList);
appendList();