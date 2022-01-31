const canvas = document.getElementById("jsCanvas"); //canvas: html dyth
const ctx = canvas.getContext("2d"); //getContext: canvas의 픽셀에 접근 및 조정할 수 있게 함. 2d, 3d 등...
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;  //canvas 사이즈 자체를 지정해줄 뿐 아니라, 픽셀이 본인들이 들어가는 사이즈가 어느 정도인지
canvas.height = CANVAS_SIZE; //인식할 수 있도록 여기서도 똑같이 사이즈를 지정해주어야 함.

ctx.fillStyle = "white"; //html 백그라운드 색상만 잡아주면 이미지 저장 시 투명으로 나오므로, 처음부터 흰색으로 보이도록 초기화해줌.
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); //fillStyle은 채워질 '색상'을 정하는 것이므로, 어느 크기로 채워줄 것인지도 정해줘야 함.
ctx.strokeStyle = "INITIAL_COLOR"; //브러시의 색
ctx.fillStyle = "INITIAL_COLOR"   //지정한 크기의 면적으로 색을 채워줌
ctx.lineWidth = 2.5; //그려질 브러시의 넓이

let painting = false;
let filling = false;

function stopPainting(event){
    painting = false;
}

function startPainting(event){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX; //offset은 해당 이벤트가 우리가 그린 canvas의 어느 위치에서 일어나고 있는지 알려줌.
    const y = event.offsetY; //client는 전체 window
    if(!painting){        //처음 클릭한 후 선을 종료하는 클릭을 하지 않았다면. 즉 선이 그려지는 동안.
        ctx.beginPath();
        ctx.moveTo(x, y); //마우스가 움직이는 대로 path 좌표를 이동시킴.
    }else{
        ctx.lineTo(x, y); //첫 클릭 지점부터 마지막 클릭 지점까지를 선으로 연결하는 매소드
        ctx.stroke();     //획을 그어주는 매소드.
    }
}

function handleColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color; //클릭하는 색상으로 브러시 색상을 바꿈.
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    }else{
        filling = true;
        mode.innerText = "Faint";
    }
}

function handleCanvasClick(){
    if(filling){ //paint 모드와 filling 모드 간의 전환이 자연스럽도록
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); //채울 사각형의 크기(시작 X좌표, 시작 Y좌표, 가로크기, 세로크기)
    }
}

function handleRightClick(event){ //event를 쓸 때는 addEventListener를 사용해서 만들었을 경우.
    event.preventDefault();
}

function handleSaveClick(event){
    const image = canvas.toDataURL(); //toDataURL(): 캔버스의 데이터를 이미지 URL로 받아옴. 괄호 안의 형식으로. 기본값은 png 
    const link = document.createElement("a");
    link.href = image; //링크에 할당될 주소
    link.download = "PaintJS🎨"; //다운로드 시 나타날 이름
    link.click();
}

if(canvas){ //캔버스에 클릭이 되었는지 확인
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting); //mousedown: 마우스 클릭 이벤트
    canvas.addEventListener("mouseup", stopPainting);    //mouseup: 마우스 클릭을 멈췄을 때 -> 마우스를 누르고 있는 동안만 그려지도록 함.
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleRightClick);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColor)); // Array.from(): 객체의 배열을 만들어줌.
                                                                                   //foreach 안의 color는 event와 같은 그냥 이름일 뿐이라서, 아무거나 적어줘도 됨.
if(range){
    range.addEventListener("input", handleRangeChange); //브러시 크기 조절 바를 움직이면 반응하도록, input을 이벤트로 줌.
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(save){
    save.addEventListener("click", handleSaveClick);
}