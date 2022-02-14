const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const {width, height} = canvas.getBoundingClientRect();
const palette = document.querySelector('.palette');
const paletteWidthSize = palette.clientWidth;
const paletteHeightSize = palette.clientHeight;
const range = document.getElementById("range");

const paintBtn = document.getElementById("Paint");
const eraseBtn = document.getElementById("Erase");
const saveBtn = document.getElementById("Save");
const shareBtn = document.getElementById("Share");
const deleteBtn = document.getElementById("Delete");

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
    }

    const colors = document.getElementsByTagName("li"); 
    Array.from(colors).forEach(color => color.addEventListener("click", colorClick));
}

function fill(event){
    if(filling){
        filling = false; 
        paintBtn.innerText = "Paint";
    }else{
        filling = true;
        paintBtn.innerText = "Fill";
    }
}

function erase(){ //paint 모드에서는 정상 작동하나 fill 모드에서는 작동 X
    ctx.strokeStyle = "white";
}

function deletePainting(event){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
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

    if(!painting){ 
        ctx.beginPath();
        ctx.moveTo(x, y);
    }else{ 
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

function colorClick(event){
    ctx.strokeStyle = event.target.style.backgroundColor;
    ctx.fillStyle = event.target.style.backgroundColor;
}

function brushWidth(event){
    ctx.lineWidth = event.target.value;
}

function savePainting(){
    const file = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = file;
    link.download = "My Painting 🎨";
    link.click();
}

function sharePainting(){
 
/*     prompt("하단의 URL을 복사하세요.", canvas.toDataURL()); */
console.dir(canvas);
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
window.addEventListener("resize", appendList);
range.addEventListener("input", brushWidth);
paintBtn.addEventListener("click", fill);
eraseBtn.addEventListener("click", erase);
saveBtn.addEventListener("click", savePainting);
shareBtn.addEventListener("click", sharePainting);
deleteBtn.addEventListener("click", deletePainting);

appendList();