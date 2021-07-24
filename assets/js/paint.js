const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const color = document.getElementsByClassName("jsColor");
const range = document.getElementById("js-range");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

// 기본 컬러  stroke & fill
const INITIAL_COLOR = "#2c2c2c";

// pixel manipulating size : pixel modifier에 사이즈를 줌 /
canvas.width = 500;
canvas.height = 500;

// default color of canvas
ctx.fillStyle = "white";
ctx.fillRect(0,0,1200,700);
//default 선의 기본값 색상 & 라인 두께
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

//마우스가 움직이는 내내 발생
function onMouseMove(event) {
  // canvas 안의 위치를 잡기 위해 offsetx , offsety를 저장한다
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    // console.log("creating path in ", x, y)
    ctx.beginPath(); //path를 생성한다
    ctx.moveTo(x, y); // 마우스가 있는 쪽으로 path를 움직인다
  } else {
    // console.log("creating line in ", x, y)
    ctx.lineTo(x, y); //마지막 지점과 전 지점을 연결한다 -MDN
    ctx.stroke(); // 선을 긋는다
  }
}

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function handleColor(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color; // overwrite default stroke style
  ctx.fillStyle = ctx.strokeStyle; // fill 값에도 같은 color를 적용
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

// Fill & Paint Mode button text change
function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

// canvas click for Fill
function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, 1200, 700); // set to ixel manipulating size
  }; 
}

// 이미지 우 클릭 저장 방지 함수 
function contextMU(event){
  event.preventDefault();
}

// SAVE 버튼 클릭 시 파일 다운로드 
function handleSaveClick(){
    const image = canvas.toDataURL();  // default type of toDataURL() is png  
    const link = document.createElement("a");
    link.href = image;
    link.download = "HJP's PaintJS";   //  <a download />
    link.click();
}


if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", contextMU);
}

// Color Change Event Listner
Array.from(color).forEach((color) =>
  color.addEventListener("click", handleColor)
);

//Brush Size (range) :: event Listener
if (range) {
  range.addEventListener("input", handleRangeChange);
}

// Button jsMode :: event Listenr
if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if(save) {
  save.addEventListener("click", handleSaveClick);
}