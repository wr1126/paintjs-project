const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const {width, height} = canvas.getBoundingClientRect();
const palette = document.querySelector('.palette');
const paletteWidthSize = palette.clientWidth;
const paletteHeightSize = palette.clientHeight;
const gallery = document.querySelector(".gallery_group");
const galleryWidthSize = gallery.clientWidth;
const galleryHeightSize = gallery.clientHeight;
const range = document.getElementById("range");

const paintBtn = document.getElementById("Paint");
const eraseBtn = document.getElementById("Erase");
const saveBtn = document.getElementById("Save");
const displayBtn = document.getElementById("Display");
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
let galleryList = [];



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

function erase(event){
    ctx.strokeStyle = "white";
    filling = false;
    startPainting();
    painting = false;
}

function save(){
    const file = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = file;
    link.download = "My Painting 🎨";
    link.click();
}

function deletePainting(event){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
}

function saveImgList(){
    localStorage.setItem("galleryList", JSON.stringify(galleryList));
}

function deleteImg(event){
    const div = event.target.parentElement;
    galleryList = galleryList.filter((element) => element.id !== parseInt(div.id));
    div.remove();
    saveImgList();
}

function display(imgList){
    const imgGroup = document.createElement("div");
    imgGroup.id = imgList.id;
    imgGroup.classList.add("imgGroup");

    const frame = document.createElement("img");
    frame.src = imgList.text;
    frame.width = Math.floor(galleryWidthSize / 3.5);
    frame.height = Math.floor(galleryHeightSize / 7);

    const x = document.createElement("span");
    x.innerText = "❌";
    x.addEventListener("click", deleteImg);

    imgGroup.appendChild(frame);
    imgGroup.appendChild(x);
    gallery.appendChild(imgGroup);
}

function handleDisplay(event){
    const imgList = {
        text: canvas.toDataURL(),
        id: Date.now(),
    }
    galleryList.push(imgList);
    display(imgList);
    saveImgList();
}

function modal(event){
    const body = document.querySelector("body");
    const background = document.createElement("div");
    const myPainting = document.createElement("img");

    background.classList.add("background");
    myPainting.classList.add("modal");
    imgUrl = event.target.currentSrc;
    myPainting.src = imgUrl;
    body.appendChild(background);
    body.appendChild(myPainting);

    background.addEventListener("click", function(event){
        background.style.display = "none";
        myPainting.style.display = "none";
    });
}

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

function colorClick(event){
    ctx.strokeStyle = event.target.style.backgroundColor;
    ctx.fillStyle = event.target.style.backgroundColor;
}

function brushWidth(event){
    ctx.lineWidth = event.target.value;
}



if(canvas){
    canvas.addEventListener("mousemove", mouseMove); 
    canvas.addEventListener("mousedown", startPainting); 
    canvas.addEventListener("mouseup", stopPainting);    
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", canvasClick);
}

window.addEventListener("resize", appendList);
range.addEventListener("input", brushWidth);
paintBtn.addEventListener("click", fill);
eraseBtn.addEventListener("click", erase);
saveBtn.addEventListener("click", save);
displayBtn.addEventListener("click", handleDisplay);
deleteBtn.addEventListener("click", deletePainting);

appendList();

const savedList = localStorage.getItem("galleryList");
if(savedList){
    const parsedList = JSON.parse(savedList);
    galleryList = parsedList;
    parsedList.forEach(display);
}

const zoom = document.querySelectorAll("img");
zoom.forEach(function(zoom){
    zoom.addEventListener("click", modal); 
});