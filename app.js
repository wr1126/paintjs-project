const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const colors = "black";
const range = "2.5";


const fillBtn = document.getElementById("Fill");
const eraseBtn = document.getElementById("Erase");
const saveBtn = document.getElementById("Save");
const shareBtn = document.getElementById("Share");

let filling = false;
let erasing = false;

function appendList(event){
    const palette = document.querySelector('.palette');
    const paletteWidthSize = palette.clientWidth;
    const listWidthCount = Math.floor(paletteWidthSize / 70);
    const paletteHeightSize = palette.clientHeight;
    const listHeightCount = Math.floor(paletteHeightSize / 70);
    const ul = document.getElementById("color-palette");

    for(var i = 0; i < listWidthCount*listHeightCount; i++){
        const li = document.createElement("li");
        ul.append(li);        
        let random = "#" + Math.floor(Math.random() * 16777215).toString(16); 
        li.style.backgroundColor = random;
    }
}

function fill(event){
    if(filling){
        filling = false;
        fillBtn.innerText = "Fill";
    }else{
        filling = true;
        fillBtn.innerText = "Faint";
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

function startPainting(event){
    ctx.beginPath();
/*     ctx.fillStyle = "black";
    ctx.fill(); */
} 

function stopPainting(event){

}

/* function canvasSize(){
    const canvasSize = canvas.clientWidth * canvas.clientHeight;
    console.log(canvasSize);

} */
if(canvas){
/*     casnvasSize(); */
    canvas.addEventListener("mousemove", startPainting);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

fillBtn.addEventListener("click", fill);
eraseBtn.addEventListener("click", erase);

window.addEventListener("resize", appendList);
appendList();